import { Avatar, Box, Paper, Stack, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import LocalGroceryStoreIcon from "@mui/icons-material/LocalGroceryStore";
import SellIcon from "@mui/icons-material/Sell";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { teal, indigo, deepOrange, red } from "@mui/material/colors";

const KPICards = () => {
  const { purchases, sales } = useSelector((state) => state.stock);
  const totalSales = sales.reduce((acc, sale) => acc + sale.amount, 0);
  const totalPurchases = purchases.reduce(
    (acc, purchase) => acc + purchase.amount,
    0
  );
  const amount = totalSales - totalPurchases; //? profit durumu sıfırdan büyük ya da küçük olmasına göre işlem yapacağım için profit için amount'u dışarıda tanımladım
  const cards = [
    {
      id: 1,
      title: "Sales",
      icon: <SellIcon />,
      amount: totalSales.toLocaleString("tr-TR"),
      color: indigo[800],
      bgColor: indigo[100],
    },
    {
      id: 2,
      title: "Purchases",
      icon: <LocalGroceryStoreIcon />,
      amount: totalPurchases.toLocaleString("tr-TR"),
      color: deepOrange[800],
      bgColor: deepOrange[100],
    },
    {
      id: 3,
      title: "Profit",
      icon: <AccountBalanceWalletIcon sx={{ fontSize: "40px" }} />,
      amount: amount.toLocaleString("tr-TR"),
      color: amount > 0 ? teal[800] : red[800],
      bgColor: amount > 0 ? teal[100] : red[100],
    },
  ];
  return (
    <Stack
      sx={{
        justifyContent: "center",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 3,
        flexDirection: "row",
        m: 2,
      }}
    >
      {cards.map((card) => (
        <Paper
          key={card.id}
          elevation={3}
          sx={{
            width: "270px",
            height: "100px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            backgroundColor: card.bgColor,
          }}
        >
          <Avatar
            sx={{
              color: card.color,
              width: 60,
              height: 60,
              backgroundColor: "white",
              border: `1px solid ${card.color}`,
            }}
          >
            {card.icon}
          </Avatar>
          <Box sx={{ textAlign: "center" }}>
            <Typography
              sx={{ color: `${card.color}`, textTransform: "uppercase" }}
            >
              {card.title}
            </Typography>
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                alignItems: "center",
                color: `${card.color}`,
              }}
            >
              <AttachMoneyIcon sx={{ fontSize: "28px" }} />
              {card.amount}
            </Typography>
          </Box>
        </Paper>
      ))}
    </Stack>
  );
};

export default KPICards;
