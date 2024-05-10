import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { object, string } from "yup";
import { IconButton, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";
import { Form, Formik } from "formik";

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

const UpdateBrandModal = ({
  openUpdateModal,
  setOpenUpdateModal,
  updateId,
}) => {
  const handleClose = () => setOpenUpdateModal(false);
  const { brands } = useSelector((state) => state.getDatas);
  const { updateData, getDatas } = useStockRequest();

  const brandSchema = object({
    name: string().required("Brand name is required"),
    image: string().required("Brand image is required"),
  });

  //!--brands ilk render'da json formatında create işleminde object olarak kullandığımız için,brands'in yaptığımız işlemlerin sonunda farklı type'larda olmasından kaynaklanan hatayı gidermek için dizi olup olmadığını Array.isArray() kullnarak çözüyoruz. Dizi olduğunda update yapıyoruz, object olduğunda tüm sayfayı yeniden getiriyoruz-------------
  const selectedBrand = Array.isArray(brands)
    ? brands.find((item) => item?._id === updateId)
    : getDatas();

  //* find ile güncelleme yapmak istediğimiz markanın bilgilerini bulduk ve selectedBrand değişkenine atadık
  if (!selectedBrand) return null;
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
              _id: selectedBrand._id,
              name: selectedBrand.name,
              image: selectedBrand.image,
            }}
            validationSchema={brandSchema}
            onSubmit={(values, actions) => {
              updateData("brands", values, selectedBrand._id); //? Değerler useStockRequest'e gönderiliyor
              handleClose();
              actions.resetForm();
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
                    Update Brand
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
export default UpdateBrandModal;
