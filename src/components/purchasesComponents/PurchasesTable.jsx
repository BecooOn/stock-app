import * as React from "react";
import Box from "@mui/material/Box";
import { DataGrid, GridActionsCellItem, GridToolbar } from "@mui/x-data-grid";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { useSelector } from "react-redux";
import useStockRequest from "../../services/useStockRequest";
import { btnStyle } from "../../styles/globalStyles";

export default function PurchasesTable({ handleOpen, setInfo }) {
  const { deleteData } = useStockRequest();
  const { purchases } = useSelector((state) => state.stock);

  const getRowId = (row) => row._id; //? Data grid de satırlar unique id'lere sahip olması gerekiyor.Bu nedenle bu fonksiyonu yazıyoruz ve DataGrid comp. içerisinde kullanıyoruz. Esasında API den farklı id gelmesine rağmen APı den gelen _id isimli olduğu için DataGrid bu farklılığı algılamıyor
  const columns = [
    {
      field: "createdAt",
      headerName: "Date",
      sortable: true,
      minWidth: 150,
      flex: 1.2,
      valueGetter: (value,row) => {
        return new Date(row?.createdAt).toLocaleString("tr-TR");
      },
    },
    {
      field: "firmId", //* API'den gelen veri ile aynı isim kullanılmalıdır
      headerName: "Firm", //* Kullanıcıya gösterilecek isimi headerName e yazıyoruz. Api'den gelen isimden farklı kullanılabilir
      sortable: true,
      flex: 1, //* Sütunun ne oranda büyüyüp küçüleceği
      minWidth: 160,
      valueGetter: (value, row) => row?.firmId?.name, //? row içerisindeki firmId içindeki firmanın name'i
      // valueGetter: (value) => value?.name, //? bir önceki valueGetter ile aynı işlemi yapar
      // renderCell: ({ row }) => {
      //   return new Date(row.createdAt).toLocaleString("tr-TR")
      // }, //? valueGetter ile aynı işlemi yapar
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
      valueGetter: (value, row) => row?.brandId?.name, //* row içerisindeki brandId içindeki markanın name'i
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
      valueGetter: (value, row) => row?.productId?.name, //* row içerisindeki productId içindeki ürünün name'i
    },
    {
      field: "quantity",
      headerName: "Quantity",
      sortable: true,
      headerAlign: "center",
      align: "center",
      width: 120,
      flex: 1.2,
      //   valueGetter: (value, row) => row.quantity, //* stokta bulunan miktar
    },
    {
      field: "price",
      headerName: "Price",
      sortable: true,
      headerAlign: "center",
      align: "center",
      width: 120,
      flex: 1.2,
      //   valueGetter: (value, row) => row.price, //* fiyat bilgisi
    },
    {
      field: "amount",
      headerName: "Amount",
      sortable: true,
      headerAlign: "center",
      align: "center",
      width: 120,
      flex: 1.2,
      //   valueGetter: (value, row) => row.amount, //* toplam miktar
    },
    {
      field: "actions",
      headerName: "Operations",
      minWidth: 40,
      headerAlign: "center",
      align: "center",
      renderCell: ({
        row: { brandId, productId, quantity, price, firmId, _id },
      }) => {
        return [
          <GridActionsCellItem
            key={"edit"}
            icon={<EditNoteIcon />}
            label="Edit"
            onClick={() => {
              handleOpen();
              setInfo({ _id, brandId, productId, quantity, price, firmId });
            }}
            sx={btnStyle}
          />,
          <GridActionsCellItem
            key={"delete"}
            icon={<DeleteForeverIcon />}
            label="Delete"
            onClick={() => deleteData("purchases", _id)}
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
        rows={purchases} //? API den gelen satın alma bilgilerini satırlara aktarıyoruz
        columns={columns} //? sütun bilgilerini yukarıda tanımladık
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
