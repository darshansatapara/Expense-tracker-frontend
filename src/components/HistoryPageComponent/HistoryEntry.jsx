

import React, { useState, useEffect, useCallback } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { TransactionList } from "./TransactionList";
import { userCategoryStore } from "../../store/UserStore/userCategoryStore";
import { userStore } from "../../store/UserStore/userAuthStore";

export const HistoryEntry = React.memo(
  ({
    entry,
    isExpanded,
    toggleExpand,
    isExpense,
    loading,
    onTransactionUpdate,
  }) => {
    const [defaultCurrencySymbol, setDefaultCurrencySymbol] = useState("");
    const { currentUser } = userStore();
    const { fetchCurrencyAndBudget } = userCategoryStore();
    const userId = currentUser?._id;

    const fetchDefaultCurrency = useCallback(async () => {
      if (!userId) return;
      try {
        const response = await fetchCurrencyAndBudget(userId);
        setDefaultCurrencySymbol(response?.defaultCurrency?.symbol || "");
      } catch (err) {
        console.error("Failed to fetch currency:", err);
      }
    }, [userId, fetchCurrencyAndBudget]);

    useEffect(() => {
      if (!loading) fetchDefaultCurrency();
    }, [fetchDefaultCurrency, loading]);

    if (loading) {
      return (
        <div className="mb-4 border rounded-lg overflow-hidden animate-pulse">
          <div className="bg-gray-200 p-4 grid grid-cols-1 sm:grid-cols-4 gap-4">
            <div className="h-4 w-24 bg-gray-300 rounded"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-4 w-32 bg-gray-300 rounded"></div>
            <div className="h-5 w-5 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      );
    }

    return (
      <div className="mb-4 border rounded-lg overflow-hidden">
        <div className="bg-gray-200 p-4 grid grid-cols-1 sm:grid-cols-4 gap-4 items-center">
          <span className="text-gray-600">Date: {entry.date}</span>
          <span className="text-gray-600">
            Offline Total: {defaultCurrencySymbol}
            {entry.offlineTotal.toFixed(2)}
          </span>
          <span className="text-gray-600">
            Online Total: {defaultCurrencySymbol}
            {entry.onlineTotal.toFixed(2)}
          </span>
          <button
            onClick={toggleExpand}
            className="text-gray-600 focus:outline-none justify-self-end"
          >
            {isExpanded ? (
              <ChevronUp className="w-5 h-5" />
            ) : (
              <ChevronDown className="w-5 h-5" />
            )}
          </button>
        </div>
        {isExpanded && (
          <TransactionList
            transactions={entry.transactions}
            isExpense={isExpense}
            onTransactionUpdate={onTransactionUpdate}
          />
        )}
      </div>
    );
  }
);
