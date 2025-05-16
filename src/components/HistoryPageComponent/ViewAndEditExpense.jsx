import React, { useState, useEffect, useCallback, useMemo } from "react";
import { Modal, Input, Select, DatePicker, Radio, Button } from "antd";
import { userCategoryStore } from "../../store/UserStore/userCategoryStore.js";
import { adminCategoryStore } from "../../store/AdminStore/adminCategoryStore.js";
import useUserExpenseStore from "../../store/UserStore/userExpenseStore.js";
import useUserIncomeStore from "../../store/UserStore/userIncomeStore.js";
import dayjs from "dayjs";
import { userStore } from "../../store/UserStore/userAuthStore.js";

const ViewAndEditExpense = React.memo(
  ({ isExpense, isVisible, transaction, onClose, onTransactionUpdate }) => {
    const { fetchUserExpenseCategories, fetchCurrencyAndBudget } =
      userCategoryStore();
    const { currentUser } = userStore();
    const { updateUserExpense } = useUserExpenseStore();
    const { updateUserIncome } = useUserIncomeStore();
    const { fetchIncomeCategoriesIsActive } = adminCategoryStore();

    const userId = currentUser?._id;
    const professionId = currentUser?.profession;

    const [categoryData, setCategoryData] = useState([]);
    const [currencyData, setCurrencyData] = useState([]);
    const [formData, setFormData] = useState({});
    const [loading, setLoading] = useState(false);

    const fetchData = useCallback(async () => {
      if (!userId || !isVisible) return;
      setLoading(true);
      try {
        const [currencyRes, categoryRes] = await Promise.all([
          fetchCurrencyAndBudget(userId),
          isExpense
            ? fetchUserExpenseCategories(userId)
            : fetchIncomeCategoriesIsActive(),
        ]);

        setCurrencyData(currencyRes?.currencyCategory || []);
        setCategoryData(
          isExpense
            ? categoryRes?.data?.expenseCategories || []
            : categoryRes?.categories?.filter(
                (category) => category._id === professionId
              ) || []
        );
      } catch (err) {
        console.error("Failed to fetch data:", err);
      } finally {
        setLoading(false);
      }
    }, [
      userId,
      isVisible,
      isExpense,
      professionId,
      fetchCurrencyAndBudget,
      fetchUserExpenseCategories,
      fetchIncomeCategoriesIsActive,
    ]);

    useEffect(() => {
      if (isVisible) fetchData();
    }, [fetchData, isVisible]);

    const initialFormData = useMemo(() => {
      if (!transaction || !isVisible || loading) return {};
      const matchedCategory = isExpense
        ? categoryData.find(
            (cat) => cat.categoryId?._id === transaction.category?._id
          )
        : categoryData.flatMap((category) =>
            category.subcategories?.find(
              (sub) => sub._id === transaction.category?._id
            )
          );

      const matchedSubcategory = isExpense
        ? matchedCategory?.subcategoryIds?.find(
            (sub) => sub._id === transaction.subcategory?._id
          )
        : null;

      const matchedCurrency = currencyData.find(
        (cur) => cur.currencyId?._id === transaction.currency?._id
      );

      return {
        ...transaction,
        category: isExpense
          ? matchedCategory?.categoryId?._id || ""
          : matchedCategory?._id || "",
        subcategory: matchedSubcategory?._id || "",
        currency: matchedCurrency?.currencyId?._id || "",
        date: transaction.date || "",
        mode: transaction.mode || "Online",
        amount: transaction.amount || "",
        note: transaction.note || "",
      };
    }, [
      transaction,
      categoryData,
      currencyData,
      isExpense,
      isVisible,
      loading,
    ]);

    useEffect(() => {
      setFormData(initialFormData);
    }, [initialFormData]);

    const handleInputChange = useCallback((field, value) => {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
        ...(field === "category" && { subcategory: "" }),
      }));
    }, []);

    const handleSubmit = useCallback(async () => {
      if (!formData._id || loading) return;
      setLoading(true);
      try {
        const payload = {
          ...formData,
          [isExpense ? "expenseId" : "incomeId"]: formData._id,
        };
        if (isExpense) {
          await updateUserExpense(payload, userId, transaction?.date);
        } else {
          await updateUserIncome(payload, userId, transaction?.date);
        }
        if (onTransactionUpdate) onTransactionUpdate(); // Trigger refetch
        onClose();
      } catch (err) {
        console.error("Failed to update transaction:", err);
      } finally {
        setLoading(false);
      }
    }, [
      isExpense,
      formData,
      userId,
      transaction?.date,
      updateUserExpense,
      updateUserIncome,
      onClose,
      onTransactionUpdate,
      loading,
    ]);

    const subcategoryOptions = useMemo(() => {
      const selectedCategory = categoryData.find(
        (cat) => cat.categoryId?._id === formData.category
      );
      return selectedCategory?.subcategoryIds || [];
    }, [categoryData, formData.category]);

    return (
      <Modal
        title={isExpense ? "Edit Expense" : "Edit Income"}
        open={isVisible}
        onCancel={() => {
          setFormData({});
          onClose();
        }}
        footer={null}
        centered
      >
        <div className="p-5">
          {loading ? (
            <div className="animate-pulse space-y-4">
              {Array.from({ length: 6 }).map((_, index) => (
                <div
                  key={`skeleton-${index}`}
                  className="h-10 bg-gray-200 rounded"
                />
              ))}
            </div>
          ) : (
            <>
              <div className="mb-4">
                <label className="block font-medium mb-1">Date</label>
                <DatePicker
                  className="w-full"
                  value={
                    formData.date ? dayjs(formData.date, "DD-MM-YYYY") : null
                  }
                  format="DD-MM-YYYY"
                  onChange={(date) =>
                    handleInputChange(
                      "date",
                      date ? date.format("DD-MM-YYYY") : ""
                    )
                  }
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Mode</label>
                <Radio.Group
                  onChange={(e) => handleInputChange("mode", e.target.value)}
                  value={formData.mode}
                  disabled={loading}
                >
                  <Radio value="Online">Online</Radio>
                  <Radio value="Offline">Offline</Radio>
                </Radio.Group>
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Category</label>
                <Select
                  className="w-full"
                  value={formData.category || undefined}
                  onChange={(value) => handleInputChange("category", value)}
                  placeholder="Select category"
                  disabled={loading}
                >
                  {isExpense
                    ? categoryData.map((category) => (
                        <Select.Option
                          key={category._id}
                          value={category.categoryId._id}
                        >
                          {category.categoryId.name}
                        </Select.Option>
                      ))
                    : categoryData.flatMap((category) =>
                        category?.subcategories?.map((sub) => (
                          <Select.Option key={sub._id} value={sub._id}>
                            {sub.name}
                          </Select.Option>
                        ))
                      )}
                </Select>
              </div>
              {isExpense && (
                <div className="mb-4">
                  <label className="block font-medium mb-1">Subcategory</label>
                  <Select
                    className="w-full"
                    value={formData.subcategory || undefined}
                    onChange={(value) =>
                      handleInputChange("subcategory", value)
                    }
                    disabled={!formData.category || loading}
                    placeholder="Select subcategory"
                  >
                    {subcategoryOptions.map((sub) => (
                      <Select.Option key={sub._id} value={sub._id}>
                        {sub.name}
                      </Select.Option>
                    ))}
                  </Select>
                </div>
              )}
              <div className="mb-4">
                <label className="block font-medium mb-1">Currency</label>
                <Select
                  className="w-full"
                  value={formData.currency || undefined}
                  onChange={(value) => handleInputChange("currency", value)}
                  placeholder="Select currency"
                  disabled={loading}
                >
                  {currencyData.map((cur) => (
                    <Select.Option key={cur._id} value={cur.currencyId._id}>
                      {cur.currencyId.symbol} {cur.currencyId.currency}
                    </Select.Option>
                  ))}
                </Select>
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Amount</label>
                <Input
                  type="number"
                  className="w-full"
                  value={formData.amount}
                  onChange={(e) => handleInputChange("amount", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="mb-4">
                <label className="block font-medium mb-1">Note</label>
                <Input.TextArea
                  className="w-full"
                  value={formData.note}
                  onChange={(e) => handleInputChange("note", e.target.value)}
                  disabled={loading}
                />
              </div>
              <div className="flex justify-center">
                <Button
                  type="primary"
                  onClick={handleSubmit}
                  disabled={loading || !formData._id}
                >
                  Update
                </Button>
              </div>
            </>
          )}
        </div>
      </Modal>
    );
  }
);

export default ViewAndEditExpense;
