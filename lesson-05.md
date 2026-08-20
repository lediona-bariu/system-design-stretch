# Lesson 5: The System Audit

The written audit of your running system. Every claim must be backed by
something you observed in the Network tab, the console, or the server's
terminal output.

## Single point of failure

I stopped the artists json-server on port 3000 and reloaded the page.
The visitor saw: "We could not load the artists. Please try again."
In the console I observed GET http://localhost:3000/artists with ERR_CONNECTION_REFUSED and "Failed to fetch".
The artists server is a single point of failure because when it is unavailable, the page cannot load the artist data.
Redundancy would mean having another server or service available to provide the artist data if the main server fails.

## Latency

I throttled the connection to 3G in the DevTools Network tab and reloaded the page.
The artists request took 2.11 s and the label request took 2.08 s. The Network tab showed an overall finish time of 13.12 s.
The Network tab showed that the requests and page resources took longer to complete under the slower connection.
The delay caused by the slower connection is latency.

## Caching

I compared the page with the browser cache disabled and enabled.
With caching disabled, the Network tab showed 608 kB transferred, a load time of 551 ms, and DOMContentLoaded at 323 ms.
With caching enabled, only 4.1 kB was transferred, the load time dropped to 25 ms, and DOMContentLoaded dropped to 21 ms. Some resources were loaded directly from memory cache.
This shows that browser caching reduces the amount of data that must be downloaded again and makes repeated page loads much faster.

## The layers

The system is separated into different layers.
The presentation layer is the web page running through Live Server on port 5500. HTML and CSS define what the visitor sees, while JavaScript handles the page logic.
The data/API layer is provided by json-server. In the Network tab, I observed the browser sending a GET request from the page on port 5500 to http://localhost:3000/artists.
The server responded with 200 OK and application/json data. JavaScript then uses this data to render the artist cards on the page.
This shows that the frontend does not contain all of the data itself. It requests data from a separate API layer.

## One request's full journey

The browser page runs on http://127.0.0.1:5500 and JavaScript sends a GET request to http://localhost:3000/artists.
In the Network tab, I observed the request method GET and a 200 OK response with Content-Type application/json.
The json-server receives the request and reads the artist data from artists.json.
The JSON response returns to the browser, where script.js parses it and passes the artist objects to the card rendering function.
The page then creates and displays the artist cards in the roster.

## STRETCH: what a real system would need that json-server skipped
