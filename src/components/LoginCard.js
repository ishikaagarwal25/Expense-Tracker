import React from "react";
import { Box, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext, useEffect } from "react";
import { GOOGLE_LOGO } from "../constants/constants.js";

const LoginCard = () => {
  const { googleSignIn, user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleGoogleSignIn = async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (user != null) {
      navigate("/tracker");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <Box
      sx={{
        width: { xs: "300px", sm: "500px", md: "30vw" },
        height: { xs: "350px", sm: "350px", md: "35vh" },
        backgroundColor: "#F3E4F1",
        borderRadius: "20px",
        padding: "20px",
      }}
    >
      <Typography
        sx={{
          textTransform: "capitalize",
          fontSize: { xs: "18px", sm: '"22px"' },
          fontWeight: "600",
          mt: "0.5rem",
        }}
      >
        <span fontSize="20px">💸</span> Save your money from flying away
      </Typography>
      <Typography
        sx={{
          fontSize: { xs: "14px", sm: "16px" },
          fontWeight: "500",
          mt: { xs: "1rem", sm: "0.3rem" },
          color: "#000",
        }}
      >
        <span fontSize="20px">📝</span> By tracking it using{" "}
        <b>Expense Tracker</b>
      </Typography>
      <Typography
        sx={{
          textTransform: "capitalize",
          fontSize: { xs: "20px", sm: "24px" },
          fontWeight: "600",
          mt: { xs: "4rem", sm: "3rem" },
          color: "#000",
          textAlign: "center",
        }}
      >
        Login to your account
      </Typography>
      <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          variant="contained"
          sx={{
            textTransform: "capitalize",
            backgroundColor: "#4285F4",
            width: "250px",
            height: "50px",
            mt: "10px",
            display: "flex",
            justifyContent: "space-around",
          }}
          onClick={handleGoogleSignIn}
        >
          <img
            src={GOOGLE_LOGO}
            alt="Google Logo"
            width="40px"
            height="40px"
            mr="10px"
            sx={{ borderRadius: "10px" }}
          />
          Log in using Google
        </Button>
      </Box>
    </Box>
  );
};

export default LoginCard;
