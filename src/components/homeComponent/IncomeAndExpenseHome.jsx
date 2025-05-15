// import { useEffect, useState } from "react";
// import TableList from "./TableList";
// import TotalDataCard from "./TotalDataCard";

// export default function IncomeAndExpenseHome({ activeTab, filteredData }) {
//   // console.log(activeTab);
//   const [weeklyTotal, setweeklyTotal] = useState(0);
//   const [monthlyTotal, setMonthlyTotal] = useState(0);

//   const [todayData, setTodayData] = useState([]);
//   const [yesterdayData, setYesterdayData] = useState([]);

//   useEffect(() => {
//     if (filteredData) {
//       setweeklyTotal(filteredData.currentWeek.totals);
//       setMonthlyTotal(filteredData.currentMonth.totals);
//       setTodayData(filteredData.today);
//       setYesterdayData(filteredData.yesterday);
//     }
//   }, [filteredData]);

//   return (
//     <div className="h-full">
//       {/* Graphs Section */}
//       <div className="flex flex-col md:flex-row gap-5 ">
//         {/* Graph Container 1: Expense */}
//         <div className="w-full h-full lg:w-[49%] border-2 border-indigo-500 rounded-lg p-1">
//           {/* // weekly expense or income card  */}
//           <TotalDataCard
//             cardData={weeklyTotal}
//             lable="Weekly"
//             activeTab={activeTab}
//           />
//         </div>

//         {/* Graph Container 2: Income */}
//         <div className="w-full lg:w-[49%]  border-2 border-indigo-500 rounded-lg p-1">
//           {/* // monthly expense or income card  */}

//           <TotalDataCard
//             cardData={monthlyTotal}
//             lable="Monthly"
//             activeTab={activeTab}
//           />
//         </div>
//       </div>

//       {/* Expense List Section */}
//       <div className="mt-5">
//         <div className="border-2 border-indigo-500 rounded-lg p-3">
//           <TableList
//             today={todayData}
//             yesterday={yesterdayData}
//             activeTab={activeTab === "Expense" ? true : ""}
//           />
//         </div>
//       </div>
//     </div>
//   );
// }

// components/homeComponent/IncomeAndExpenseHome.jsx
import React, { useEffect, useState, useMemo } from "react";
import TableList from "./TableList";
import TotalDataCard from "./TotalDataCard";

export default function IncomeAndExpenseHome({ activeTab, filteredData }) {
  const [weeklyTotal, setWeeklyTotal] = useState(null);
  const [monthlyTotal, setMonthlyTotal] = useState(null);
  const [todayData, setTodayData] = useState(null);
  const [yesterdayData, setYesterdayData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (filteredData) {
      setWeeklyTotal(filteredData.currentWeek?.totals || {});
      setMonthlyTotal(filteredData.currentMonth?.totals || {});
      setTodayData(filteredData.today || { data: [], totals: {} });
      setYesterdayData(filteredData.yesterday || { data: [], totals: {} });
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [filteredData]);

  // Memoize props to prevent unnecessary re-renders
  const tableListProps = useMemo(
    () => ({
      today: todayData || { data: [], totals: {} },
      yesterday: yesterdayData || { data: [], totals: {} },
      activeTab: activeTab === "Expense",
    }),
    [todayData, yesterdayData, activeTab]
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[60vh]">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row gap-5">
        <div className="w-full h-full lg:w-[49%] border-2 border-indigo-500 rounded-lg p-1">
          <TotalDataCard
            cardData={weeklyTotal}
            label="Weekly"
            activeTab={activeTab}
          />
        </div>
        <div className="w-full lg:w-[49%] border-2 border-indigo-500 rounded-lg p-1">
          <TotalDataCard
            cardData={monthlyTotal}
            label="Monthly"
            activeTab={activeTab}
          />
        </div>
      </div>
      <div className="mt-5">
        <div className="border-2 border-indigo-500 rounded-lg p-3">
          <TableList {...tableListProps} />
        </div>
      </div>
    </div>
  );
}
