/**
 * The base props that every component should have
 */
export interface IBaseProps {
  /**
   * A custom class name to add to the root node
   */
  className?: string;
  /**
   * The attribute to add to the root node for automation testing
   */
  dataTestId?: string;
}
