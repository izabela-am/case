import { join } from 'path';
import { readFileSync } from 'fs';

// Path to the mock database
const DATABASE = join('..', 'db', 'blocklist.txt');

export function isBlocked(ip: string): boolean {
  const blocklist = readFileSync(DATABASE);

  if(blocklist.includes(ip)) {
    return true;
  }

  return false;
}
