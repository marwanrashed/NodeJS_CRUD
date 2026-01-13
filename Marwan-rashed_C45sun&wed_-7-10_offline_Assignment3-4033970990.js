/**
 * Assignment 3
 * Author: Marwan Rashed
 * ID: 4033970990
 * Date: 23/12/2025
 */
// Imports
const path = require('path');
const fs = require('fs');
const EventEmitter = require("node:events");
const os = require('node:os');
const http = require("http");
const zipIt = require('node:zlib');

/** Part 1 Core Modules */
/**
 * Question 1
1. Use a readable stream to read a file in chunks and log each chunk. (0.5 Grade)
• Input Example: "./big.txt"
• Output Example: log each chunk
 */
const options = {
 'encoding': 'utf-8',
 'highwatermark': 64 * 1024,
 'flags': 'r',
 'autoclose': true,
 'emitclose': true,
};
const q1_readStream = fs.createReadStream('./big.txt', options);
let sizeOfFile = fs.statSync('./big.txt').size;
let q1_chunkCount = 0;
// q1_readStream.on('data', (chunk)=>{
//     console.log (`Q1: Reading chunk from big file: ${chunk}`);
//     console.log( `Progress: ${Math.floor(q1_chunkCount / sizeOfFile * 100)}%`);
//     q1_chunkCount += options.highwatermark;
// });

/**
 * Question 2
2. Use readable and writable streams to copy content from one file to another. (0.5 Grade)
• Input Example: "./source.txt", "./dest.txt"
• Output Example: File copied using streams
 */

const q2_readStream = fs.createReadStream('./source.txt', options);
const q2_writeStream = fs.createWriteStream('./dest.txt');
let q2_chunkCount = 0;
let sizeOfSrc = fs.statSync('./source.txt').size;
q2_readStream.on('data', (chunk) => {
    console.log(`Q2: copying from source to destination using read/write streams manually Progress: ${Math.floor(q2_chunkCount / sizeOfSrc * 100)}%`);
    q2_writeStream.write(chunk);
    q2_chunkCount += options.highwatermark;
});

/**
 * Question 3
3. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
• Input Example: "./data.txt", "./data.txt.gz"
 */
const gzip = zipIt.createGzip();
const q3_readStream = fs.createReadStream('./source.txt', options);
const q3_writeStream = fs.createWriteStream('./data.txt.gz');
q3_readStream.pipe(gzip).pipe(q3_writeStream);


/** Part 2 Simple CRUD Operations Using HTTP */
/**
 * Question 4
1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before) (1 Grade)
o URL: POST /user
 */


/**
 * Question 5
2. Create an API that updates an existing user's name, age, or email by their ID. The user ID should be retrieved from the URL (1 Grade)
Note: Remember to update the corresponding values in the JSON file
o URL: PATCH /user/id
 */



/**
 * Question 6
3. Create an API that deletes a User by ID. The user id should be retrieved from the URL (1 Grade)
Note: Remember to delete the user from the file
o URL: DELETE /user/id
 */



/**
 * Question 7
4. Create an API that gets all users from the JSON file. (1 Grade)
o URL: GET /user
 */




/**
 * Question 8
5. Create an API that gets User by ID. (1 Grade)
o URL: GET /user/:id
 */


/** Part3: Node Internals */
/**
 * 
1. What is the Node.js Event Loop? (0.5 Grade)
2. What is Libuv and What Role Does It Play in Node.js? (0.5 Grade)
3. How Does Node.js Handle Asynchronous Operations Under the Hood? (0.5 Grade)
4. What is the Difference Between the Call Stack, Event Queue, and Event Loop in Node.js? (0.5 Grade)
5. What is the Node.js Thread Pool and How to Set the Thread Pool Size? (0.5 Grade)
6. How Does Node.js Handle Blocking and Non-Blocking Code Execution? (0.5 Grade)
 */


/**
 ************************************************ Part 3: Bonus ************************************************
 Problem Solving
 */

/**
 * Bonus Question
 * Solve the problem Majority Element on LeetCode
Majority Element:  https://leetcode.com/problems/majority-element/description/?envType=study-plan-v2&envId=top-interview-150
*/
