export const baseClassName = 'color-selection';

export function getClassName(elementClassName: string) {
  return `${baseClassName}__${elementClassName}`;
}
