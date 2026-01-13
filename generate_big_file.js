// generate-big-file.js
const fs = require('fs');

const outputFile = 'big.txt';
const targetSizeMB = 2; // change this (e.g. 50, 1000)
const line = 'This is a sample log line used for Node.js stream testing.\n';

const stream = fs.createWriteStream(outputFile);
let writtenMB = 0;

function write() {
  let ok = true;
  while (writtenMB < targetSizeMB && ok) {
    const chunk = line.repeat(1024); // ~64KB per write
    ok = stream.write(chunk);
    writtenMB += Buffer.byteLength(chunk) / (1024 * 1024);
  }

  if (writtenMB < targetSizeMB) {
    stream.once('drain', write);
  } else {
    stream.end();
    console.log(`✅ Generated ${targetSizeMB}MB file: ${outputFile}`);
  }
}

write();