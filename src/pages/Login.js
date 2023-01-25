import React from "react";
import { Box } from "@mui/material";
import LoginCard from "../components/LoginCard";

const Login = () => {
  return (
    <Box
      sx={{
        backgroundImage:
          "linear-gradient(to top, #ff9a9e 0%, #fecfef 99%, #fecfef 100%)",
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoginCard />
    </Box>
  );
};

export default Login;
