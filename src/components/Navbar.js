import React, { useContext } from "react";
import { Box, Typography, Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { logOut } = useContext(AuthContext);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box
      width="100vw"
      height="60px"
      backgroundColor="#F009BD"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          textTransform: "capitalize",
          fontSize: { xs: "16px", md: "22px" },
          fontWeight: "600",
          m: { xs: "5px 40px", md: "15px 90px" },
          color: "#fff",
        }}
      >
        expense tracker
      </Typography>
      <Button
        variant="contained"
        sx={{
          textTransform: "capitalize",
          color: "#F009BD",
          backgroundColor: "#fff",
          m: { xs: "5px 40px", md: "10px 90px" },
          fontWeight: "600",
        }}
        onClick={handleSignOut}
      >
        Logout
      </Button>
    </Box>
  );
};

export default Navbar;
