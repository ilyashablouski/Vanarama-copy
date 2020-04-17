export type TEmploymentEntry = {
  status: string;
  month: string;
  year: string;
};

export interface IEmploymentFormValues {
  history: TEmploymentEntry[];
}
