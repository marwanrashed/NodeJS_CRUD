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
const URL = require ('node:url');
const port = 3000;

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

// const q2_readStream = fs.createReadStream('./source.txt', options);
// const q2_writeStream = fs.createWriteStream('./dest.txt');
// let q2_chunkCount = 0;
// let sizeOfSrc = fs.statSync('./source.txt').size;
// q2_readStream.on('data', (chunk) => {
//     console.log(`Q2: copying from source to destination using read/write streams manually Progress: ${Math.floor(q2_chunkCount / sizeOfSrc * 100)}%`);
//     q2_writeStream.write(chunk);
//     q2_chunkCount += options.highwatermark;
// });

/**
 * Question 3
3. Create a pipeline that reads a file, compresses it, and writes it to another file. (0.5 Grade)
• Input Example: "./data.txt", "./data.txt.gz"
 */
// const gzip = zipIt.createGzip();
// const q3_readStream = fs.createReadStream('./source.txt', options);
// const q3_writeStream = fs.createWriteStream('./data.txt.gz');
// q3_readStream.pipe(gzip).pipe(q3_writeStream);


/** Part 2 Simple CRUD Operations Using HTTP */
/**
 * Question 4
1. Create an API that adds a new user to your users stored in a JSON file. (ensure that the email of the new user doesn’t exist before) (1 Grade)
o URL: POST /user
 */
function readUsers(){
    const data = fs.readFileSync('./users.json', 'utf-8');
    return JSON.parse(data);
}

function writeUsers(users){
    fs.writeFileSync('./users.json', JSON.stringify(users)); 
}

const server_q4 = http.createServer( (request, response) => {
    const method = request.method;
    const urlParsed = URL.parse(request.url).pathname;
    console.log(urlParsed)
    if (method === "POST" && urlParsed == "/user") {
        let data = "";
        const users = readUsers();
        console.log(users);
        request.on("data", (chunk)=>{
            console.log(chunk);
            data+=chunk;
        });

        request.on("end", ()=>{
        // const isEmailExists = users.some( (user) => { 
        //     console.log(user.email);
        //     return user.email === JSON.parse(newUser).email});
        const newUser = JSON.parse(data);
        console.log(newUser);
        if (users[newUser.email]){
            response.statusCode = 400;
            
            console.log(newUser.email);
            response.statusMessage = "Email already exists";
            response.write(
                JSON.stringify(
                    {
                        message: "Email already exists."
                    }
                )
            );  
            response.end();
        }
        else if (undefined === newUser.name || undefined === newUser.id || undefined === newUser.email ){
            response.statusCode = 400;
            response.statusMessage = "Invalid user data";
            response.write(
                JSON.stringify(
                    {
                        message: "Invalid user data. name, age, and email are required."
                    }
                )
            );  
            response.end();
        }
        else{
            users[newUser.email] = newUser;
            writeUsers(users);
            response.statusCode = 200;
            response.statusMessage = "New user added successfully !";
            response.setHeader("content-type", "application/json");
            response.write(JSON.stringify(
                {
                    message: "user added successfully!"
                }
            ));
            response.end();
        }

        });

        
    }
    else{
        response.statusCode = 404;
        response.statusMessage = "Invalid Url"
        response.write(
            JSON.stringify(
                {
                    message: "invalid url"
                }
            )
        )
        response.end()
    }
} );

server_q4.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
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
