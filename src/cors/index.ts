import cors from 'cors';
import { Router } from 'express'
import path from 'path'

export function web(): Router {
  const router = Router();
  router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
  })
  return router;
}

export function simpleRouter(): Router {
  const router = Router()
  let webPath = '/simple'
  router.get(webPath, function(req, res) {
    console.log(`Got a HTTP GET request with header: ${JSON.stringify(req.headers)}`)
    res.send('Response');
  })
  router.post(webPath, function(req, res) {
    console.log(`Got a HTTP POST request with header: ${JSON.stringify(req.headers)}`)
    res.json({ msg: "msg", status: "200" });
  });
  return router;
}

export function wildcardSimpleRouter(): Router {
  const router = Router()
  // Simple Usage (Enable All CORS Requests)
  router.use(cors())
  const webPath = '/wildcard'
  router.get(webPath, function(req, res) {
    res.send('Server responded GET method with header Access-Control-Allow-Origin: *');
  })
  router.post(webPath, function(req, res) {
    res.send('Server responded POST with header Access-Control-Allow-Origin: *');
  })
  return router;
}
