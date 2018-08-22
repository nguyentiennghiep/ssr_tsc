import * as express from 'express';
import * as cors from 'cors';
import { renderToString } from 'react-dom/server';
import App from './client/components/App';
import * as React from 'react';
import * as serialize from 'serialize-javascript';
import api from './utils/api';
import { StaticRouter, matchPath } from 'react-router-dom';
import routes from './routes';

const app = express();
app.use(express.static('dist'));

app.use(cors());

app.get('*', (req, res, next) => {
  const activeRoute: any = routes.find(route => {
    return (matchPath(req.url, route) !== null);
  }) || {};
  const promise: any = activeRoute.fetchInitialData ? activeRoute.fetchInitialData(req.path) : Promise.resolve();
  promise.then(data => {
    const context: any = { data };
    const markup = renderToString(
      <StaticRouter location={req.url} context={context}>
        <App/>
      </StaticRouter>
    );
    res.send(`<!DOCTYPE html>
      <html>
        <head>
          <title>SSR with RR</title>
          <script src="/bundle.js" defer></script>
          <script>window.__INITIAL_DATA__=${JSON.stringify(data)}</script>
        </head>
        <body>
          <div id="app">${markup}</div>
        </body>
      </html>`);
  }).catch(next);
});

app.listen(3000, () => {
  console.log(`Server is listening on port: 3000`);
});