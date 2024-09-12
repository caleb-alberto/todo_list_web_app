require('ignore-styles');
require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  ignore: [/node_modules/],  
  extensions: [".js", ".jsx"]
});
const http = require('http');
const handler = require('./index.js')

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});