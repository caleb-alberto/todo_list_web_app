import http from 'http';
import handler from './index.js';

http.createServer(async function (req, res) {
    const response = await handler(req);

    res.writeHead(response.status, response.headers.raw());
  
    const stream = response.body;
    stream.pipe(res);
}).listen(8080);
