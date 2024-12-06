import { join } from 'path';
import { writeFileSync } from 'fs';

// Path to the mock database
const DATABASE = join('..', 'db', 'blocklist.txt');

export function addToBlocklist(ip: string): void {
  const date = new Date();

  const data = {
    ip,
    blocked_at: date,
  };
  
  writeFileSync(DATABASE, JSON.stringify(data));

  console.log(`IP ${ip} was added to the Blocklist. Block will expire @ ${date}`); // log
}
