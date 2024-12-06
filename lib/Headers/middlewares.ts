import { Request, Response, NextFunction } from 'express';

import { secureHeaders } from './SecureHeaders';
import { unsafeHeaders } from './UnsafeHeaders';

/**
 * @description Injects headers into response. Uses OWASP's recommended headers
 */
async function injectHeaders(_: Request, response: Response, next: NextFunction): Promise<void> {
  const { headers } = await secureHeaders();
  Object.freeze(headers); // Freezing to prevent against Prototype Pollution

  for(const header of headers) {
    response.setHeader(header.name, header.value);
  }

  return next();
}

/**
 * @description Removes unsafe headers. Uses OWASP's list of headers.
 */
async function handleUnsafeHeaders(request: Request, response: Response, next: NextFunction): Promise<void> {
  const { headers } = await unsafeHeaders();
  Object.freeze(headers); // Freezing to prevent against Prototype Pollution
 
  for(const header of headers) {
    if(request.headers[header.toLowerCase()]) {
      delete request.headers[header.toLowerCase()];
    }
  }

  return next();
}

export {
  injectHeaders,
  handleUnsafeHeaders
}