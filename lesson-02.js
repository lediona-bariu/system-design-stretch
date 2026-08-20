"use strict";

// Lesson 2: Asynchronous JavaScript and the Event Loop.
// Standalone programs and observations go in this file as code and comments.

// ===== Provided program (task step 2): predict before you run =====
// Write your predicted output order as a comment BELOW, before running this
// file with node. Then run it, mark each line of your prediction right or
// wrong, and correct the wrong ones with one sentence each explaining why.

console.log("doors open");
setTimeout(() => console.log("encore"), 1000);
setTimeout(() => console.log("soundcheck"), 0);
console.log("main act");
setTimeout(() => console.log("intermission"), 500);
console.log("lights down");

// Your prediction:
// 1. doors open — RIGHT
// 2. main act — RIGHT
// 3. lights down — RIGHT
// 4. soundcheck — RIGHT
// 5. intermission — RIGHT
// 6. encore — RIGHT

// Ledi: Step 3:
// The blocking loop occupied the call stack/main JavaScript thread for five seconds.
// While it was running, other event handlers and page rendering could not run,
// so the page appeared frozen until the loop finished.

// ===== Provided program (task step 4): trace the call stack =====
// Trace this as a written call stack diagram in comments, listing every push
// and pop in order. Then cause an error inside the innermost function and
// confirm the stack trace in the console matches your diagram, innermost
// first. Keep it commented out while you work on step 2.

function prepare(artist) {
  return "Now playing " + format(artist);
}
function format(artist) {
  return artist.name.toUpperCase();
}
console.log(prepare({ name: "Asake" }));

// Ledi: Step 4: Call stack trace
//
// 1. Global context starts.
// 2. prepare() is called -> PUSH prepare.
// 3. format() is called inside prepare() -> PUSH format.
// 4. format() returns -> POP format.
// 5. prepare() returns -> POP prepare.
// 6. console.log() prints the final result.

// Ledi: The deliberate error occurred inside format().
// The stack trace showed format() first, then prepare(), matching my
// call stack diagram because the innermost active function appears first.

// Ledi: Step 6 - Countdown using setInterval() and clearInterval()

let count = 10;
console.log(count);

const countdown = setInterval(() => {
  count--;
  console.log(count);

  if (count === 0) {
    clearInterval(countdown);
  }
}, 1000);

// Ledi: Step 7 - How JavaScript handles many waiting tasks
// JavaScript runs code on one call stack, one thing at a time.
// Timers and network requests wait in browser or runtime facilities outside the stack.
// When they finish, their callbacks are placed into queues.
// The event loop moves queued callbacks onto the call stack only when the stack is empty.
// This is how JavaScript can manage many waiting tasks without freezing the page.
