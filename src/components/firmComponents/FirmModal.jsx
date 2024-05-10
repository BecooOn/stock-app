import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Formik } from "formik";
import FirmModalForm, { firmSchema } from "./FirmModalForm";
import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
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

const FirmModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { createData } = useStockRequest();

  return (
    <div>
      <Button
        onClick={handleOpen}
        variant="contained"
        sx={{
          position: "absolute",
          top: 5,
          left: 0,
          "&:hover": {
            backgroundColor: "red",
          },
        }}
      >
        NEW FIRM
      </Button>
      <Modal
        open={open}
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
              onClick={() => setOpen(false)}
              sx={{ "&:hover": { color: "red" } }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <Formik
            initialValues={{
              name: "",
              phone: "",
              address: "",
              image: "",
            }}
            validationSchema={firmSchema}
            onSubmit={(values, actions) => {
              createData("firms",values); //? firmaları oluşturmak için useStockRequest içindeki createData fonksiyonuna verilerimizi gönderiyoruz
              actions.resetForm();
              actions.setSubmitting(false);
            }}
            component={(props) => <FirmModalForm {...props} />}
          ></Formik>
        </Box>
      </Modal>
    </div>
  );
};
export default FirmModal;
