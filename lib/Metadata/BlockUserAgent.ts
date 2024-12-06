const maliciousUserAgentPatterns = [
  'sqlmap',
  'nikto',
  'nmap',
  'curl',
  'wget',
  'bot', // Generic bot pattern
  'crawler', // Generic crawler pattern
  'spider', // Generic spider pattern
];
Object.freeze(maliciousUserAgentPatterns); // Freezing to prevent against Prototype Pollution

export function blockUserAgent(userAgent: string): void {
  if(maliciousUserAgentPatterns.includes(userAgent)) {
    throw new Error('Requests sent using this User-Agent are not accepted by the server.');
  }
}
