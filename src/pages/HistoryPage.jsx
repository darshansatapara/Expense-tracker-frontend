import React, { useState, useEffect, useCallback, useMemo } from "react";
import dayjs from "dayjs";
import { HistoryEntry } from "../components/HistoryPageComponent/HistoryEntry";
import DateRangeSelector from "../components/InputComponents/DateRangeSelector";
import { TabButton } from "../components/commonComponent/TabButton";
import userExpenseStore from "../store/UserStore/userExpenseStore";
import userIncomeStore from "../store/UserStore/userIncomeStore";
import { userStore } from "../store/UserStore/userAuthStore";

const HistoryPage = () => {
  const { currentUser } = userStore();
  const { fetchUserExpenses, userExpenses } = userExpenseStore();
  const { fetchUserIncomes, userIncomes } = userIncomeStore();
  const [expandedIndexes, setExpandedIndexes] = useState([]);
  const [dateRange, setDateRange] = useState([
    dayjs().startOf("month"),
    dayjs().endOf("month"),
  ]);
  const [activeTab, setActiveTab] = useState("Expense");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const userId = currentUser?._id;
  const profession = currentUser?.profession;

  const fetchTransactions = useCallback(async () => {
    if (!userId) return;
    setLoading(true);
    setError(null);
    try {
      if (activeTab === "Expense") {
        await fetchUserExpenses(userId, dateRange[0], dateRange[1]);
      } else {
        await fetchUserIncomes(userId, dateRange[0], dateRange[1], profession);
      }
    } catch (err) {
      setError("Failed to fetch data. Please try again.");
      console.error("Fetch transactions error:", err);
    } finally {
      setLoading(false);
    }
  }, [
    userId,
    activeTab,
    dateRange,
    fetchUserExpenses,
    fetchUserIncomes,
    profession,
  ]);

  useEffect(() => {
    fetchTransactions();
  }, [fetchTransactions]);

  const transactions = useMemo(() => {
    const source = activeTab === "Expense" ? userExpenses : userIncomes;
    return source.map((entry) => ({
      ...entry,
      offlineTotal: entry.offline.reduce(
        (sum, t) => sum + parseFloat(t.convertedAmount || 0),
        0
      ),
      onlineTotal: entry.online.reduce(
        (sum, t) => sum + parseFloat(t.convertedAmount || 0),
        0
      ),
      transactions: [...entry.offline, ...entry.online],
    }));
  }, [userExpenses, userIncomes, activeTab]);

  const toggleExpand = useCallback((index) => {
    setExpandedIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  }, []);

  return (
    <div className="p-4 md:p-6 lg:p-4 space-y-2 lg:w-full min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-4 md:p-6 max-w-full md:max-w-6xl mx-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0">
          <div className="flex flex-wrap lg:w-auto space-x-6 mb-4 lg:mb-0">
            <TabButton
              label="Expense"
              isActive={activeTab === "Expense"}
              onClick={() => setActiveTab("Expense")}
              className="mb-2 lg:mb-0"
            />
            <TabButton
              label="Income"
              isActive={activeTab === "Income"}
              onClick={() => setActiveTab("Income")}
              className="mb-2 lg:mb-0"
            />
          </div>
          <DateRangeSelector
            startValue={dateRange[0]}
            endValue={dateRange[1]}
            onChange={(dates) => setDateRange(dates)}
            className="items-center lg:w-auto"
          />
        </div>

        {error && <p className="text-red-500">{error}</p>}
        <div className="space-y-4">
          {transactions.length === 0 && !loading && (
            <p>No transactions found for the selected range.</p>
          )}
          {loading
            ? Array.from({ length: 10 }).map((_, index) => (
                <HistoryEntry key={`loading-${index}`} loading={true} />
              ))
            : transactions.map((entry, index) => (
                <HistoryEntry
                  key={`${entry.date}-${index}`}
                  entry={entry}
                  isExpanded={expandedIndexes.includes(index)}
                  toggleExpand={() => toggleExpand(index)}
                  isExpense={activeTab === "Expense"}
                  loading={false}
                  onTransactionUpdate={fetchTransactions}
                />
              ))}
        </div>
      </div>
    </div>
  );
};

export default HistoryPage;
