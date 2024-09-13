"use strict";

require('ignore-styles');
const {
  renderToReadableStream
} = require('react-dom/server');
const App = require('./App.js');
const React = require('react');
const http = require('http');
async function handler(req, res) {
  console.log('Received request:', req.url);
  console.log(App);
  const stream = await renderToReadableStream(/*#__PURE__*/React.createElement(App.default, null), {
    bootstrapScripts: ['/client.js']
  });
  console.log('Starting to stream HTML...');
  res.writeHead(200, {
    'content-Type': 'text/html'
  });
  stream.pipe(res);
  stream.on('end', () => {
    res.end();
  });
}
const server = http.createServer(handler);
server.listen(3000, () => {
  console.log('Server listening on port 3000');
});