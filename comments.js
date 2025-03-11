// Create web server
// This is a simple web server that allows you to add and view comments.
// The comments are stored in a file called comments.json.
// The server uses the Express.js framework and the body-parser middleware.
// The server listens on port 3000.

// Load the express module
const express = require('express');
// Load the body-parser module
const bodyParser = require('body-parser');
// Load the fs module
const fs = require('fs');

// Create an express application
const app = express();

// Use body-parser middleware
app.use(bodyParser.json());

// Set the directory for static files
app.use(express.static(__dirname + '/public'));

// Load the comments from the comments.json file
let comments = JSON.parse(fs.readFileSync('comments.json'));

// Get the comments
app.get('/comments', (req, res) => {
  res.json(comments);
});

// Add a comment
app.post('/comments', (req, res) => {
  const comment = req.body;
  comments.push(comment);
  fs.writeFileSync('comments.json', JSON.stringify(comments));
  res.json(comment);
});

// Listen on port 3000
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
