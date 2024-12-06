// A more robust implementation would make this number customizable.
const MAX_SIZE = 1 * 1024 * 1024; // 1 MB

export function blockLargePayload(bytes: number): void {
  if(bytes > MAX_SIZE) {
    throw new Error('The request is too large to be processed by the server.');
  }
}
