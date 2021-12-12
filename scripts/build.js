require('dotenv').config();
const fs = require('fs');

const OUT_DIR = process.env.OUT_DIR;
const isDev = process.argv.includes('--dev');
const shouldClean = process.argv.includes('--clean');

if (shouldClean && fs.existsSync(OUT_DIR)) {
  fs.rmSync(OUT_DIR, { recursive: true });
}

const commonOptions = {
  bundle: true,
  minify: true,
  sourcemap: isDev ? true : false,
  // target: ['chrome58', 'firefox57', 'safari11', 'edge16'],
}

// Build client
require('esbuild').build({
  ...commonOptions,
  entryPoints: ['client/src/index.tsx'],
  outfile: OUT_DIR + '/app.js',
}).catch(() => process.exit(1))

// Build server
require('esbuild').build({
  ...commonOptions,
  entryPoints: ['server/src/server.tsx'],
  outfile: OUT_DIR + '/server.js',
  platform: 'node',
}).catch(() => process.exit(1))