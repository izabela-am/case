import { Request, Response, NextFunction } from 'express';
import rateLimit, { RateLimitRequestHandler } from 'express-rate-limit';

import { blockUnsafeHTTP } from './BlockUnsafeHTTP';
import { blockMethods } from './BlockSuspiciousMethods';

/**
 * @description Throws an error if request does not use TLS over HTTP
 */
function blockUnsafeRequests(request: Request, _: Response, next: NextFunction): void {
  const isHTTPS = request.secure; // this will be set to true if a TLS connection is established

  blockUnsafeHTTP(isHTTPS);

  return next();
}

/**
 * @description Throws an error if request uses a blocked HTTP method
 */
function blockHttpMethods(request: Request, _: Response, next: NextFunction): void {
  const { method } = request;

  blockMethods(method);

  return next();
}

/**
 * @description Sets up rate limiting
 */
function rateLimiting(): RateLimitRequestHandler {
  const rateLimiting = rateLimit({
    windowMs: 24 * 60 * 60 * 1000, // 24 hrs in ms
    max: 100,
    message: 'You have exceeded the threshold of 100 requests in 24 hours.', 
    standardHeaders: true,
    legacyHeaders: false,
  });

  return rateLimiting;
}

export {
  blockUnsafeRequests,
  blockHttpMethods,
  rateLimiting
}