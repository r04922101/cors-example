import { Router } from 'express'
import path from 'path'

export function web(): Router {
  const router = Router();
  router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
  })
  return router;
}

export function server() {
  const router = Router();
  router.get('/', function(req, res) {
    console.log(`Got a HTTP GET request with header: ${JSON.stringify(req.headers)}`)
    res.send('Response');
  })

  router.post('/', function(req, res) {
    console.log(`Got a HTTP POST request with header: ${JSON.stringify(req.headers)}`)
    res.json({ msg: "msg", status: "200" });
  })
  return router;
}