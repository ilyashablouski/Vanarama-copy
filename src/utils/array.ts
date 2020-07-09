export const hasDuplicates = <T extends string | number>(arr: T[]): boolean => {
  const uniq = new Set(arr);
  return uniq.size !== arr.length;
};

export const sum = <T extends any>(arr: T[], selector: (item: T) => number) =>
  arr.reduce((acc, _) => acc + selector(_), 0);

export const isTruthy = <T extends any>(_?: T | null): _ is T => Boolean(_);
