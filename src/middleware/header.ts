import express from 'express';

export function headerLoggerMiddleware(
  request: express.Request,
  response: express.Response,
  next: express.NextFunction,
) {
  console.log(`Got HTTP ${request.method} to ${request.path} with ${JSON.stringify(request.headers)}`);
  next();
}
