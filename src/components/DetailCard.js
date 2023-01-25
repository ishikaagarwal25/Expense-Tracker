import React, { useContext } from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { AppContext } from "../context/context";
import { Chart } from "./Chart";

const DetailCard = ({ type }) => {
  const { totalExpense, totalIncome } = useContext(AppContext);

  return (
    <Card
      sx={{
        backgroundColor: "#FEFEFE",
        width: { xs: "350px", sm: "330px", lg: "300px" },
        height: "270px",
        borderRadius: "30px",
        boxShadow: "12px 12px 21px rgba(221, 165, 219, 0.25)",
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: "20px",
              fontWeight: "600",
              color: "#444444",
            }}
          >
            {type}
          </Typography>
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: "20px",
              fontWeight: "600",
            }}
          >
            {type.toLowerCase() === "expense"
              ? `Rs.${totalExpense}`
              : `Rs.${totalIncome}`}
          </Typography>
        </Box>
        <Chart type={type} />
      </CardContent>
    </Card>
  );
};

export default DetailCard;
