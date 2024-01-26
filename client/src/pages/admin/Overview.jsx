import { useState } from "react";

const Overview = () => {
  // State for order and money data
  const [totalOrders, setTotalOrders] = useState(0);
  const [todayOrders, setTodayOrders] = useState(0);
  const [totalMoney, setTotalMoney] = useState(0);
  const [todayMoney, setTodayMoney] = useState(0);

  // CHART

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap justify-center lg:justify-start ">
        <div className="w-96  bg-white rounded-xl shadow-md p-4 ">
          <h2 className="text-lg font-semibold">Today&apos;s Orders</h2>
          <p className="text-2xl font-bold">{todayOrders}</p>
        </div>

        <div className="w-96  bg-white rounded-xl shadow-md p-4 ">
          <h2 className="text-lg font-semibold">Total Orders</h2>
          <p className="text-2xl font-bold">{totalOrders}</p>
        </div>

        <div className="w-96  bg-white rounded-xl shadow-md p-4 ">
          <h2 className="text-lg font-semibold">Today&apos;s Money</h2>
          <p className="text-2xl font-bold">{todayMoney}</p>
        </div>

        <div className="w-96  bg-white rounded-xl shadow-md p-4 ">
          <h2 className="text-lg font-semibold">Sales</h2>
          <p className="text-2xl font-bold">{totalMoney}</p>
        </div>
      </div>

     
    </div>
  );
};

export default Overview;
