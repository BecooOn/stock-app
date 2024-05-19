import React, { useEffect } from "react";
import KPICards from "../components/homeComponents/KPICards";
import Charts from "../components/homeComponents/Charts";
import useStockRequest from "../services/useStockRequest";

const Home = () => {
  const { getDatas } = useStockRequest();
  useEffect(() => {
    getDatas("purchases");
    getDatas("sales");
  }, []);

  return (
    <div>
      <KPICards />
      <Charts />
    </div>
  );
};

export default Home;
