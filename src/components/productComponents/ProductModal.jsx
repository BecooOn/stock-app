import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
// import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import useStockRequest from "../../services/useStockRequest";
import {
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ProductModal({ handleClose, open, info, setInfo }) {
  const { createData } = useStockRequest();
  const { products } = useSelector((state) => state.stock);
  const uniqueCategories = Array.from(new Set(products.map((product) => product.categoryId._id))); //? category id'lerden tekrar edenleri önlemek ve select içinde sadece bir defa görmek için
  const uniqueBrands = Array.from(new Set(products.map((product) => product.brandId._id))); //? brand id'lerden tekrar edenleri önlemek ve select içinde sadece bir defa görmek için

  // console.log(brandNames);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createData("products", info);
    //? modal ı kapıtıyoruz
    handleClose();
  };

  console.log(info);
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box sx={{ minWidth: 120 }}>
            <Box
              sx={{
                position: "absolute",
                top: 0,
                right: 0,
              }}
            >
              <IconButton
                aria-label="close"
                onClick={handleClose}
                sx={{ "&:hover": { color: "red" } }}
              >
                <CloseIcon />
              </IconButton>
            </Box>
            <form onSubmit={handleSubmit}>
              <FormControl sx={{ my: 2, width: "100%" }}>
                <InputLabel id="categoryId">Category</InputLabel>
                <Select
                  labelId="categoryId"
                  name="categoryId"
                  id="categoryId"
                  value={info.categoryId}
                  label="Category"
                  onChange={handleChange}
                  required
                >
                  {uniqueCategories.map((categoryId) => {
                    const category = products.find(
                      (product) => product.categoryId._id === categoryId
                    );
                    return (
                      <MenuItem
                        key={category.categoryId._id}
                        value={category.categoryId._id}
                      >
                        {category.categoryId.name}
                      </MenuItem>
                    );
                  })}
                  <MenuItem value="addCategory">Add Category</MenuItem>
                </Select>
              </FormControl>
              <FormControl sx={{ my: 2, width: "100%" }}>
                <InputLabel id="brandId">Brand</InputLabel>
                <Select
                  labelId="brandId"
                  name="brandId"
                  value={info.brandId}
                  label="Brand"
                  onChange={handleChange}
                  required
                >
                  {uniqueBrands.map((brandId) => {
                    const brand = products.find(
                      (product) => product.brandId._id === brandId
                    );
                    return (
                      <MenuItem
                        key={brand.brandId._id}
                        value={brand.brandId._id}
                      >
                        {brand.brandId.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ my: 2, width: "100%" }}>
                <TextField
                  label="Product Name"
                  name="name"
                  id="name"
                  type="text"
                  variant="outlined"
                  required
                  value={info.name}
                  onChange={handleChange}
                />
              </FormControl>
              {/* <FormControl sx={{ my: 2, width: "100%" }}>
                <TextField
                  label="Quantity"
                  name="quantity"
                  id="quantity"
                  type="number"
                  variant="outlined"
                  required
                  value={info.quantity}
                  onChange={handleChange}
                />
              </FormControl> */}
              <Button
                type="submit"
                variant="contained"
                size="large"
                sx={{ my: 2, width: "100%" }}
              >
                Add Product
              </Button>
            </form>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}