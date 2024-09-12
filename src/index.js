require('ignore-styles');
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  ignore: [/node_modules/],  
  extensions: [".js", ".jsx"]
});
const { renderToReadableStream } = require('react-dom/server');
const App = require('./App.jsx');
const http = require('http');

async function handler(req, res) {

  console.log('Received request:', req.url);

  const stream = await renderToReadableStream(<App />, {
    bootstrapScripts: ['/client.js']
  });
  console.log('Starting to stream HTML...');

  res.writeHead(200, { 'content-Type': 'text/html'});
  stream.pipe(res);
  stream.on('end', () => {
    res.end();
  })
}

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});