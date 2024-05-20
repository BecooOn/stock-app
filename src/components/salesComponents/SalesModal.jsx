import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import useStockRequest from "../../services/useStockRequest";
import { useSelector } from "react-redux";
import IconButton from "@mui/material/IconButton";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { modalStyle } from "../../styles/globalStyles";

export default function SalesModal({ handleClose, open, info, setInfo }) {
  const { createData, updateData } = useStockRequest();
  const { sales, products, brands } = useSelector(
    (state) => state.stock
  );
  const navigate = useNavigate();
  // console.log(sales)

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (info?._id) {
      //? put/patch isteği
      // console.log(info);
      const { firmId, brandId, productId, quantity, price, _id } = info;
      let information = {
        brandId: brandId?._id,
        productId: productId?._id,
        quantity,
        price,
        _id,
      };
      // console.log(information);
      updateData("sales", information);
    } else {
      // console.log(info);
      const { brandId, productId, quantity, price } = info;
      let information = { brandId, productId, quantity, price };
      // console.log(information);
      createData("sales", information);
    }

    handleClose();
  };

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
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
          <Box
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
            component={"form"}
            onSubmit={handleSubmit}
          >
            <FormControl sx={{ my: 2, width: "100%" }}>
              <InputLabel id="brandId">Brand</InputLabel>
              <Select
                labelId="brandId"
                name="brandId"
                id="brandId"
                value={info?.brandId?._id || info?.brandId}
                label="Brand"
                onChange={handleChange}
                required
              >
                {brands?.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
                <MenuItem
                  sx={{ borderTop: "1px solid gray" }}
                  onClick={() => navigate("/stock/brands")}
                >
                  <AddIcon />
                  Add New Brand
                </MenuItem>
              </Select>
            </FormControl>

            <FormControl sx={{ my: 2, width: "100%" }}>
              <InputLabel id="productId">Product</InputLabel>
              <Select
                labelId="productId"
                name="productId"
                id="productId"
                value={info?.productId?._id || info?.productId}
                label="Product"
                onChange={handleChange}
                required
              >
                {products?.map((item) => {
                  return (
                    <MenuItem key={item._id} value={item._id}>
                      {item.name}
                    </MenuItem>
                  );
                })}
                <MenuItem
                  sx={{ borderTop: "1px solid gray" }}
                  onClick={() => navigate("/stock/products")}
                >
                  <AddIcon />
                  Add New Product
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Quantity"
              name="quantity"
              id="quantity"
              type="number"
              variant="outlined"
              value={info?.quantity}
              InputProps={{ inputProps: { min: 0 } }}
              onChange={handleChange}
              required
            />
            <TextField
              label="Price"
              name="price"
              id="price"
              type="number"
              variant="outlined"
              value={info?.price}
              InputProps={{ inputProps: { min: 0 } }}
              onChange={handleChange}
              required
            />
            <Button variant="contained" type="submit">
              {info?._id ? "UPDATE SALES" : "ADD NEW SALES"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
