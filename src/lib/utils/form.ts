export function getRegEx(fieldType: string): RegExp | undefined {
  if (fieldType === 'tel') {
    return /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
  }
  if (fieldType === 'email') {
    return /^\S+@\S+\.\S+$/;
  }
}
