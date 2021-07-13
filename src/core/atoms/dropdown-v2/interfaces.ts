export interface IDropdownV2Props {
  type: 'drop-down' | 'drop-select';
  open: boolean;
  label: string;
  children: React.ReactNode[] | React.ReactNode;
  onLabelClick: (event: React.MouseEvent<HTMLSpanElement>) => void;
  onContainerClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  multiselect: boolean;
  renderSummary?: (ref: React.Ref<HTMLDivElement>) => React.ReactNode;
  selected: unknown[];
}
