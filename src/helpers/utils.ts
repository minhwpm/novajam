export function simpleStringify (object: {[x: PropertyKey]: any}){
  // stringify an object, avoiding circular structures
  // https://stackoverflow.com/a/31557814
  const simpleObject: {[x: PropertyKey]: any} = {};
  for (const prop in object ){
    if (!Object.prototype.hasOwnProperty.call(object, prop)) {
      continue;
    }
    if (typeof object[prop] == "object") {
      continue;
    }
    if (typeof object[prop] == "function") {
      continue;
    }
    simpleObject[prop] = object[prop];
  }
  return JSON.stringify(simpleObject); // returns cleaned up JSON
};

export function getRegEx(fieldType: string) {
  if(fieldType === "tel")
    return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  if(fieldType === "email")
    return /^\S+@\S+\.\S+$/
}