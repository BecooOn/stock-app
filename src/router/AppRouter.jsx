import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "../pages/Login";
import Register from "../pages/Register";
import PrivateRouter from "./PrivateRouter";
import Dashboard from "../pages/Dashboard";
import Home from "../pages/Home";
import Sales from "../pages/Sales";
import Brands from "../pages/Brands";
import Firms from "../pages/Firms";
import Products from "../pages/Products";
import Purchases from "../pages/Purchases";
import UpdateUser from "../pages/UpdateUser";
import NotFound from "../pages/NotFound";
const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="stock" element={<PrivateRouter />}>
          {" "}
          //* nested route, PrivateRouter'dan geçilince dasboard çalışacak
          <Route path="" element={<Dashboard />}>
            <Route index element={<Home />} />{" "}
            {/* //* Login olunca hem dasboard hem de Home görünmesi için index ile belirtiyoruz */}
            <Route path="sales" element={<Sales />} />{" "}
            {/* //* nested route'larda relative path kullanıyoruz. Absolute'ta kullanabiliriz; ancak hepsi absolute olmalıdır. Nested route componentler nerede açılacağını yani yerini bilmelidir. Burada Dashboard altında açılacaktır. Dashboarda Outlet componenti ile bunu sağlarız */}
            <Route path="firms" element={<Firms />} />
            <Route path="brands" element={<Brands />} />
            <Route path="products" element={<Products />} />
            <Route path="purchases" element={<Purchases />} />
            <Route path="user" element={<UpdateUser />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />

      </Routes>
    </Router>
  );
};

export default AppRouter;