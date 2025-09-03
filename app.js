// const http = require('http');

// const server = http.createServer((req, res) => {
//     console.log('incoming request');
//     console.log(req.url, req.method, req.headers);
//     // res.writeHead(200, { 'Content-Type': 'text/plain' });
//     // res.end('<h1>Hello World</h1>');
    
//     res.end('<form><input type="text"name="username" /> <button type="submit">Create</button></form>');
// })

// server.listen(5000, () => {
//   console.log('Server running at http://localhost:5000/');
// });

const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

app.use(bodyParser.urlencoded({ extended: false }));

app.post('/user', (req, res) => {
    const username = req.body.username;
    console.log('Username:', username);
      res.send('<h1>User: ' + username + '</h1>');
});
app.use((req, res, next) => {
  console.log('Incoming request:', req.method, req.url);
  next();
});

app.get('/', (req, res) => {
  res.send('<form action="/user" method="POST"><input type="text" name="username"><button type="submit">Create User</button></form>');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});