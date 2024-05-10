import React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { object, string, number } from "yup";
import { Form } from "formik";
// import useStockRequest from "../../services/useStockRequest";
import useStockRequest from "../../services/useStockRequest";

export const firmSchema = object({
  name: string().required("Firm name is required"),
  phone: number().required("Firm phone is required").positive().integer(),
  address: string().required("Firm address is required"),
  image: string().required("Firm image is required"),
});

const FirmModalForm = ({
  values,
  handleChange,
  errors,
  touched,
  handleBlur,
}) => {
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
          type="url"
          variant="standard"
          value={values.image}
          onChange={handleChange}
          onBlur={handleBlur}
          error={touched.image && Boolean(errors.image)}
          helperText={touched.image && errors.image}
        />
        <Button type="submit" variant="contained" size="large">
          Add Firm
        </Button>
      </Box>
    </Form>
  );
};

export default FirmModalForm;
