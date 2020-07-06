function truncateString(str: string = '', num: number = 25) {
  if (str.length <= num) {
    return str;
  }

  return `${str.slice(0, num)}...`;
}

export default truncateString;
