import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Box, Tooltip } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import PurchasesTable from "../components/purchasesComponents/PurchasesTable";
import PurchasesModal from "../components/purchasesComponents/PurchasesModal";

const Purchases = () => {
  const { getDatas } = useStockRequest();
  const { purchases } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [info, setInfo] = useState({
    firmId: "",
    brandId: "",
    productId: "",
    quantity: 0,
    price: 0,
  });

  const handleClose = () => {
    setOpen(false);
    setInfo({
      firmId: "",
      brandId: "",
      productId: "",
      quantity: 0,
      price: 0,
    });
  };

  useEffect(() => {
    getDatas("purchases");
    //? Güncel veriler için purchases da diğer verilerin de getirilmesi gerekiyor
    getDatas("products");
    getDatas("categories");
    getDatas("brands");
  }, []);

  return (
    <Box sx={{ position: "relative" }}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "4px solid black",
          p: 0,
        }}
      >
        <div style={{ width: "120px" }}></div>
        <h1 style={{ textAlign: "center" }}>Purchases</h1>
        <Box>
          <Tooltip
            title={`Number of Purchases: ${purchases ? purchases.length : 0}`}
            arrow
          >
            <Box>
              <Inventory2Icon />
              <sup
                style={{
                  color: "orange",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {`${purchases ? purchases.length : 0}`}
              </sup>
            </Box>
          </Tooltip>
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={handleOpen}
        sx={{
          position: "absolute",
          top: 35,
          left: 0,
          "&:hover": {
            backgroundColor: "red",
          },
        }}
      >
        New Purchases
      </Button>

      <PurchasesModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />

      <PurchasesTable handleOpen={handleOpen} setInfo={setInfo}/>
    </Box>
  );
};

export default Purchases;
