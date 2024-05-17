import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardCustomizeIcon from "@mui/icons-material/DashboardCustomize";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import InventoryIcon from "@mui/icons-material/Inventory";
import StoreIcon from "@mui/icons-material/Store";
import StarsIcon from "@mui/icons-material/Stars";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useNavigate } from "react-router-dom";

const MenuListComp = () => {
  const navigate = useNavigate(); //* yönlendirme için

  //* clean code olması için yapıya uygun şekilde json dosyası oluşturduk
  const icons = [
    {
      title: "Dashboard", //* static bilgidir
      iconName: <DashboardCustomizeIcon />, //* mui.com/material-ui/material-icons dan component olarak icon'u çağırıyoruz
      path: ".", //* tıklanıldığında gideceği sayfayı absolute path olarak tanımladık, relative path için /stock yerine nokta yazabiliriz.
    },
    {
      title: "Purchases",
      iconName: <ShoppingCartIcon />,
      path: "purchases", //* AppRouter.jsx de bu yönlendirme tanımlamalrı yapılmalıdır, yoksa nereye gideceğini bilmeyecktir. Ayrıca relative path kullanımında sadece ismini yazmamız yeterli olacaktır "purchases"
    },
    {
      title: "Sales",
      iconName: <AttachMoneyIcon />,
      path: "sales",
    },
    {
      title: "Products",
      iconName: <InventoryIcon />,
      path: "products",
    },
    {
      title: "Firms",
      iconName: <StoreIcon />,
      path: "firms",
    },
    {
      title: "Brands",
      iconName: <StarsIcon />,
      path: "brands",
    },
  ];

  return (
    <div>
      <List>
        {icons.map((item, index) => (
          <ListItem
            key={index}
            disablePadding //* ListItemText, ListItemIcon gibi bileşenlerin etrafındaki padding'i kontrol eder
            onClick={() => navigate(item.path)} //* item a tıklandığında ilgili route'a yönlendirmek için
            sx={{
              color: "white",
              "& .MuiSvgIcon-root": { color: "white" }, //*  svg'lerin rengini taşıyıcıdan değiştiremediğimiz için svg'lerin ortak class'na color verdik. Bulunduğumuz yer için ampersand(&) kullanıyoruz ve içi içe yapıyı bu şekilde oluşturuyoruz
              "&:hover": {
                color: "red", //* Hover durumunda list item'ın rengi kırmızı
                "& .MuiSvgIcon-root": { color: "red" }, //* Hover durumunda SVG icon'un rengi kırmızı
              },
            }}
          >
            <ListItemButton>
              <ListItemIcon>{item.iconName}</ListItemIcon>
              <ListItemText primary={item.title} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default MenuListComp;
