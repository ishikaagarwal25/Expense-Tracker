import React, { createContext, useState } from "react";
import { incomeCategories, expenseCategories } from "../constants/categories";
import { collection } from "firebase/firestore";
import { db } from "../firebase";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  let categories = [
    ...incomeCategories.map((current) => current.type),
    ...expenseCategories.map((current) => current.type),
  ];
  const types = ["expense", "income"];

  const [transac, setTransac] = useState([]);

  const calculateAmount = transac.reduce(
    (total, current) =>
      current.type === "expense"
        ? total - parseInt(current.amount)
        : total + parseInt(current.amount),
    0
  );

  let totalExpense = transac
    .filter((current) => current.type === "expense")
    .reduce((total, current) => (total += parseInt(current.amount)), 0);
  let totalIncome = transac
    .filter((current) => current.type === "income")
    .reduce((total, current) => (total += parseInt(current.amount)), 0);

  const transactionRef = collection(db, "transactions");
  return (
    <AppContext.Provider
      value={{
        categories,
        types,
        calculateAmount,
        totalExpense,
        totalIncome,
        transac,
        setTransac,
        transactionRef,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
