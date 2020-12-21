/* eslint-disable import/prefer-default-export */
export const atomicDir = (file: string) => {
  const filePath = file.split('/');
  return filePath.slice(filePath.length - 3, filePath.length - 2)[0];
};
