export function simpleStringify(object: { [x: PropertyKey]: any }) {
  // stringify an object, avoiding circular structures
  const simpleObject: { [x: PropertyKey]: any } = {};
  for (const prop in object) {
    if (!Object.prototype.hasOwnProperty.call(object, prop)) {
      continue;
    }
    if (typeof object[prop] == 'object') {
      continue;
    }
    if (typeof object[prop] == 'function') {
      continue;
    }
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
}

export function getRegEx(fieldType: string) {
  if (fieldType === 'tel')
    return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  if (fieldType === 'email') return /^\S+@\S+\.\S+$/;
}

export function generateColorClassnames(
  colorPrimary: string | null,
  colorSecondary: string | null,
) {
  return {
    primaryColor: `${colorPrimary}-primary-color`,
    secondaryColor: `${colorSecondary}-secondary-color`,
  };
}
