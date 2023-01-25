import React, { createContext, useContext, useState } from "react";
import { incomeCategories, expenseCategories } from "../constants/categories";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "./AuthContext";

const AppContext = createContext();

const AppProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
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

  let current;
  if (user) current = user.uid;

  const getTransactions = async () => {
    try {
      const q = query(transactionRef, where("userID", "==", current));
      const querySnapshot = await getDocs(q);
      const trand = querySnapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      }));
      setTransac(trand);
    } catch (error) {
      console.log(error);
    }
  };

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
        getTransactions,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContext, AppProvider };
