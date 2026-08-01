const esbuild = require('esbuild');
const fs = require('fs');
const path = require('path');

try {
  if (!fs.existsSync('dist')) {
    fs.mkdirSync('dist');
  }

  esbuild.buildSync({
    entryPoints: ['src/main.jsx'],
    bundle: true,
    outfile: 'dist/bundle.js',
    loader: { '.js': 'jsx', '.jsx': 'jsx' },
    define: {
      'process.env.NODE_ENV': '"production"',
      'global': 'window'
    },
    minify: false,
    sourcemap: true
  });

  console.log('[esbuild] Successfully bundled React app into dist/bundle.js');
} catch (err) {
  console.error('[esbuild error]', err);
}
