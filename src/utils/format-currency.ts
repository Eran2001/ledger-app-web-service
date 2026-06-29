export const formatCurrency = (amount: number): string => {
  if (amount == null || isNaN(amount)) return "—";
  return `LKR ${amount.toLocaleString()}`;
};
