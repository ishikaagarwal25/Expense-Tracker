import React, { useContext } from "react";
import { Card, CardContent, Typography, Box, Divider } from "@mui/material";
import Form from "./Form";
import { AppContext } from "../context/context";
import {
  PushToTalkButton,
  PushToTalkButtonContainer,
} from "@speechly/react-ui";
import { useSpeechContext } from "@speechly/react-client";
import "../App.css";
import { AuthContext } from "../context/AuthContext";

const MainCard = () => {
  const { calculateAmount } = useContext(AppContext);
  const { user } = useContext(AuthContext);
  const { segment } = useSpeechContext();
  return (
    <Card
      sx={{
        backgroundColor: "#FEFEFE",
        width: { xs: "380px", sm: "400px", lg: "330px" },
        height: "563px",
        borderRadius: "30px",
        boxShadow: "12px 12px 21px rgba(221, 165, 219, 0.25)",
        p: "10px",
      }}
    >
      <CardContent>
        <Typography
          sx={{
            textTransform: "capitalize",
            fontSize: "20px",
            fontWeight: "600",
            mt: "0.5rem",
          }}
        >
          <span>👋</span> {`Hello ${user.displayName}`},
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
          }}
        >
          <Box
            sx={{
              m: "0px 20px 25px 0px",
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography
              sx={{
                fontSize: "17px",
                fontWeight: "500",
                mr: "10px",
              }}
            >
              your net worth is
            </Typography>
            <Typography
              sx={{
                textTransform: "capitalize",
                fontSize: "20px",
                fontWeight: "600",
              }}
            >
              {`Rs.${calculateAmount}`}
            </Typography>
          </Box>
          <Divider sx={{ backgroundColor: "#F009BD" }} light />
          <Typography
            textAlign="center"
            sx={{
              fontSize: "13px",
              mb: "5%",
              mt: "5%",
              color: "#444444",
              fontWeight: "500",
            }}
          >
            Try Saying: <br></br> Add Expense for 500 rupees in the Bills
            <br></br> category for last Monday
          </Typography>
          <Divider sx={{ backgroundColor: "#F009BD" }} light />
          <Typography
            textAlign="center"
            sx={{
              fontSize: "14px",
              mb: "5%",
              mt: "5%",
            }}
          >
            {segment ? (
              <>{segment.words.map((word) => word.value).join(" ")}</>
            ) : null}
          </Typography>
          <Box mb="15px">
            <Form />
          </Box>
          <PushToTalkButtonContainer>
            <PushToTalkButton size="50px" placement="bottom" />
          </PushToTalkButtonContainer>
        </Box>
      </CardContent>
    </Card>
  );
};

export default MainCard;
