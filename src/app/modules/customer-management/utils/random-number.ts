export function randomNum(max: any) {
  return Math.floor(Math.random() * max);
}

export function randomChar() {
  return String.fromCharCode(randomNum(100));
}

export const randomString = (length: any): string => {
  let str = "";
  for (let i = 0; i < length; ++i) {
    str += randomChar();
  }
  return str;
};
