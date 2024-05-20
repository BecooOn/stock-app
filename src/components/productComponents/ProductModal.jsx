import Button from "@mui/material/Button";
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
import { modalStyle } from "../../styles/globalStyles";

export default function ProductModal({ handleClose, open, info, setInfo }) {
  const { createData } = useStockRequest();
  const { products, brands, categories } = useSelector((state) => state.stock);
  // const uniqueCategoriesID = Array.from(new Set(products.map((product) => product?.categoryId?._id))); //? category id'lerden tekrar edenleri önlemek ve select içinde sadece bir defa görmek için
  // const uniqueBrandsID = Array.from(new Set(products.map((product) => product?.brandId?._id))); //? brand id'lerden tekrar edenleri önlemek ve select içinde sadece bir defa görmek için

  // console.log(categories);

  const handleChange = (e) => {
    setInfo({ ...info, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    createData("products", info);
    //? modal ı kapıtıyoruz
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
                  value={info?.categoryId}
                  label="Category"
                  onChange={handleChange}
                  required
                >
                  {categories?.map((item) => {
                    return (
                      <MenuItem key={item._id} value={item._id}>
                        {item.name}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <FormControl sx={{ my: 2, width: "100%" }}>
                <InputLabel id="brandId">Brand</InputLabel>
                <Select
                  labelId="brandId"
                  name="brandId"
                  value={info?.brandId}
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
                  value={info?.name}
                  onChange={handleChange}
                />
              </FormControl>
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
