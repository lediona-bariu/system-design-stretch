"use strict";

// Lesson 3: Promises, async, and await.
// Standalone programs and observations go in this file as code and comments.
// The loader work happens in stretch-records/script.js.

//
// Step 3, the ordering puzzle: write a program mixing plain logs, a zero
// delay timer, and a settled Promise reaction. Predict the full output order
// in comments before running, then explain in one sentence why the Promise
// beat the timer.

// Ledi: Step 3 - Ordering puzzle

console.log("start");

setTimeout(() => console.log("timer"), 0);

Promise.resolve().then(() => console.log("promise"));

console.log("end");

// Ledi: My prediction:
// 1. start
// 2. end
// 3. promise
// 4. timer

// Ledi: Result: Prediction was correct.
// The Promise ran before the zero-delay timer because Promise callbacks
// use the microtask queue, which is processed before the timer/task queue.
//
// Step 6: paste the final rethrown message that reached the top.
// Ledi: Step 6 final rethrown message: Stretch Records page: loading artist data failed. ...

// Ledi: Step 7 - Promise.all() and Promise.allSettled()

const taskOne = new Promise((resolve) =>
  setTimeout(() => resolve("Task 1 finished"), 500),
);

const taskTwo = new Promise((resolve, reject) =>
  setTimeout(() => reject(new Error("Task 2 failed")), 1000),
);

const taskThree = new Promise((resolve) =>
  setTimeout(() => resolve("Task 3 finished"), 1500),
);

Promise.allSettled([taskOne, taskTwo, taskThree]).then((results) => {
  console.log("Promise.allSettled results:", results);

  const survivors = results
    .filter((result) => result.status === "fulfilled")
    .map((result) => result.value);

  console.log("Survivors:", survivors);
});
