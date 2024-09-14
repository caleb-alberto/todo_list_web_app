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
async function handler(req, res) {
  console.log('Received request:', req.url);
  const sheet = new ServerStyleSheet();
  const {
    pipe
  } = renderToPipeableStream(sheet.collectStyles(/*#__PURE__*/(0, _jsxRuntime.jsx)(App, {})), {
    bootstrapScripts: ['/client.js'],
    // Your client-side hydration script
    onShellReady() {
      res.setHeader('Content-Type', 'text/html');
      res.setHeader('Transfer-Encoding', 'chunked');
      const styleTags = sheet.getStyleTags(); // Extract the styles as string

      res.write(`<!DOCTYPE html><html lang="en"><head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <link rel="stylesheet" href="/styles.css">
          <title>My App</title>
          ${styleTags} <!-- Insert the extracted styles -->
          </head><body><div id="root">`);
      pipe(res);
    }
  });
}
const server = http.createServer(handler);
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});