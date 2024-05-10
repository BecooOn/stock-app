import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardActions,
  Button,
  Tooltip,
  ButtonBase,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StoreIcon from "@mui/icons-material/Store";
import { useSelector } from "react-redux";
import useStockRequest from "../services/useStockRequest";
import loadingGif from "../assets/loading.gif";
import TextField from "@mui/material/TextField";
import BrandModal from "../components/brandComponents/BrandModal";
import UpdateBrandModal from "../components/brandComponents/UpdateBrandModal";

const Brands = () => {
  const { getDatas, deleteData } = useStockRequest();
  const { brands: allBrands, loading } = useSelector((state) => state.getDatas);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [focused, setFocused] = useState(false);

  useEffect(() => {
    //? Brand sayfası açıldığında componentDidMount ta brandları çağırıyoruz. endpoint belirterek custom hook a gönderiyoruz
    getDatas("brands"); //? brandları getiren fonksiyon, bu fonksiyon birden çok yerde kullanılacağı için ve state güncellemeleri heryerden olacağı için custom hook içinde bu fonksiyonu oluşturuyoruz.
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); //* Arama terimini güncellemek için
  };

  //* Filtrelenmiş brand'ları almak için
  const filteredBrands = allBrands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateModal = (value, id) => {
    setOpenUpdateModal(value); //? value varsa true olur
    setUpdateId(id);
  };

  const handleFocus = () => {
    setFocused(true);
  };

  const handleBlur = () => {
    setFocused(false);
  };

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
        <h1 style={{ textAlign: "center" }}>Brands</h1>
        <Box>
          <Tooltip
            title={`Number of Firms: ${allBrands ? allBrands.length : 0}`}
            arrow
          >
            <Box>
              <StoreIcon />
              <sup
                style={{
                  color: "orange",
                  fontWeight: "bold",
                  fontSize: "20px",
                }}
              >
                {`${allBrands ? allBrands.length : 0}`}
              </sup>
            </Box>
          </Tooltip>
        </Box>
      </Box>
      <Box sx={{ textAlign: "center", margin: "20px" }}>
        <TextField
          label="Search Brand"
          variant="standard"
          type="search"
          onChange={handleSearch}
          placeholder={focused ? "Search Brand..." : ""}
          InputLabelProps={{
            sx: {
              transform: focused
                ? "translate(0%, -50%)"
                : "translate(50%, 50%)",
              color: focused ? "#000" : "rgba(0, 0, 0, 0.54)",
            },
          }}
          onFocus={handleFocus}
          onBlur={handleBlur}
          sx={{ borderBottom: "3px solid black" }}
        />
      </Box>
      {loading ? (
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "60vh",
          }}
        >
          <img src={loadingGif} alt="gif" width={250} />
        </Box>
      ) : (
        <>
          <BrandModal />

          <Box
            xs={{ d: "flex" }}
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            flexWrap="wrap"
          >
            {filteredBrands.length === 0 ? (
              <Typography
                variant="body1"
                color="red"
                textTransform="uppercase"
                textAlign="center"
              >
                No Brands Found
              </Typography>
            ) : (
              filteredBrands?.map((item) => (
                <Card
                  key={item._id}
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-around",
                    alignItems: "center",
                    width: 345,
                    m: 3,
                    py: 3,
                    px: 1,
                    height: 500,
                    boxShadow: "0 0 4px black",
                    textAlign: "center",
                  }}
                >
                  <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    color="orange"
                    textTransform="uppercase"
                  >
                    {item?.name}
                  </Typography>
                  <CardMedia
                    component="img"
                    height="250"
                    image={item?.image}
                    alt="img"
                    sx={{ objectFit: "contain" }}
                  />
                  <CardActions>
                    <Tooltip title={"Delete"} arrow>
                      <Button
                        onClick={() => deleteData("brands", item._id)}
                        sx={{ "&:hover": { color: "red" } }}
                      >
                        <DeleteForeverIcon sx={{ fontSize: "40px" }} />
                      </Button>
                    </Tooltip>
                    <Tooltip title={"Update"} arrow>
                      <ButtonBase
                        sx={{ "&:hover": { color: "red" } }}
                        onClick={() => handleUpdateModal("brands", item._id)}
                      >
                        <EditNoteIcon sx={{ fontSize: "40px" }} />
                      </ButtonBase>
                    </Tooltip>
                  </CardActions>
                </Card>
              ))
            )}
          </Box>
        </>
      )}
      <UpdateBrandModal
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        updateId={updateId}
      />
    </Box>
  );
};

export default Brands;
