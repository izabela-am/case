export function blockUnsafeHTTP(isHTTPS: boolean): void {
  if(!isHTTPS) {
    throw new Error('Requests sent without HTTPS are not accepted by the server.');
  }
}
