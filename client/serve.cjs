const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 5173;

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.jsx': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon'
};

const server = http.createServer((req, res) => {
  // Proxy API requests to Express Backend on Port 5000
  if (req.url.startsWith('/api')) {
    const proxyReq = http.request(
      {
        host: '127.0.0.1',
        port: 5000,
        path: req.url,
        method: req.method,
        headers: req.headers
      },
      (proxyRes) => {
        res.writeHead(proxyRes.statusCode, proxyRes.headers);
        proxyRes.pipe(res, { end: true });
      }
    );
    proxyReq.on('error', (err) => {
      res.writeHead(502, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ error: 'Backend server starting on port 5000...' }));
    });
    req.pipe(proxyReq, { end: true });
    return;
  }

  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
    filePath = path.join(__dirname, 'index.html');
  }

  const extname = String(path.extname(filePath)).toLowerCase();
  const contentType = mimeTypes[extname] || 'text/html';

  fs.readFile(filePath, 'utf-8', (error, content) => {
    if (error) {
      res.writeHead(500);
      res.end(`Server Error: ${error.code}`);
    } else {
      let finalContent = content;
      // Transform index.html for local bundled browser execution
      if (extname === '.html') {
        finalContent = content.replace(
          '<script type="module" src="/src/main.jsx"></script>',
          '<link rel="stylesheet" href="/dist/output.css" /><script src="/dist/bundle.js"></script>'
        );
      }
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(finalContent, 'utf-8');
    }
  });
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[Frontend Client Server] Running on http://127.0.0.1:${PORT}`);
});
