import { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
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
  const { purchases } = useSelector((state) => state.stock);
  const navigate = useNavigate();
  const uniqueFirmID = Array.from(
    new Set(purchases.map((item) => item.firmId._id))
  ); //? Firm id'lerden tekrar edenleri önlemek ve select içinde sadece bir defa görmek için
  const uniqueBrandsID = Array.from(
    new Set(purchases.map((item) => item.brandId._id))
  ); //? brand id'lerden tekrar edenleri önlemek ve select içinde sadece bir defa görmek için
  const uniqueProductID = Array.from(
    new Set(purchases.map((item) => item.productId._id))
  ); //? brand id'lerden tekrar edenleri önlemek ve select içinde sadece bir defa görmek için

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (info._id) {
      //? put/patch isteginin
      updateData("purchases", info);
    } else {
      //? post işlemi
      createData("purchases", info);
    }

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
                value={info?.firmId}
                label="Firm"
                onChange={handleChange}
                required
              >
                {uniqueFirmID.map((firmId) => {
                  const firm = purchases.find(
                    (purchase) => purchase.firmId._id === firmId
                  );
                  return (
                    <MenuItem key={firm.firmId._id} value={firm.firmId._id}>
                      {firm.firmId.name}
                    </MenuItem>
                  );
                })}
                <MenuItem
                  sx={{ borderTop: "1px solid gray" }}
                  onClick={() => navigate("/stock/firms")}
                >
                  <AddIcon />
                  Add New Firm
                </MenuItem>
              </Select>
            </FormControl>

            <TextField
              label="Brand"
              name="brandId"
              id="brand"
              type="text"
              variant="outlined"
              value={info?.brandId?.name}
              onChange={handleChange}
              required
            />

            <TextField
              label="Product"
              name="productId"
              id="productId"
              type="text"
              variant="outlined"
              value={info?.productId?.name}
              onChange={handleChange}
              required
            />

            <TextField
              label="Quantity"
              name="quantity"
              id="quantity"
              type="number"
              variant="outlined"
              value={info.quantity}
              onChange={handleChange}
              required
            />
            <TextField
              label="Price"
              name="price"
              id="price"
              type="number"
              variant="outlined"
              value={info.price}
              onChange={handleChange}
              required
            />
            <Button variant="contained" type="submit">
              {info._id ? "NEW PURCHASE" : "ADD NEW PURCHASE"}
            </Button>
          </Box>
        </Box>
      </Modal>
    </div>
  );
}
