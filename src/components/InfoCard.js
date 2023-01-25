import React from "react";
import { Snackbar, Alert } from "@mui/material";

const InfoCard = ({ open, handleClose, type }) => {
  return (
    <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
      <Alert onClose={handleClose} severity={type} sx={{ width: "100%" }}>
        {type === "error"
          ? "Please enter all the details"
          : "Transaction added successfully"}
      </Alert>
    </Snackbar>
  );
};

export default InfoCard;
