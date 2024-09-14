"use strict";

var _jsxRuntime = require("react/jsx-runtime");
require('ignore-styles');
const {
  renderToPipeableStream
} = require('react-dom/server');
const App = require('./App.js').default;
const React = require('react');
const http = require('http');
async function handler(req, res) {
  console.log('Received request:', req.url);
  console.log(App);
  const {
    pipe
  } = renderToPipeableStream(/*#__PURE__*/(0, _jsxRuntime.jsx)(App, {}), {
    bootstrapScripts: ['/client.js'],
    onShellReady() {
      res.setHeader('content-type', 'text/html');
      pipe(res);
    }
  });
}
const server = http.createServer(handler);
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});