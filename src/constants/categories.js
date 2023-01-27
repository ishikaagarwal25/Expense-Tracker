export const incomeCategories = [
  { type: "salary", amount: 0, color: "#123123" },
  { type: "investment", amount: 0, color: "#154731" },
  { type: "savings", amount: 0, color: "#165f40" },
  { type: "freelancing", amount: 0, color: "#16784f" },
  { type: "side biz", amount: 0, color: "#14915f" },
  { type: "gifts received", amount: 0, color: "#10ac6e" },
];

export const expenseCategories = [
  { type: "restaurant", amount: 0, color: "#b50d12" },
  { type: "rent", amount: 0, color: "#bf2f1f" },
  { type: "books", amount: 0, color: "#c9452c" },
  { type: "travel", amount: 0, color: "#d3583a" },
  { type: "coffee", amount: 0, color: "#dc6a48" },
  { type: "grocery", amount: 0, color: "#e57c58" },
  { type: "bills", amount: 0, color: "#ee8d68" },
  { type: "phone", amount: 0, color: "#f79d79" },
  { type: "entertainment", amount: 0, color: "#ffae8a" },
  { type: "clothes", amount: 0, color: "#cc474b" },
  { type: "other", amount: 0, color: "#f55b5f" },
];

export const resetCategories = () => {
  incomeCategories.forEach((c) => (c.amount = 0));
  expenseCategories.forEach((c) => (c.amount = 0));
};
