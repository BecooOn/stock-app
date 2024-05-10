import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { object, string, number } from "yup";
import { Form } from "formik";

export const firmSchema = object({
  name: string().required("Firma adı zorunludur"),
  phone: number().required("Firma telefonu zorunludur").positive().integer(),
  address: string().required("Firma adresi zorunludur"),
  image: string().required("Firma fotoğrafı zorunludur"),
});

const UpdateFirmModalForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
    // console.log(values);
  return (
    <Form>
      <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Firm Name"
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
          label="Firm Phone"
          name="phone"
          id="phone"
          type="tel"
          variant="standard"
          value={values.phone}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.phone && Boolean(errors.phone)}
          helperText={touched.phone && errors.phone}
        />
        <TextField
          label="Firm Address"
          name="address"
          id="address"
          type="text"
          variant="standard"
          value={values.address}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.address && Boolean(errors.address)}
          helperText={touched.address && errors.address}
        />
        <TextField
          label="Firm Image"
          name="image"
          id="image"
          type="text"
          variant="standard"
          value={values.image}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.image && Boolean(errors.image)}
          helperText={touched.image && errors.image}
        />
        <Button
          type="submit"
          variant="contained"
          size="large"
        >
          Update Firm
        </Button>
      </Box>
    </Form>
  );
};

export default UpdateFirmModalForm;