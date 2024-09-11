import { renderToReadableStream } from 'react-dom/server';
import App from './App';
import { createRoot } from 'react-dom/client';

async function handler(request) {
  const stream = await renderToReadableStream(<App />, {
    bootstrapScripts: ['/App.jsx']
  });
  return new Response(stream, {
    headers: { 'content-type': 'text/html' },
  });
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);