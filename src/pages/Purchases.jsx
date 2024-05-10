import * as React from "react";
import { DataGrid, GridDeleteForeverIcon } from "@mui/x-data-grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useDemoData } from "@mui/x-data-grid-generator";

const Purchases = () => {
  const { data } = useDemoData({
    dataSet: "Commodity",
    rowLength: 100,
    maxColumns: 8,
  });
  const columns = [
    { field: "date", headerName: "Date", width: 150 },
    { field: "firm", headerName: "Firm", width: 350 },
    { field: "brand", headerName: "Brand", width: 350 },
    { field: "product", headerName: "Product", width: 350 },
    { field: "quantity", headerName: "Quantity", width: 100 },
    { field: "price", headerName: "Price", width: 100 },
    { field: "amount", headerName: "Amount", width: 100 },
    {
      field: "actions",
      headerName: "Actions",
      width: 100,
      renderCell: (params) => (
        <div>
          <button>
            <DeleteForeverIcon />
          </button>
          <button>
            <EditNoteIcon />
          </button>
        </div>
      ),
    },
  ];
  return (
    <div style={{ width: "100%" }}>
      <DataGrid
        {...data}
        initialState={{
          ...data.initialState,
          pagination: { paginationModel: { pageSize: 25 } },
        }}
        pageSizeOptions={[5, 10, 25]}
      />
    </div>
  );
};

export default Purchases;
