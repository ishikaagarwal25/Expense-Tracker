import React, { useState, useEffect } from "react";
import {
  Button,
  Grid,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../context/context";
import InfoCard from "./InfoCard";
import { expenseCategories, incomeCategories } from "../constants/categories";
import { useSpeechContext } from "@speechly/react-client";
import { addDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";

const Form = () => {
  let initialState = {
    type: "",
    category: "",
    amount: "",
    date: "",
  };

  const { types, categories, transactionRef, getTransactions } =
    useContext(AppContext);
  const { user } = useContext(AuthContext);
  const { segment } = useSpeechContext();

  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  let [transaction, setTransaction] = useState(initialState);

  const handleClose = () => {
    setOpen(false);
  };

  const handleClick = (e) => {
    e.preventDefault();
    setOpen(true);
    if (
      transaction.amount === "" ||
      transaction.category === "" ||
      transaction.type === "" ||
      transaction.date === ""
    ) {
      setType("error");
    } else {
      createTransaction(transaction);
    }
  };

  const createTransaction = async (transaction) => {
    transaction = { ...transaction, userID: user.uid };
    await addDoc(transactionRef, transaction);
    setTransaction(initialState);
    getTransactions();
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTransaction((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (segment) {
      if (segment.intent.intent === "add_expense") {
        transaction = { ...transaction, type: "expense" };
        setTransaction(transaction);
      } else if (segment.intent.intent === "add_income") {
        transaction = { ...transaction, type: "income" };
        setTransaction(transaction);
      } else if (
        segment.isFinal &&
        segment.intent.intent === "add_transaction"
      ) {
        return createTransaction(transaction);
      } else if (
        segment.isFinal &&
        segment.intent.intent === "remove_transaction"
      ) {
        return setTransaction(initialState);
      }

      segment.entities.forEach((s) => {
        const category = `${s.value.toLowerCase()}`;

        switch (s.type) {
          case "amount":
            transaction = { ...transaction, amount: s.value };
            setTransaction(transaction);
            break;
          case "category":
            if (incomeCategories.map((iC) => iC.type).includes(category)) {
              transaction = {
                ...transaction,
                type: "income",
                category: category,
              };
              setTransaction(transaction);
            } else if (
              expenseCategories.map((iC) => iC.type).includes(category)
            ) {
              transaction = {
                ...transaction,
                type: "expense",
                category: category,
              };
              setTransaction(transaction);
            }
            break;
          case "date":
            transaction = { ...transaction, date: s.value };
            setTransaction(transaction);
            break;
          default:
            break;
        }
      });

      if (
        segment.isFinal &&
        transaction.amount &&
        transaction.category &&
        transaction.type &&
        transaction.date
      ) {
        createTransaction(transaction);
      }
    }
  }, [segment]);

  return (
    <Grid container spacing={2}>
      <InfoCard open={open} handleClose={handleClose} type={type} />
      <Grid item xs={6}>
        <FormControl variant="standard" sx={{ mt: 1, minWidth: 130 }}>
          <InputLabel id="demo-simple-select-standard-label">Type</InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="type"
            value={transaction.type}
            onChange={handleChange}
            label="Type"
            sx={{
              ":before": { borderBottomColor: "#F009BD" },
              ":after": { borderBottomColor: "#F009BD" },
              textTransform: "capitalize",
            }}
          >
            {types.map((current, index) => {
              return (
                <MenuItem
                  key={index}
                  value={current}
                  sx={{ textTransform: "capitalize" }}
                >
                  {current}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <FormControl variant="standard" sx={{ mt: 1, minWidth: 130 }}>
          <InputLabel id="demo-simple-select-standard-label">
            Category
          </InputLabel>
          <Select
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            name="category"
            value={transaction.category}
            onChange={handleChange}
            label="Category"
            sx={{
              ":before": { borderBottomColor: "#F009BD" },
              ":after": { borderBottomColor: "#F009BD" },
              textTransform: "capitalize",
            }}
          >
            {categories.map((current, index) => {
              return (
                <MenuItem
                  key={index}
                  value={current}
                  sx={{ textTransform: "capitalize" }}
                >
                  {current}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="input-with-sx"
          label="Amount"
          variant="standard"
          name="amount"
          value={transaction.amount}
          onChange={handleChange}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "#F009BD",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#F009BD",
            },
          }}
        />
      </Grid>
      <Grid item xs={6}>
        <TextField
          id="date"
          label="Date"
          type="date"
          variant="standard"
          name="date"
          value={transaction.date}
          onChange={handleChange}
          InputLabelProps={{ shrink: true }}
          sx={{
            "& .MuiInput-underline:before": {
              borderBottomColor: "#F009BD",
            },
            "& .MuiInput-underline:after": {
              borderBottomColor: "#F009BD",
            },
          }}
        />
      </Grid>
      <Grid item xs={12}>
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            backgroundColor: "#F009BD",
            width: "100%",
            mt: "10px",
          }}
          onClick={handleClick}
        >
          Create Transaction
        </Button>
      </Grid>
    </Grid>
  );
};

export default Form;
