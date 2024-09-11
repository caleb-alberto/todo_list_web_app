import { renderToReadableStream } from 'react-dom/server';
import App from './App';

async function handler(request) {
  const stream = await renderToReadableStream(<App />, {
    bootstrapScripts: ['/App.jsx']
  });
  return new Response(stream, {
    headers: { 'content-type': 'text/html' },
  });
}

const domNode = document.getElementById('root');
const root = hydrateRoot(domNode, reactNode);
root.render(<App />);