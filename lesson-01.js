"use strict";

// Lesson 1: The Client and Server Model.
// Your standalone code and written observations for this lesson live here,
// as code and comments. The site work happens in the stretch-records folder.
//
// Step 4: how many requests did the single page load make? List three by name.

// Ledi: The single page load made 11 requests.
// Three of them were index.html, styles.css, and script.js.
//
//
// Step 6: which files changed when you added the sixth artist, which did not,
// and why is that separation the point?

// Ledi: Only artists.json changed when I added the sixth artist.
// script.js did not change because the same code can render any artists
// loaded from the JSON file. This separates the data from the application logic.
//
// Step 7: paste the console error the broken artists.json produced.

// Ledi: After deliberately breaking artists.json, the console showed:
// Uncaught (in promise) SyntaxError: Expected ',' or ']' after array element
// in JSON at position 772 (line 37 column 4)
//
// Step 8: build one artist object, JSON.stringify() it, log the text,
// JSON.parse() it back, and log one property of the result.

// Step 8: JSON stringify and parse round trip.

const artist = {
  name: "Elvis Presley",
  genre: "Rock and roll",
  total: "18:25",
};

const artistText = JSON.stringify(artist);
console.log(artistText);

const parsedArtist = JSON.parse(artistText);
console.log(parsedArtist.name);
//
// STRETCH, step 9: describe your page as a system. Name the client, name the
// server, and state what the request asked for and what the response carried.

// Ledi: The client is the browser running the Stretch Records page.
// The server is Live Server running on my computer.
// The request asked for artists.json.
// The response carried the artist data as JSON text.
