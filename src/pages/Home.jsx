import * as React from "react";
import Stack from "@mui/material/Stack";
import Paper from "@mui/material/Paper";
import { styled } from "@mui/material/styles";
import { Avatar, Box, Typography } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Shop2Icon from "@mui/icons-material/Shop2";
import { LineChart } from "@mui/x-charts/LineChart";

const DemoPaper = styled(Paper)(({ theme }) => ({
  width: 250,
  height: 120,
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: "center",
  display: "flex",
  justifyContent: "space-around",
  alignItems: "center",
  boxShadow: "0 0 5px black",
  // color: theme.palette.text.secondary,
}));

const Home = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        // flexWrap: "wrap",
        p: "24px",
      }}
    >
      <Stack direction="row" spacing={2}>
        <DemoPaper>
          <Avatar sx={{ backgroundColor: "green[500]" }}>
            <AttachMoneyIcon />
          </Avatar>
          <Box>
            <Typography variant="span">SALES</Typography>
            <Typography variant="h6">$veri</Typography>
          </Box>
        </DemoPaper>
        <DemoPaper>
          <AddShoppingCartIcon />
          <Box>
            <Typography variant="span">SALES</Typography>
            <Typography variant="h6">$veri</Typography>
          </Box>
        </DemoPaper>
        <DemoPaper>
          <Shop2Icon />
          <Box>
            <Typography variant="span">SALES</Typography>
            <Typography variant="h6">$veri</Typography>
          </Box>
        </DemoPaper>
      </Stack>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-evenly",
          alignItems: "center",
          // width: "100vw",
          // height: "100vh",
        }}
      >
        <Box sx={{ border: "2px solid red", width: "320", height: "520px" }}>
          <LineChart
            sx={{ border: "2px solid red", width: "320", height: "520px" }}
            series={[
              { curve: "linear", data: [0, 5, 2, 6, 3, 9.3] },
              { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
            ]}
          />
        </Box>
        <Box sx={{ border: "2px solid red", width: "320", height: "520px" }}>
          <LineChart
            sx={{ border: "2px solid red", width: "320", height: "520px" }}
            series={[
              { curve: "linear", data: [0, 5, 2, 6, 3, 9.3] },
              { curve: "linear", data: [6, 3, 7, 9.5, 4, 2] },
            ]}
          />
        </Box>
      </Box>
    </Box>
  );
};
export default Home;
