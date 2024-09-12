import React from 'react';
import { renderToReadableStream } from 'react-dom/server';
import App from './App.jsx';

console.log(App)

async function handler(request) {
  const stream = await renderToReadableStream(<App />, {
    bootstrapScripts: ['/App.jsx']
  });
  return new Response(stream, {
    headers: { 'content-type': 'text/html' },
  });
}

module.exports = handler;