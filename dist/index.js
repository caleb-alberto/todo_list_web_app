"use strict";

var _jsxRuntime = require("react/jsx-runtime");
require('ignore-styles');
const {
  renderToPipeableStream
} = require('react-dom/server');
const {
  ServerStyleSheet
} = require('styled-components');
const App = require('./App.js').default;
const React = require('react');
const http = require('http');
const fs = require('fs');
const path = require('path');
async function handler(req, res) {
  console.log('Received request:', req.url);
  if (req.url.startsWith('/_bundle')) {
    const filePath = path.join(__dirname, req.url);
    fs.readFile(filePath, (err, data) => {
      if (err) {
        res.writeHead(404, {
          'Content-Type': 'text/plain'
        });
        res.end('Not Found');
      } else {
        res.writeHead(200, {
          'Content-Type': 'application/javascript'
        });
        res.end(data);
      }
    });
    return;
  }
  const sheet = new ServerStyleSheet();
  const {
    pipe
  } = renderToPipeableStream(sheet.collectStyles(/*#__PURE__*/(0, _jsxRuntime.jsx)(App, {})), {
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
      res.write(`</div><script src="_bundle.js" async></script></body></html>`);
      res.end();
    }
  });
}
const server = http.createServer(handler);
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});