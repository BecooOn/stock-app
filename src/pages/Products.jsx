import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ProductModal from "../components/productComponents/ProductModal";
import ProductTable from "../components//productComponents/ProductTable";
import { Box, Tooltip } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import TableSkeleton, { ErrorMessage, NoDataMessage } from "../components/DataFetchMessages";
import { newBtn, pageHeaders } from "../styles/globalStyles";

const Products = () => {
  const { getDatas } = useStockRequest();
  const { products, error, loading } = useSelector((state) => state.stock);
  //? veri çekme esnasında hata varsa error mesajını DataFetchMessages comp da oluşturduğumuz component'ler ile yapmak için global alandan aldığımız error'u kullanacağız
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [info, setInfo] = useState({
    categoryId: "",
    brandId: "",
    name: "",
  });

  const handleClose = () => {
    setOpen(false);
    setInfo({
      categoryId: "",
      brandId: "",
      name: "",
    });
  };

  useEffect(() => {
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
          p: 2,
        }}
      >
        <div style={{ width: "120px" }}></div>
        <h1 style={pageHeaders}>Products</h1>
        <Box>
          <Tooltip
            title={`Number of Products: ${products ? products.length : 0}`}
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
                {`${products ? products.length : 0}`}
              </sup>
            </Box>
          </Tooltip>
        </Box>
      </Box>

      <Button
        variant="contained"
        onClick={handleOpen}
        sx={newBtn}
        disabled={error}
      >
        New Product
      </Button>
      {loading && <TableSkeleton />}
      {error && <ErrorMessage />}
      {!error && !loading && products.length > 0 && <ProductTable />}
      {!error && !loading && !products.length && <NoDataMessage />}

      <ProductModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />
    </Box>
  );
};

export default Products;
