import React, { useContext, useEffect } from "react";
import { Box, Card, CardContent, Stack, Typography } from "@mui/material";
import { AppContext } from "../context/context";
import DeleteIcon from "@mui/icons-material/Delete";
import AmountCard from "./AmountCard";
import { doc, deleteDoc } from "firebase/firestore";

const PastTransactions = () => {
  const { transactionRef, transac, getTransactions } = useContext(AppContext);

  const deleteTransaction = async (id) => {
    const deletedTransac = doc(transactionRef, id);
    deleteDoc(deletedTransac);
    getTransactions();
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <>
      <Card
        sx={{
          backgroundColor: "#FEFEFE",
          width: { xs: "400px", sm: "450px", md: "635px" },
          height: "278px",
          borderRadius: "30px",
          boxShadow: "12px 12px 21px rgba(221, 165, 219, 0.25)",
          p: "10px",
        }}
      >
        <CardContent>
          <Typography
            sx={{
              textTransform: "capitalize",
              fontSize: "14px",
              fontWeight: "600",
            }}
          >
            past transactions
          </Typography>
          <Box
            sx={{
              mt: "10px",
              mb: "10px",
              overflowY: "scroll",
              height: "200px",
              msOverflowY: "scroll",
            }}
          >
            {transac.length > 0 ? (
              <>
                {transac.map((transaction, index) => {
                  return (
                    <Box
                      key={index}
                      sx={{
                        background: "rgba(240, 9, 189, 0.02)",
                        border: "2px solid #F009BD",
                        borderRadius: "10px",
                        p: "8px",
                        mb: "8px",
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Stack
                          justifyContent="flex-start"
                          alignItems="center"
                          spacing={5}
                          direction="row"
                          width="90%"
                        >
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              width: "30%",
                            }}
                          >
                            <Typography
                              sx={{
                                textTransform: "capitalize",
                                fontSize: "14px",
                              }}
                            >
                              {transaction.category}
                            </Typography>
                          </Box>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-start",
                              width: "30%",
                            }}
                          >
                            <Typography sx={{ fontSize: "12px" }}>
                              {transaction.date}
                            </Typography>
                          </Box>
                          <AmountCard
                            type={transaction.type}
                            amount={transaction.amount}
                          />
                        </Stack>
                        <Box onClick={() => deleteTransaction(transaction.id)}>
                          <DeleteIcon fontSize="small" />
                        </Box>
                      </Box>
                    </Box>
                  );
                })}
              </>
            ) : (
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "60%",
                }}
              >
                <Typography
                  sx={{ fontSize: { xs: "14px", md: "20px" } }}
                  fontWeight="600"
                >
                  <span>😡</span> Add a transaction right now, you irresponsible
                  fuck!!
                </Typography>
              </Box>
            )}
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default PastTransactions;
