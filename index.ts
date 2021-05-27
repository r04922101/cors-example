import express from 'express'
import * as sameOriginPolicy from './src/same-origin-policy'

const webPort = 3000;
const serverPort = 3001;

function startWebServer() {
  const server = express();

  server.use('/same-origin-policy', sameOriginPolicy.web());

  server.listen(webPort);

  console.log(`Web server started at http://localhost:${webPort}`)
}

function startResourceServer() {
  const server = express();

  server.use('/same-origin-policy', sameOriginPolicy.server());

  server.listen(serverPort);

  console.log(`Resource server started at http://localhost:${serverPort}`)
}



function main() {
  startWebServer();
  startResourceServer();
}

main();