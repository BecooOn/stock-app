import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import useStockRequest from "../../services/useStockRequest";
import { Formik, Form } from "formik";
import { object, string } from "yup";

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

const BrandModal = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { createData } = useStockRequest();

  const brandSchema = object({
    name: string().required("Brand name is required"),
    image: string().required("Brand image is required"),
  });

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
        NEW BRAND
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
            initialValues={{ name: "", image: "" }}
            validationSchema={brandSchema}
            onSubmit={(values, actions) => {
              createData("brands", values); //? markaları oluşturmak için useStockRequest içindeki createData fonksiyonuna verilerimizi gönderiyoruz
              actions.resetForm();
              actions.setSubmitting(false);
            }}
          >
            {({
              values,
              handleChange,
              handleBlur,
              touched,
              errors,
              isSubmitting,
            }) => (
              <Form>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  <TextField
                    label="Brand Name"
                    name="name"
                    id="name"
                    type="text"
                    variant="standard"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.name && Boolean(errors.name)}
                    helperText={touched.name && errors.name}
                  />

                  <TextField
                    label="Brand Image"
                    name="image"
                    id="image"
                    type="url"
                    variant="standard"
                    value={values.image}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.image && Boolean(errors.image)}
                    helperText={touched.image && errors.image}
                  />
                  <Button type="submit" variant="contained" size="large">
                    Add Brand
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </Modal>
    </div>
  );
};
export default BrandModal;
