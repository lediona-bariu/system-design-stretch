"use strict";

// The roster, exactly where the JavaScript course's finale left it: an array
// of artist objects at the top of the file, and one repeatable rule that
// renders it. In this course the data moves out of this file, step by step.

const cardArea = document.querySelector(".cards");

// Every artist currently on the page, whatever the data's source. renderCards
// maintains this list, so the shuffle button and the form keep working no
// matter where the artists came from.
const roster = [];

// One card from one artist: the shared builder, used by the first render
// and by the form below.
function buildCard(artist) {
  const card = document.createElement("article");
  if (artist.photo) {
    const photo = document.createElement("img");
    photo.src = artist.photo;
    photo.alt = `${artist.name}, artist photo`;
    card.append(photo);
  }
  const title = document.createElement("h3");
  title.textContent = artist.name;
  const line = document.createElement("p");
  line.textContent = `${artist.genre}, ${artist.total} of music`;
  card.append(title, line);
  return card;
}

function renderCards(list) {
  for (const artist of list) {
    roster.push(artist);
    cardArea.append(buildCard(artist));
  }
}

/// Ledi: Lesson 3 - Step 4
// Same loader rewritten with async/await and try/catch/finally.

const statusBox = document.querySelector(".status");

// Ledi: Lesson 3 - Step 5
// Custom error for missing artist data.

class MissingArtistDataError extends Error {
  constructor(field) {
    super("Required artist data is missing: " + field);
    this.name = "MissingArtistDataError";
  }
}

function checkArtist(artist) {
  if (!artist.name) {
    throw new MissingArtistDataError("name");
  }
}

async function loadArtists() {
  statusBox.textContent = "Loading artists...";

  try {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const { artists, label } = await getArtistsAndLabel();
    for (const artist of artists) {
      checkArtist(artist);
    }
    renderCards(artists);
  } catch (error) {
    if (error instanceof MissingArtistDataError) {
      statusBox.textContent =
        "Artist data is incomplete. Missing required field: name.";
    } else {
      statusBox.textContent =
        "We could not load the artists. Please try again.";
    }

    console.log(error.name + ": " + error.message);
  } finally {
    if (statusBox.textContent === "Loading artists...") {
      statusBox.textContent = "";
    }
  }
}

loadArtists();

async function getArtistsAndLabel() {
  try {
    const [artistsResponse, labelResponse] = await Promise.all([
      fetch("http://localhost:3000/artists"),
      fetch("http://localhost:3001/label"),
    ]);

    if (!artistsResponse.ok) {
      throw new Error(
        "Artists request failed with status " + artistsResponse.status,
      );
    }

    if (!labelResponse.ok) {
      throw new Error(
        "Label request failed with status " + labelResponse.status,
      );
    }

    const [artists, label] = await Promise.all([
      artistsResponse.json(),
      labelResponse.json(),
    ]);

    console.log("Artists:", artists);
    console.log("Label:", label);

    return { artists, label };
  } catch (error) {
    throw new Error(
      "Stretch Records page: loading data failed. " + error.message,
    );
  }
}

// Shuffle: pick a random artist and feature them.
const shuffleButton = document.querySelector(".shuffle");

shuffleButton.addEventListener("click", () => {
  if (roster.length === 0) return;
  const pick = roster[Math.floor(Math.random() * roster.length)];
  document.querySelector(".featured").textContent =
    `Featured today: ${pick.name}`;
});

// The suggestion form: an empty submission does nothing, because an empty
// string is falsy.
const form = document.querySelector(".signup");
const nameInput = document.querySelector("#artist-name");
const genreInput = document.querySelector("#artist-genre");

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  const name = nameInput.value;
  if (!name) return;

  const newArtist = {
    name: name,
    genre: genreInput.value || "Unsigned",
    total: "0:00",
    photo: "",
  };

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newArtist),
  };

  const response = await fetch("http://localhost:3000/artists", options);

  console.log(response.status);

  if (!response.ok) {
    throw new Error("POST failed with status " + response.status);
  }

  const savedArtist = await response.json();
  renderCards([savedArtist]);

  nameInput.value = "";
  genreInput.value = "";
});

// Ledi; Step 3: temporary blocking loop.
/* document.querySelector("#freeze").addEventListener("click", () => {
  const until = Date.now() + 5000;

  while (Date.now() < until) {
    // Deliberately block the main thread for five seconds.
  }

  console.log("done");
}); */
