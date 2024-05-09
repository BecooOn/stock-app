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
import FirmModal from "../components/FirmModal";
import { ToastContainer } from "react-toastify";
import UpdateFirmModal from "../components/UpdateFirmModal";

const Firms = () => {
  const { getDatas, deleteData } = useStockRequest();
  const { firms, loading } = useSelector((state) => state.getDatas);
  const [openUpdateModal, setOpenUpdateModal] = useState(false);
  const [updateId, setUpdateId] = useState("");

  // console.log(firms);

  useEffect(() => {
    //? Firma sayfası açıldığında componentDidMount ta firmaları çağırıyoruz. endpoint belirterek custom hook a gönderiyoruz
    getDatas("firms"); //? firmaları getiren fonksiyon, bu fonksiyon birden çok yerde kullanılacağı için ve state güncellemeleri heryerden olacağı için custom hook içinde bu fonksiyonu oluşturuyoruz.
  }, []);

  const handleUpdateModal = (value, id) => {
    setOpenUpdateModal(value);
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
        <Tooltip title={`Number of Firms: ${firms ? firms.length : 0}`} arrow>
          {/* //* Tooltip'e yalnızca bir öğe veya bileşen verilebilir. Aşağıdaki kod bloğu içerisindeki tek öğe Box'tır; çünkü box kapsayıcı olarak kullanılmıştır. Tooltip, kullanıcı bir bileşenin üzerine geldiğinde ek bilgi sağlamak için kullanılan bir araçtır.  */}
          <Box>
            <StoreIcon />
            <sup
              style={{ color: "orange", fontWeight: "bold", fontSize: "20px" }}
            >
              {`${firms ? firms.length : 0}`}
            </sup>
          </Box>
        </Tooltip>
      </Box>

      <ToastContainer />
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
            {firms?.map((item) => (
              <Card
                key={item._id}
                sx={{
                  width: 345,
                  m: 3,
                  py: 3,
                  px: 1,
                  height: 580,
                  boxShadow: "0 0 4px black",
                  textAlign: "center",
                  position: "relative",
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
                <CardActions
                  sx={{
                    justifyContent: "center",
                    position: "absolute",
                    gap: 2,
                    bottom: 0,
                    right: 0,
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <Tooltip title={"Delete"} arrow>
                    <Button
                      // size="small"
                      onClick={() => deleteData("firms", item._id)}
                      sx={{ "&:hover": { color: "red" } }}
                    >
                      <DeleteForeverIcon sx={{ fontSize: "40px" }} />
                    </Button>
                  </Tooltip>
                  <Tooltip title={"Update"} arrow>
                    <Button
                      // size="small"
                      href={item?.url}
                      target="_blank"
                      sx={{ "&:hover": { color: "red" } }}
                      onClick={() => handleUpdateModal("firms", item._id)}
                    >
                      <EditNoteIcon sx={{ fontSize: "40px" }} />
                    </Button>
                  </Tooltip>
                </CardActions>
              </Card>
            ))}
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
