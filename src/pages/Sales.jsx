import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import { Box, Tooltip } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import SalesTable from "../components/salesComponents/SalesTable";
import SalesModal from "../components/salesComponents/SalesModal";
import TableSkeleton, {
  ErrorMessage,
  NoDataMessage,
} from "../components/DataFetchMessages";

const Sales = () => {
  const { getDatas } = useStockRequest();
  const { sales, loading} = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const handleOpen = (sale) => {
    setInfo(sale); // Satın alma verilerini info state'ine ayarlamak için
    setOpen(true);
  };

  const [info, setInfo] = useState({
    brandId: "",
    productId: "",
    quantity: 0,
    price: 0,
  });
  // console.log(info);
  const handleClose = () => {
    setOpen(false);
    setInfo({
      brandId: "",
      productId: "",
      quantity: 0,
      price: 0,
    });
  };

  useEffect(() => {
    getDatas("sales");
    getDatas("brands");
    getDatas("products");
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
        <h1 style={{ textAlign: "center" }}>Sales</h1>
        <Box>
          <Tooltip
            title={`Number of Sales: ${sales ? sales.length : 0}`}
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
                {`${sales ? sales.length : 0}`}
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
        New Sales
      </Button>
      {loading && <TableSkeleton />}
      {!loading && !sales?.length && <NoDataMessage />}
      {!loading && sales?.length > 0 && (
        <SalesTable handleOpen={handleOpen} setInfo={setInfo} />
      )}
      <SalesModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />
    </Box>
  );
};

export default Sales;
