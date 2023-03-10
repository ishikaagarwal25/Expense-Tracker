import {
  incomeCategories,
  expenseCategories,
  resetCategories,
} from "../constants/categories";
import { AppContext } from "../context/context";
import { useContext } from "react";

export const useChartData = (type) => {
  resetCategories();
  const { transac } = useContext(AppContext);

  let specificTransactions = transac.filter((current) => current.type === type);

  const currentCategories =
    type === "expense" ? expenseCategories : incomeCategories;

  specificTransactions.forEach((element) => {
    console.log("running");
    let amt = 0;
    const category = currentCategories.find((c) => c.type === element.category);
    if (category) {
      amt = parseInt(category.amount) + parseInt(element.amount);
      category.amount = amt;
    }
  });

  const filteredCategories = currentCategories.filter(
    (current) => current.amount > 0
  );

  console.log(incomeCategories);

  const data = {
    labels: filteredCategories.map((category) => category.type),
    datasets: [
      {
        label: type,
        data: filteredCategories.map((category) => parseInt(category.amount)),
        borderColor: ["#fff"],
        backgroundColor: filteredCategories.map((category) => category.color),
        borderWidth: 0.5,
      },
    ],
  };
  return data;
};
