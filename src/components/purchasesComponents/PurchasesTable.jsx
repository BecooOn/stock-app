// import React from 'react'

// const PurchasesTable = () => {
//   return (
//     <div>PurchasesTable</div>
//   )
// }

// export default PurchasesTable

import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";

export default function PurchasesTable() {
  const { updateData,deleteData } = useStockRequest();
  const { products } = useSelector((state) => state.stock);

  const getRowId = (row) => row._id; //? Data grid de satırlar unique id'lere sahip olması gerekiyor.Bu nedenle bu fonksiyonu yazıyoruz ve DataGrid comp. içerisinde kullanıyoruz. Esasında API den farklı id gelmesine rağmen APı den gelen _id isimli olduğu için DataGrid bu farklılığı algılamıyor
  // const a = products.map((product) => product.categoryId.name);
  // console.log(a);
  const columns = [
    { field: "_id", headerName: "#", minWidth: 150, flex: 1.4 },
    {
      field: "categoryId", //* API'den gelen veri ile aynı isim kullanılmalıdır
      headerName: "Categories", //* Kullanıcıya gösterilecek isimi headerName e yazıyoruz. Api'den gelen isimden farklı kullanılabilir
      flex: 1, //* Sütunun ne oranda büyüyüp küçüleceği
      minWidth: 100,
      valueGetter: (value, row) => row.categoryId?.name, //* row içerisindeki categoryId içindeki kategorinin name'i
    },
    {
      field: "brandId",
      headerName: "Brands",
      headerAlign: "center",
      align: "center",
      width: 150,
      flex: 1.2,
      editable: true,
      valueGetter: (value, row) => row.brandId?.name, //* row içerisindeki brandId içindeki markanın name'i
    },
    {
      field: "name",
      headerName: "Name",
      headerAlign: "center",
      align: "center",
      flex: 1.1,
      miWidth: 110,
      editable: true,
      valueGetter: (value, row) => row.name, //* ürün ismi
    },
    {
      field: "quantity",
      headerName: "Stock",
      sortable: true,
      headerAlign: "center",
      align: "center",
      width: 160,
      valueGetter: (value, row) => row.quantity, //* ürün sayısı
    },
    {
      field: "actions",
      type: "actions",
      headerName: "Operations",
      getActions: (props) => {
        //? satır içi component kullanımı için oluşturulan built-in fonk.
        return [
          <GridActionsCellItem
            icon={<DeleteForeverIcon />}
            onClick={() => deleteData("products", props.id)}
            label="Delete"
          />,
        ];
      },
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <DataGrid
        autoHeight
        rows={products} //? API den gelen ürünleri satırlara aktarıyoruz
        columns={columns} //? sütun bilgilerini yukarıda tanımladık
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 10,
            },
          },
        }}
        pageSizeOptions={[5]}
        checkboxSelection
        disableRowSelectionOnClick
        getRowId={getRowId}
        slots={{ toolbar: GridToolbar }}
      />
    </Box>
  );
}
