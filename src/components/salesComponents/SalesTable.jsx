import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";
import { btnStyle } from "../../styles/globalStyles";

export default function SalesTable({ handleOpen, setInfo }) {
  const { deleteData } = useStockRequest();
  const { sales } = useSelector((state) => state.stock);
  console.log(sales);
  const getRowId = (row) => row._id;
  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      sortable: true,
      minWidth: 150,
      flex: 1.2,
      valueGetter: (value, row) => {
        return new Date(row?.createdAt).toLocaleString("tr-TR");
      },
    },
    {
      field: "brandId",
      headerName: "Brand",
      sortable: true,
      headerAlign: "center",
      align: "center",
      width: 160,
      flex: 1,
      editable: true,
      valueGetter: (value, row) => row?.brandId?.name,
    },
    {
      field: "productId",
      headerName: "Product",
      headerAlign: "center",
      sortable: true,
      align: "center",
      flex: 1,
      miWidth: 160,
      editable: true,
      valueGetter: (value, row) => row?.productId?.name,
    },
    {
      field: "quantity",
      headerName: "Quantity",
      sortable: true,
      headerAlign: "center",
      align: "center",
      width: 120,
      flex: 1.2,
    },
    {
      field: "price",
      headerName: "Price",
      sortable: true,
      headerAlign: "center",
      align: "center",
      width: 120,
      flex: 1.2,
    },
    {
      field: "amount",
      headerName: "Amount",
      sortable: true,
      headerAlign: "center",
      align: "center",
      width: 120,
      flex: 1.2,
    },
    {
      field: "actions",
      headerName: "Operations",
      minWidth: 40,
      headerAlign: "center",
      align: "center",
      renderCell: ({ row: { brandId, productId, quantity, price, _id } }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditNoteIcon />}
            label="Edit"
            onClick={() => {
              handleOpen();
              setInfo({ _id, brandId, productId, quantity, price });
            }}
            sx={btnStyle}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteForeverIcon />}
            label="Delete"
            onClick={() => deleteData("sales", _id)}
            sx={btnStyle}
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        rows={sales}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5, 10, 20, 50]}
        // checkboxSelection
        disableRowSelectionOnClick
        getRowId={getRowId}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
