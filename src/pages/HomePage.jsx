// pages/HomePage.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import { CirclePlus, Loader2 } from "lucide-react";
import { TabButton } from "../components/commonComponent/TabButton";
import dayjs from "dayjs";
import useUserExpenseStore from "../store/UserStore/userExpenseStore";
import useUserIncomeStore from "../store/UserStore/userIncomeStore";
import IncomeAndExpenseHome from "../components/homeComponent/IncomeAndExpenseHome";
import AddIncomeExpenseModel from "../components/commonComponent/AddIncomeExpenseModel";
import { userStore } from "../store/UserStore/userAuthStore";
import { filterDataByDateRange } from "../components/commonComponent/formatEAndIData";

function HomePage() {
  const { userExpenses, fetchUserExpenses } = useUserExpenseStore();
  const { fetchUserIncomes, userIncomes } = useUserIncomeStore();
  const { currentUser } = userStore();

  const userId = currentUser?._id;
  const profession = currentUser?.profession;
  const [option, setOption] = useState("");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("Expense");
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const dropdownRef = useRef(null);

  const getCurrentMonthDates = () => {
    const startDate = dayjs().startOf("month").format("DD-MM-YYYY");
    const endDate = dayjs().endOf("month").format("DD-MM-YYYY");
    return { startDate, endDate };
  };
  const { startDate, endDate } = getCurrentMonthDates();

  useEffect(() => {
    const fetchData = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }
      try {
        setLoading(true);
        setError(null);
        await Promise.all([
          fetchUserExpenses(userId, startDate, endDate),
          profession
            ? fetchUserIncomes(userId, startDate, endDate, profession)
            : Promise.resolve(),
        ]);
      } catch (err) {
        setError("Failed to load data. Please try again.");
        console.error("Fetch error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [
    userId,
    startDate,
    endDate,
    profession,
    fetchUserExpenses,
    fetchUserIncomes,
  ]);

  const filteredExpense = useMemo(
    () => (userExpenses ? filterDataByDateRange(userExpenses) : null),
    [userExpenses]
  );
  const filteredIncome = useMemo(
    () => (userIncomes ? filterDataByDateRange(userIncomes) : null),
    [userIncomes]
  );

  const toggleDropdown = () => setIsOpen((prev) => !prev);
  const handleOptionClick = (option) => {
    setOption(option);
    setIsModalVisible(true);
    setIsOpen(false);
  };
  const handleCloseModal = () => setIsModalVisible(false);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Loader2 className="w-8 h-8 animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-[80vh] text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center p-4 shadow-lg">
      <div className="w-full border-gray-200 dark:border-gray-700">
        <div className="flex items-center justify-between">
          <div className="flex md:text-lg font-semibold text-center text-gray-500 dark:text-gray-400 mb-4">
            <div className="me-2">
              <TabButton
                label="Expense"
                isActive={activeTab === "Expense"}
                onClick={() => setActiveTab("Expense")}
              />
            </div>
            <div className="me-2">
              <TabButton
                label="Income"
                isActive={activeTab === "Income"}
                onClick={() => setActiveTab("Income")}
              />
            </div>
          </div>
          <div className="relative" ref={dropdownRef}>
            <button
              className="flex items-center space-x-2 bg-gradient-to-r from-blue-400 via-indigo-500 to-purple-600 text-white px-5 py-2 text-sm font-semibold rounded-lg shadow-md transform hover:scale-105 transition-all duration-300 mb-1"
              onClick={toggleDropdown}
            >
              <CirclePlus className="w-5 h-5" />
              <span>ADD</span>
            </button>
            {isOpen && (
              <div className="absolute mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => handleOptionClick("Expense")}
                >
                  Expense
                </button>
                <button
                  className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-200"
                  onClick={() => handleOptionClick("Income")}
                >
                  Income
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="border border-gray-300 rounded-lg w-full">
        <div className="h-full overflow-auto p-4">
          <IncomeAndExpenseHome
            activeTab={activeTab}
            filteredData={
              activeTab === "Expense" ? filteredExpense : filteredIncome
            }
          />
        </div>
      </div>
      <AddIncomeExpenseModel
        option={option}
        isVisible={isModalVisible}
        onClose={handleCloseModal}
        userId={userId}
        startDate={startDate}
        endDate={endDate}
        profession={profession}
      />
    </div>
  );
}

export default HomePage;
