require('ignore-styles');
const { renderToPipeableStream } = require('react-dom/server');
const { ServerStyleSheet } = require('styled-components');
const App = require('./App.js').default;
const React = require('react');
const http = require('http');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();
const mypasswordbitch = process.env.DB_PASSWORD;
const uri = `mongodb+srv://calebalberto:${mypasswordbitch}@cluster0.hbqyx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const taskModel = new mongoose.model('Task', new mongoose.Schema({
  name: String,
  desc: String,
  status: Boolean
}));

const connectDB = async () => {
  await mongoose.connect(uri);
  console.log("mongoose connected")
}

async function handler(req, res) {
  
  console.log('Received request:', req.url);
  
  if (req.url.startsWith('/_bundle')) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Not Found');
      } else {
        res.writeHead(200, { 'Content-Type': 'application/javascript' });
        res.end(data);
      }
    });
    return;
  }
  
  if (req.url == '/api/data'){
    const taskData = await taskModel.find();
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(taskData))
    return;
  }

  if ((req.method == 'POST') && (req.url == '/api/submit')) {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      const data = JSON.parse(body);
      console.log(data)
      const newTask = new taskModel(data);
      newTask.save(); 
    })
  }

  if (req.url == '/api/delete') {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });
    
    req.on('end', async () => {
      const data = JSON.parse(body);
      console.log(data)
      await taskModel.deleteOne({ name: data.name })
  })
  }   

  const sheet = new ServerStyleSheet();

  const { pipe } = renderToPipeableStream(sheet.collectStyles(<App />), 
    {
      onShellReady() {
        res.setHeader('Content-Type', 'text/html');
        res.setHeader('Transfer-Encoding', 'chunked');
        const styleTags = sheet.getStyleTags(); 
      
        res.write(`<!DOCTYPE html><html lang="en"><head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/styles.css">
          <title>My App</title>
          ${styleTags} 
          </head><body><div id="root">`);
        pipe(res);
     },
     onAllReady() {
      res.write(`</div><script src="/_bundle.js" async></script></body></html>`);
        res.end();
  }})
}

const server = http.createServer(handler);

connectDB();
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});