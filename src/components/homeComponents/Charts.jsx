import { AreaChart } from "@tremor/react";
import { useSelector } from "react-redux";

// const dataFormatter = (number) =>
//   `$${Intl.NumberFormat("us").format(number).toString()}`;

const Charts = () => {
  const { sales, purchases } = useSelector((state) => state.stock);
  const salesData = sales.map((sale) => ({
    date: new Date(sale.createdAt).toLocaleDateString(),
    amount: sale.amount,
  }));
  const purchasesData = purchases.map((purchase) => ({
    date: new Date(purchase.createdAt).toLocaleDateString(),
    amount: purchase.amount,
  }));
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 my-14">
      <div className="border border-2 p-4">
        <p>Sales</p>
        <AreaChart
          className="h-80"
          data={salesData}
          index="date" //* x ekseninde
          categories={["amount"]} //* y ekseninde
          colors={["indigo"]}
          yAxisWidth={60}
        />
      </div>
      <div className="border border-2 p-4">
        <p>Purchases</p>
        <AreaChart
          className="h-80"
          data={purchasesData}
          index="date"
          categories={["amount"]}
          colors={["rose"]}
          yAxisWidth={60}
        />
      </div>
    </div>
  );
};
export default Charts;
