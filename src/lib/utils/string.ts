export function simpleStringify(object: { [x: PropertyKey]: any }): string {
  const simpleObject: { [x: PropertyKey]: any } = {};
  for (const prop in object) {
    if (!Object.prototype.hasOwnProperty.call(object, prop)) continue;
    if (typeof object[prop] === 'object') continue;
    if (typeof object[prop] === 'function') continue;
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject);
}
