import { useEffect, useState } from "react";
import useStockRequest from "../services/useStockRequest";
import { useSelector } from "react-redux";
import Button from "@mui/material/Button";
import ProductModal from "../components/productComponents/ProductModal";
import ProductTable from "../components//productComponents/ProductTable";
import { Box, Tooltip } from "@mui/material";
import Inventory2Icon from "@mui/icons-material/Inventory2";

const Products = () => {
  const { getDatas } = useStockRequest();
  const { products } = useSelector((state) => state.stock);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);

  const [info, setInfo] = useState({
    categoryId: "",
    brandId: "",
    name: ""
  });

  const handleClose = () => {
    setOpen(false);
    setInfo({
      categoryId: "",
      brandId: "",
      name: ""
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
          p: 0,
        }}
      >
        <div style={{ width: "120px" }}></div>
        <h1 style={{ textAlign: "center" }}>Products</h1>
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
        sx={{
          position: "absolute",
          top: 35,
          left: 0,
          "&:hover": {
            backgroundColor: "red",
          },
        }}
      >
        New Product
      </Button>

      <ProductModal
        handleClose={handleClose}
        open={open}
        info={info}
        setInfo={setInfo}
      />

      <ProductTable />
    </Box>
  );
};

export default Products;
