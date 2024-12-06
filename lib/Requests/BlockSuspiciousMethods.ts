const blockedMethods = ['OPTIONS']; // Could add DELETE here, but let's just keep it at OPTIONS since delete operations can be related to business logic
Object.freeze(blockedMethods); // Freeze to avoid Prototype Pollution attacks;

// It would be nice to make this customizable, i.e each application decides what methods are blocked
// but for the sake of keeping this case simple, we'll use it like this
export function blockMethods(method: string): void {
  if(blockedMethods.includes(method)) {
    throw new Error(`Requests sent using the ${method} HTTP method are not valid.`);
  }
}
