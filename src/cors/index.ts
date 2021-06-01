import cors from 'cors';
import { Router } from 'express';
import path from 'path';

export function web(): Router {
  const router = Router();
  router.get('/', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'));
  });
  return router;
}

export function simpleRouter(): Router {
  const router = Router();
  const endpoint = '/simple';
  router.get(endpoint, function(req, res) {
    console.log(`Got a HTTP GET request with header: ${JSON.stringify(req.headers)}`);
    res.send('Simple response');
  });
  router.post(endpoint, function(req, res) {
    console.log(`Got a HTTP POST request with header: ${JSON.stringify(req.headers)}`);
    res.send('Simple response');
  });
  return router;
}

export function wildcardSimpleRouter(): Router {
  const router = Router();
  // Simple Usage (Enable All CORS Requests)
  router.use(cors());
  const endpoint = '/wildcard';
  router.get(endpoint, function(req, res) {
    res.send('Server responded GET method with header Access-Control-Allow-Origin: *');
  });
  router.post(endpoint, function(req, res) {
    res.send('Server responded POST with header Access-Control-Allow-Origin: *');
  });
  return router;
}

export function preflightFailedOriginRouter(): Router {
  const router = Router();
  const endpoint = '/preflight-failed-origin';
  router.options(endpoint, function(req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3001');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Method', 'POST');

    return res.sendStatus(400);
  });
  router.post(endpoint, function(req, res) {
    res.send('You will never get response because preflight check failed.');
  });
  return router;
}

export function preflightFailedMethodRouter(): Router {
  const router = Router();
  const endpoint = '/preflight-failed-method';
  router.options(endpoint, function(req, res) {
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Method', 'GET');
    return res.sendStatus(400);
  });
  router.post(endpoint, function(req, res) {
    res.send('You will never get response because preflight check failed.');
  });
  return router;
}

export function preflightFailedHeaderRouter(): Router {
  const router = Router();
  const endpoint = '/preflight-failed-header';
  router.options(endpoint, function(req, res) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    res.header('Access-Control-Allow-Method', 'POST');
    return res.sendStatus(400);
  });
  router.post(endpoint, function(req, res) {
    res.send('You will never get response because preflight check failed.');
  });
  return router;
}

export function credentials(): Router {
  const router = Router();
  const endpoint = '/credentials';
  router.use(
    cors({
      origin: 'http://localhost:3000',
      credentials: true,
    }),
  );
  router.get(endpoint, function(req, res) {
    res.send('GET response with credentials.');
  });
  return router;
}
