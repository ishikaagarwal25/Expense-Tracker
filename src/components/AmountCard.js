import React from "react";
import { Box, Typography } from "@mui/material";

const AmountCard = ({ type, amount }) => {
  return (
    <Box
      sx={
        type === "expense"
          ? {
              background: "rgba(248, 79, 49, 0.13)",
              borderRadius: "3px",
              p: "0 2px",
              display: "flex",
              alignItems: "center",
            }
          : {
              background: "rgba(128, 255, 0, 0.11)",
              borderRadius: "3px",
              p: "0 2px",
              display: "flex",
              alignItems: "center",
            }
      }
    >
      <Typography
        sx={
          type === "expense"
            ? {
                color: "#FF0000",
                textTransform: "capitalize",
                fontSize: "12px",
              }
            : {
                color: "#23C552",
                textTransform: "capitalize",
                fontSize: "12px",
              }
        }
      >
        {`Rs.${amount}`}
      </Typography>
    </Box>
  );
};

export default AmountCard;
