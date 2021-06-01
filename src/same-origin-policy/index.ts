import { Router } from 'express';
import path from 'path';

export function web(): Router {
  const router = Router();
  router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
  });
  return router;
}

export function router() {
  const router = Router();
  router.get('/', function(req, res) {
    res.send('You will never get response...');
  });

  router.post('/', function(req, res) {
    res.json({ msg: 'msg', status: '200' });
  });
  return router;
}
