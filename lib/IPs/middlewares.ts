import { Request, Response, NextFunction } from 'express';

import { addToBlocklist } from './AddToBlocklist';
import { isBlocked } from './CheckIfBlocked';

// These are the methods devs will be able to import and use

/**
 * @description Adds an IP to the Blocklist
 */
function blocklistIP(request: Request, _: Response, next: NextFunction): void {
  const ip = request.ip;

  addToBlocklist(ip!);

  return next();
}

/**
 * @description Checks if an IP is blocklisted
 */
function isBlocklisted(request: Request, response: Response, next: NextFunction): Response | void {
  const ip = request.ip;

  if(isBlocked(ip!)) {
    return response.status(403).send('This IP address is blocked.')
  }

  return next();
}

export {
  blocklistIP,
  isBlocklisted
}