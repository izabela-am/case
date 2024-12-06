import { Request, Response, NextFunction } from 'express';

import { blockUserAgent } from './BlockUserAgent';

/**
 * @description Block requests coming from specific User-Agents
 */
async function userAgentBlocking(request: Request, _: Response, next: NextFunction): Promise<void> {
  const userAgent = request.headers['user-agent'] || '';

  blockUserAgent(userAgent);

  return next();
}

export {
  userAgentBlocking
}
