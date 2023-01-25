import React from "react";
import DetailCard from "../components/DetailCard";
import MainCard from "../components/MainCard";
import PastTransactions from "../components/PastTransactions";
import { Box, Typography } from "@mui/material";
import { useContext } from "react";
import { AppContext } from "../context/context";
import Navbar from "../components/Navbar";
import "../App.css";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { types } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  return (
    <>
      <Navbar />
      {user.displayName === undefined ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "20px",
            height: "60vh",
          }}
        >
          <Typography fontSize="24px" fontWeight="600">
            <span>😏</span> Please wait while we calculate how broke you are...
          </Typography>
        </Box>
      ) : (
        <div className="app">
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexWrap: { xs: "wrap", lg: "nowrap" },
              gap: { xs: "30px", lg: "0" },
              paddingTop: { xs: "80px", lg: "0px" },
            }}
          >
            <MainCard />

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                ml: { xs: "0", lg: "2rem" },
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  mb: "2rem",
                  justifyContent: { xs: "center", lg: "space-between" },
                  flexWrap: { xs: "wrap", lg: "nowrap" },
                  gap: { xs: "30px" },
                }}
              >
                <DetailCard type={types[1]} />
                <DetailCard type={types[0]} />
              </Box>
              <Box sx={{ display: "flex", justifyContent: "center" }}>
                <PastTransactions />
              </Box>
            </Box>
          </Box>
        </div>
      )}
    </>
  );
};

export default Home;
