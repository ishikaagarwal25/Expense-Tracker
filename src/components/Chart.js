import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
import { Box } from "@mui/material";
import { ChartData } from "../utils/chartData";

ChartJS.register(ArcElement, Tooltip, Legend);

export function Chart({ type }) {
  const data = ChartData(type);
  return (
    <Box
      width="280px"
      height="200px"
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: "2%",
      }}
    >
      <Doughnut data={data} options={{ maintainAspectRatio: false }} />
    </Box>
  );
}
