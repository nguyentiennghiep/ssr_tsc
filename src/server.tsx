import * as express from 'express';
import * as cors from 'cors';
import { renderToString } from 'react-dom/server';
import App from './client/components/App';
import * as React from 'react';

const app = express();
app.use(express.static('dist'));

app.use(cors());

app.get('*', (req, res, next) => {
    const markup = renderToString(
        <App />
    );
    res.send(`<!DOCTYPE html>
    <html>
      <head>
        <title>SSR with RR</title>
      </head>

      <body>
        <div id="app">${markup}</div>
      </body>
    </html>`);
});

app.listen(3000, () => {
    console.log(`Server is listening on port: 3000`);
});