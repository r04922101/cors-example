import express from 'express'
import * as sameOriginPolicy from './src/same-origin-policy'
import * as cors from './src/cors'
import { headerLoggerMiddleware } from './src/middleware/header';

const webPort = 3000;
const serverPort = 3001;

function startWebServer() {
  const server = express();

  server.use('/same-origin-policy', sameOriginPolicy.web());
  server.use('/cors', cors.web());
  server.use(headerLoggerMiddleware)

  server.listen(webPort);

  console.log(`Web server started at http://localhost:${webPort}`)
}

function startResourceServer() {
  const server = express();

  // same-origin policy
  server.use('/same-origin-policy', sameOriginPolicy.router());

  // cors
  const corsPath = '/cors'
  server.use(corsPath, cors.simpleRouter());
  server.use(corsPath, cors.wildcardSimpleRouter());

  server.listen(serverPort);

  console.log(`Resource server started at http://localhost:${serverPort}`)
}



function main() {
  startWebServer();
  startResourceServer();
}

main();