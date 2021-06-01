import express from 'express';
import * as sameOriginPolicy from './src/same-origin-policy';
import * as cors from './src/cors';
import { headerLoggerMiddleware } from './src/middleware/header';

const webPort = 3000;
const serverPort = 3001;

function startWebServer() {
  const server = express();

  server.use('/same-origin-policy', sameOriginPolicy.web());
  server.use('/cors', cors.web());

  server.listen(webPort);

  console.log(`Web server started at http://localhost:${webPort}`);
}

function startResourceServer() {
  const server = express();
  server.use(headerLoggerMiddleware);

  // same-origin policy
  server.use('/same-origin-policy', sameOriginPolicy.router());

  // cors
  const corsPath = '/cors';
  // Note that preflight failed routers must be used in the first place
  // Otherwise, other routers might change the server cors behavior
  server.use(corsPath, cors.preflightFailedOriginRouter());
  server.use(corsPath, cors.preflightFailedMethodRouter());
  server.use(corsPath, cors.preflightFailedHeaderRouter());

  server.use(corsPath, cors.simpleRouter());
  server.use(corsPath, cors.wildcardSimpleRouter());
  server.use(corsPath, cors.credentials());

  server.listen(serverPort);

  console.log(`Resource server started at http://localhost:${serverPort}`);
}

function main() {
  startWebServer();
  startResourceServer();
}

main();
