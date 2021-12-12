require('dotenv').config();
import express from 'express';
import React from 'react';
import * as ReactDOMServer from 'react-dom/server';
import { App } from '../../client/src/App';

const OUT_DIR = process.env.OUT_DIR;
const PORT = process.env.PORT;
const app = express();

app.get('/', (_req, res) => {
  const app = ReactDOMServer.renderToString(<App />);

  const html = `
    <html lang='en'>
    <head>
      <script src="app.js" async defer></script>
    </head>
    <body>
      <div id="root">${app}</div>
    </body>
    </html>
  `

  res.send(html);
});

app.use(express.static("./" + OUT_DIR));

app.listen(PORT, () => console.log(`listening on ${PORT}`))