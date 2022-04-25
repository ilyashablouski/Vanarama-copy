export const hasDuplicates = <T extends string | number>(arr: T[]): boolean => {
  const uniq = new Set(arr);
  return uniq.size !== arr.length;
};

export const sum = <T extends any>(arr: T[], selector: (item: T) => number) =>
  arr.reduce((acc, _) => acc + selector(_), 0);

export const isTruthy = <T extends any>(_?: T | null): _ is T => Boolean(_);

export const arraysAreEqual = (
  first: any[],
  second: any[],
  sortByKey?: string | null,
  unsorted?: boolean,
) => {
  if (unsorted) {
    return JSON.stringify(first) === JSON.stringify(second);
  }
  if (sortByKey) {
    const firstArray = first?.sort(
      (firstItem, secondItem) => firstItem[sortByKey] - secondItem[sortByKey],
    );
    const secondArray = second?.sort(
      (firstItem, secondItem) => firstItem[sortByKey] - secondItem[sortByKey],
    );
    return JSON.stringify(firstArray) === JSON.stringify(secondArray);
  }
  return JSON.stringify(first?.sort()) === JSON.stringify(second?.sort());
};
