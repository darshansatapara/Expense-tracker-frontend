

// components/homeComponent/TotalDataCard.jsx
import React, { useEffect, useState } from "react";
import { Spin } from "antd";
import { userCategoryStore } from "../../store/UserStore/userCategoryStore";
import { userStore } from "../../store/UserStore/userAuthStore.js";

const TotalDataCard = ({ cardData = {}, label, activeTab }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [defaultCurrencySymbol, setDefaultCurrencySymbol] = useState("");
  const { currentUser } = userStore();
  const userId = currentUser?._id;
  const { fetchCurrencyAndBudget } = userCategoryStore();

  useEffect(() => {
    const fetchDefaultCurrency = async () => {
      if (!userId) return;
      try {
        setLoading(true);
        const defaultCurrency = await fetchCurrencyAndBudget(userId);
        setDefaultCurrencySymbol(
          defaultCurrency?.defaultCurrency?.symbol || ""
        );
      } catch (error) {
        setError("Failed to load currency data");
        console.error("Failed to fetch currency:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDefaultCurrency();
  }, [fetchCurrencyAndBudget, userId]);

  return (
    <div className="bg-gray-100 flex flex-col h-[40vh] justify-center items-center p-4 rounded-md border gap-5">
      <h1 className="text-lg font-bold text-gray-700">
        {label} {activeTab}
      </h1>
      {loading ? (
        <Spin size="large" />
      ) : error ? (
        <div className="text-red-500 font-semibold">{error}</div>
      ) : (
        <div className="flex flex-col md:flex-row justify-center items-center gap-5">
          <div className="flex md:flex-col text-center gap-3">
            <h3 className="text-lg font-bold text-gray-700">Total Online:</h3>
            <p className="text-xl font-semibold text-blue-600">
              {defaultCurrencySymbol}
              {(cardData?.onlineTotal ?? 0).toFixed(2)}
            </p>
          </div>
          <div className="flex md:flex-col text-center gap-3">
            <h3 className="text-lg font-bold text-gray-700">Total Offline:</h3>
            <p className="text-xl font-semibold text-green-600">
              {defaultCurrencySymbol}
              {(cardData?.offlineTotal ?? 0).toFixed(2)}
            </p>
          </div>
          <div className="flex md:flex-col text-center gap-3">
            <h3 className="text-lg font-bold text-gray-700">Total {label}:</h3>
            <p className="text-xl font-semibold text-purple-600">
              {defaultCurrencySymbol}
              {(cardData?.bothTotal ?? 0).toFixed(2)}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default TotalDataCard;
