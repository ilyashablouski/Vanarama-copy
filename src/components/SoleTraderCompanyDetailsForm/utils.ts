// eslint-disable-next-line import/prefer-default-export
export const calculateDisposableIncome = ({
  annualTurnover,
  existingVehicle,
  annualCostOfSales,
  annualExpenses,
  monthlyAmountBeingReplaced,
}: {
  annualTurnover: string;
  existingVehicle: boolean;
  annualCostOfSales: string;
  annualExpenses: string;
  monthlyAmountBeingReplaced: string;
}) => {
  const totalExpenses = +annualCostOfSales + +annualExpenses;

  if (!existingVehicle) {
    return +annualTurnover - totalExpenses;
  }

  const totalTurnover = +annualTurnover + +monthlyAmountBeingReplaced * 12;
  return totalTurnover - totalExpenses;
};
