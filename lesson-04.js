"use strict";

// Lesson 4: HTTP and the Fetch API.
// Recorded observations go in this file as comments. The loader and form
// work happens in stretch-records/script.js, against the server you run
// with json-server.
//
// Step 2: both status codes and the response Content-Type.
// Ledi: Step 2
// GET /artists -> status 200
// GET /nothing -> status 404
// Response Content-Type: application/json
//
// Step 3: ok, status, and one Access-Control-Allow header from the Network tab.
// Ledi: Step 3
// response.ok -> true
// response.status -> 200
// Access-Control-Allow-Origin -> *

// Step 4: show that the Promise fulfilled anyway on the wrong path.
// Ledi: Step 4
// Fetching /nothing still fulfilled the Promise and returned a Response.
// response.status was 404 and response.ok was false.
// After checking response.ok, I threw an Error.
// Final message:
// Stretch Records page: loading artist data failed. Request failed with status 404
//
// Step 5: how did the refused connection differ from the 404?
// Ledi: Step 5
// A 404 meant the server answered, so fetch returned a Response with status 404.
// When the server was stopped, no response arrived at all.
// The connection was refused and fetch rejected with a network error: Failed to fetch.

// Ledi: Step 6
// POST /artists -> status 201 Created.
// The request used Content-Type: application/json and JSON.stringify() for the body.
// After refreshing, the new artist was still present.
// A second browser tab also showed the artist, proving the data was persisted.

// Ledi: Step 7
// Started a second json-server on port 3001 for label.json.
// Promise.all() fetched /artists from port 3000 and /label from port 3001.
// The page rendered only after both responses had arrived successfully.
//
// STRETCH, step 8: the public API's endpoint address, the method, one
// parameter, the response shape you would code against, and one stated limit.
