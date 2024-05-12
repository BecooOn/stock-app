import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { Formik } from "formik";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import UpdateFirmModalForm from "./UpdateFirmModalForm";
import { useSelector } from "react-redux";
import { firmSchema } from "./FirmModalForm";
import useStockRequest from "../../services/useStockRequest";

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

const UpdateFirmModal = ({ openUpdateModal, setOpenUpdateModal, updateId }) => {
  const handleClose = () => setOpenUpdateModal(false);
  const { firms } = useSelector((state) => state.stock);
  const { updateData, getDatas } = useStockRequest();

  //!--firms ilk render'da json formatında create işleminde object olarak kullandığımız için,firms'in yaptığımız işlemlerin sonunda farklı type'larda olmasından kaynaklanan hatayı gidermek için dizi olup olmadığını Array.isArray() kullnarak çözüyoruz. Dizi olduğunda update yapıyoruz, object olduğunda tüm sayfayı yeniden getiriyoruz-------------
  const selectedFirm = Array.isArray(firms)
    ? firms.find((item) => item?._id === updateId)
    : getDatas();

  //* find ile güncelleme yapmak istediğimiz firmanın bilgilerini bulduk ve selectedFirm değişkenine atadık
  //   console.log(selectedFirm._id);
  // console.log(selectedFirm);
  if (!selectedFirm) return null;
  return (
    <div>
      <Modal
        open={openUpdateModal} //*modalın açık ya da kapalı olması durumu
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Box
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
            }}
          >
            <IconButton
              aria-label="close"
              onClick={() => setOpenUpdateModal(false)}
              sx={{ "&:hover": { color: "red" } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Formik
            initialValues={{
              //* Günccelleme yapacağımız için input alanlarının dolu olması için
              _id: selectedFirm._id,
              name: selectedFirm.name,
              phone: selectedFirm.phone,
              address: selectedFirm.address,
              image: selectedFirm.image,
            }}
            validationSchema={firmSchema}
            onSubmit={(values, actions) => {
              updateData("firms", values, selectedFirm._id); //? Değerlere useStockRequest'e gönderiliyor
              actions.resetForm();
              handleClose();
            }}
            component={(props) => <UpdateFirmModalForm {...props} />}
          ></Formik>
        </Box>
      </Modal>
    </div>
  );
};
export default UpdateFirmModal;
