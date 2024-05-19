import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Box, Tooltip } from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import PurchasesTable from "../components/purchasesComponents/PurchasesTable";
import PurchasesModal from "../components/purchasesComponents/PurchasesModal";
import TableSkeleton, {
  ErrorMessage,
  NoDataMessage,
} from "../components/DataFetchMessages";

const Purchases = () => {
  const { getDatas, promiseAllDatas } = useStockRequest();
  const { purchases, loading, error } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const handleOpen = (purchase) => {
    setInfo(purchase); // Satın alma verilerini info state'ine ayarlamak için
    setOpen(true);
  };

  const [info, setInfo] = useState({
    firmId: "",
    brandId: "",
    productId: "",
    quantity: 0,
    price: 0,
  });
  // console.log(info);
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
    // getDatas("purchases");
    //? Güncel veriler için purchases da diğer verilerin de getirilmesi gerekiyor
    // getDatas("firms");
    // getDatas("products");
    // getDatas("brands");
    // getDatas("categories");
    //? Promise.all ile tüm verileri senkronize olarak getiriyoruz
    promiseAllDatas();
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
              <ShoppingCartIcon />
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
      {loading && <TableSkeleton />}
      {!loading && !purchases?.length && <NoDataMessage />}
      {!loading && purchases?.length > 0 && (
        <PurchasesTable handleOpen={handleOpen} setInfo={setInfo} />
      )}
      <PurchasesModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />
    </Box>
  );
};

export default Purchases;
