const charMap = new Map([
  ['&', '&amp;'],
  ['<', '&lt;'],
  ['>', '&gt;'],
  ['"', '&quot;'],
  ["'", '&#39;'],
  ['/', '&#x2F;'],
  ['`', '&#x60;'],
  ['=', '&#x3D;'],
  [';', '&#x3B;'],
  ['(', '&#40;'],
  [')', '&#41;'],
  ['%', '&#37;'],
  ['$', '&#36;'],
  ['{', '&#123;'],
  ['}', '&#125;'],
  ['\0', '\\0'],
  ['\x08', '\\b'],
  ['\x09', '\\t'],
  ['\x1a', '\\Z'],
  ['\n', '\\n'],
  ['\r', '\\r'],
  ['"', '\\"'],
  ["'", "\\'"],
  ['\\', '\\\\'],
  ['%', '\\%'],
  [';', '\\;'],
  ['--', '\\--'],  // SQL comment
  ['/*', '\\/*'], // SQL block comment start
  ['*/', '\\*/'], // SQL block comment end
]);
Object.freeze(charMap);

export function escape(input: string): string {
  return input.replace(/[&<>"'/`=;%(){}$]/g, (match) => {
    const escapeChar = charMap.get(match);
    return escapeChar !== undefined ? escapeChar : match;
  });
}
