import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useEffect } from "react";
import useStockRequest from "../services/useStockRequest";
import loadingGif from "../assets/loading.gif";
import { CardMedia } from "@mui/material";
import { useSelector } from "react-redux";

const Firms = () => {
  const { getFirms, firmDelete } = useStockRequest();
  const { firms, loading, error } = useSelector((state) => state.firms);
  console.log(firms);

  useEffect(() => {
    //? Firma sayfası açıldığında componentDidMount ta firmaları çağırıyoruz
    getFirms(); //? firmaları getiren fonksiyon, bu fonksiyon birden çok yerde kullanılacağı için ve state güncellemeleri heryerden olacağı için custom hook içinde bu fonksiyonu oluşturuyoruz.
  }, []);

  return (
    <Box>
      <h1>Firmalar</h1>

      {loading && <img src={loadingGif} alt="gif" width={250} />}

      {error && (
        <Typography variant="h4" color="error" component="div">
          Oops Somehing went wrong
        </Typography>
      )}
      <Button size="small" target="_blank" sx={{ border: "2px solid black" }}>
        NEW FIRM
      </Button>
      <Box
        xs={{ d: "flex" }}
        display="flex"
        alignItems="center"
        justifyContent="space-evenly"
        flexWrap="wrap"
      >
        {firms?.map((item) => (
          <Card key={item._id} sx={{ maxWidth: 345, m: 5, maxHeight: 600 }}>
            <Typography gutterBottom variant="h5" component="div">
              {item?.name}
            </Typography>
            <CardMedia
              component="img"
              height="250"
              image={item?.image}
              alt="img"
              sx={{ objectFit: "contain" }}
            />
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item?.address}
              </Typography>
            </CardContent>
            <CardContent>
              <Typography variant="body2" color="text.secondary">
                {item?.phone}
              </Typography>
            </CardContent>
            <CardActions>
              <Button size="small" onClick={() => firmDelete(item._id)}>
                🗑Delete
              </Button>

              <Button size="small" href={item?.url} target="_blank">
                🖊Edit
              </Button>
            </CardActions>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Firms;
