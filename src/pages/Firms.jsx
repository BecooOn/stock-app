import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  Tooltip,
} from "@mui/material";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import StoreIcon from "@mui/icons-material/Store";
import { useSelector } from "react-redux";
import useStockRequest from "../services/useStockRequest";
import loadingGif from "../assets/loading.gif";
import FirmModal from "../components/firmComponents/FirmModal";
import UpdateFirmModal from "../components/firmComponents/UpdateFirmModal";
import TextField from "@mui/material/TextField";

const Firms = () => {
  const { getDatas, deleteData } = useStockRequest();
  const { firms: allFirms, loading } = useSelector((state) => state.getDatas);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  // console.log(firms);

  useEffect(() => {
    //? Firma sayfası açıldığında componentDidMount ta firmaları çağırıyoruz. endpoint belirterek custom hook a gönderiyoruz
    getDatas("firms"); //? firmaları getiren fonksiyon, bu fonksiyon birden çok yerde kullanılacağı için ve state güncellemeleri heryerden olacağı için custom hook içinde bu fonksiyonu oluşturuyoruz.
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value); //* Arama terimini güncellemek için
  };

  //* Filtrelenmiş firmaları almak için
  const filteredFirms = allFirms.filter((firm) =>
    firm.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateModal = (value, id) => {
    setOpenUpdateModal(value); //? value varsa true olur
    setUpdateId(id);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <h1 style={{ textAlign: "center", borderBottom: "2px solid black" }}>
        Firms
      </h1>
      <Box
        sx={{
          position: "absolute",
          top: 8,
          right: 20,
        }}
      >
        <Tooltip
          title={`Number of Firms: ${allFirms ? allFirms.length : 0}`}
          arrow
        >
          {/* //* Tooltip'e yalnızca bir öğe veya bileşen verilebilir. Aşağıdaki kod bloğu içerisindeki tek öğe Box'tır; çünkü box kapsayıcı olarak kullanılmıştır. Tooltip, kullanıcı bir bileşenin üzerine geldiğinde ek bilgi sağlamak için kullanılan bir araçtır.  */}
          <Box>
            <StoreIcon />
            <sup
              style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}
            >
              {`${allFirms ? allFirms.length : 0}`}
            </sup>
          </Box>
        </Tooltip>
      </Box>
      <Box sx={{ textAlign: "center", margin: "20px" }}>
        <TextField
          label="Search Firm"
          variant="standard"
          type="search"
          onChange={handleSearch}
          placeholder="Search Firm..."
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
          <FirmModal />

          <Box
            xs={{ d: "flex" }}
            display="flex"
            alignItems="center"
            justifyContent="space-evenly"
            flexWrap="wrap"
          >
            {filteredFirms.length === 0 ? (
              <Typography
                variant="body1"
                color="red"
                textTransform="uppercase"
                textAlign="center"
              >
                No Firms Found
              </Typography>
            ) : (
              filteredFirms?.map((item) => (
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
                    height: 600,
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
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      <span style={{ fontWeight: "bold" }}>Address:</span>
                      {item?.address}
                    </Typography>
                  </CardContent>
                  <CardContent>
                    <Typography variant="body2" color="text.secondary">
                      {item?.phone}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Tooltip title={"Delete"} arrow>
                      <Button
                        onClick={() => deleteData("firms", item._id)}
                        sx={{ "&:hover": { color: "red" } }}
                      >
                        <DeleteForeverIcon sx={{ fontSize: "40px" }} />
                      </Button>
                    </Tooltip>
                    <Tooltip title={"Update"} arrow>
                      <Button
                        sx={{ "&:hover": { color: "red" } }}
                        onClick={() => handleUpdateModal("firms", item._id)}
                      >
                        <EditNoteIcon sx={{ fontSize: "40px" }} />
                      </Button>
                    </Tooltip>
                  </CardActions>
                </Card>
              ))
            )}
          </Box>
        </>
      )}
      <UpdateFirmModal
        openUpdateModal={openUpdateModal}
        setOpenUpdateModal={setOpenUpdateModal}
        updateId={updateId}
      />
    </Box>
  );
};

export default Firms;
