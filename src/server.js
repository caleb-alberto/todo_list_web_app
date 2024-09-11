require("@babel/register")({
  presets: ["@babel/preset-env", "@babel/preset-react"],
  ignore: [/node_modules/],  
});
const http = require('http');
const handler = require('./index.js')

/*http.createServer(async function (req, res) {
    const response = await handler(req);

    res.writeHead(response.status, response.headers.raw());
  
    const stream = response.body;
    stream.pipe(res);
}).listen(8080);
*/

const server = http.createServer(handler);

server.listen(3000, () => {
  console.log('Server listening on port 3000');
});