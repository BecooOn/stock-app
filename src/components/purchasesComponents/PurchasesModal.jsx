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

export default function PurchasesModal({ handleClose, open, info, setInfo }) {
  const { createData, updateData } = useStockRequest();
  const { purchases, firms, products, brands } = useSelector(
    (state) => state.stock
  );
  const navigate = useNavigate();
  // const uniqueFirmID = Array.from(
  //   new Set(purchases.map((item) => item?.firmId?._id))
  // ); //? Firm id'lerden tekrar edenleri önlemek ve select içinde sadece bir defa görmek için
  // const uniqueBrandsID = Array.from(
  //   new Set(purchases.map((item) => item?.brandId?._id))
  // ); //? brand id'lerden tekrar edenleri önlemek ve select içinde sadece bir defa görmek için
  // const uniqueProductID = Array.from(
  //   new Set(purchases.map((item) => item?.productId?._id))
  // ); //? brand id'lerden tekrar edenleri önlemek ve select içinde sadece bir defa görmek için

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
        firmId: firmId?._id,
        brandId: brandId?._id,
        productId: productId?._id,
        quantity,
        price,
        _id,
      };
      // console.log(information);
      updateData("purchases", information);
    } else {
      //? post işlemi
      // console.log(info);
      const { firmId, brandId, productId, quantity, price } = info;
      let information = { firmId, brandId, productId, quantity, price };
      // console.log(information);
      createData("purchases", information);
    }

    //? modal ı kapatmak için
    handleClose();
  };

  // console.log(info);
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
              <InputLabel id="firmId">Firm</InputLabel>
              <Select
                labelId="firmId"
                name="firmId"
                id="firmId"
                value={info?.firmId?._id || info?.firmId}
                label="Firm"
                onChange={handleChange}
                required
              >
                {firms?.map((item) => (
                  <MenuItem key={item._id} value={item._id}>
                    {item.name}
                  </MenuItem>
                ))}
                <MenuItem
                  sx={{ borderTop: "1px solid gray" }}
                  onClick={() => navigate("/stock/firms")}
                >
                  <AddIcon />
                  Add New Firm
                </MenuItem>
              </Select>
            </FormControl>

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
                {/* {uniqueBrandsID.map((brandId) => {
                  const brand = purchases.find(
                    (purchase) => purchase?.brandId?._id === brandId
                  );
                  return (
                    <MenuItem
                      key={brand?.brandId?._id}
                      value={brand?.brandId?._id}
                    >
                      {brand?.brandId?.name}
                    </MenuItem>
                  );
                })} */}
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
                {/* {uniqueProductID.map((productId) => {
                  const product = purchases.find(
                    (purchase) => purchase?.productId?._id === productId
                  );
                  return (
                    <MenuItem
                      key={product?.productId?._id}
                      value={product?.productId?._id}
                    >
                      {product?.productId?.name}
                    </MenuItem>
                  );
                })} */}
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
              {info?._id ? "UPDATE PURCHASE" : "ADD NEW PURCHASE"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
