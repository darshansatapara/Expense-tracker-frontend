

import React, { useState, useMemo, useCallback } from "react";
import { Table, Button, Select } from "antd";
import ViewAndEditExpense from "./ViewAndEditExpense";

export const TransactionList = React.memo(
  ({ transactions, isExpense, onTransactionUpdate }) => {
    const [selectedMode, setSelectedMode] = useState("All");
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedTransaction, setSelectedTransaction] = useState(null);

    const handleViewAndEdit = useCallback((record) => {
      setSelectedTransaction(record);
      setIsModalVisible(true);
    }, []);

    const filteredTransactions = useMemo(
      () =>
        selectedMode === "All"
          ? transactions
          : transactions.filter(
              (transaction) =>
                transaction.mode?.toLowerCase() === selectedMode.toLowerCase()
            ),
      [transactions, selectedMode]
    );

    const columns = useMemo(
      () => [
        {
          title: "Amount",
          dataIndex: "amount",
          key: "amount",
          render: (amount, record) => (
            <span>
              {record.currency?.symbol || "Unknown"}
              {amount ? parseFloat(amount).toFixed(2) : "N/A"}
            </span>
          ),
        },
        {
          title: "Mode",
          dataIndex: "mode",
          key: "mode",
          filterDropdown: ({ confirm }) => (
            <div className="flex flex-col items-start p-1 bg-white shadow-md rounded-md">
              <Select
                value={selectedMode}
                onChange={(value) => {
                  setSelectedMode(value);
                  confirm();
                }}
                style={{ minWidth: "100%", maxWidth: "100%", marginTop: "2%" }}
                options={[
                  { value: "All", label: "All" },
                  { value: "Online", label: "Online" },
                  { value: "Offline", label: "Offline" },
                ]}
              />
            </div>
          ),
        },
        {
          title: "Category",
          dataIndex: "category",
          key: "category",
          render: (category) => (category?._id ? category.name : "N/A"),
        },
        ...(isExpense
          ? [
              {
                title: "Sub-Category",
                dataIndex: "subcategory",
                key: "subcategory",
                render: (subcategory) =>
                  subcategory?._id ? subcategory.name : "N/A",
              },
            ]
          : []),
        {
          title: "Actions",
          key: "actions",
          render: (_, record) => (
            <Button
              type="link"
              className="text-blue-500 hover:underline"
              onClick={() => handleViewAndEdit(record)}
            >
              View & Edit
            </Button>
          ),
        },
      ],
      [isExpense, handleViewAndEdit]
    );

    return (
      <>
        <div className="bg-white shadow-md rounded-lg overflow-hidden p-2">
          <div className="overflow-x-auto">
            <Table
              columns={columns}
              dataSource={filteredTransactions.map((transaction, index) => ({
                ...transaction,
                key: index,
              }))}
              pagination={false}
              rowClassName={(record, index) =>
                index % 2 === 0 ? "bg-white" : "bg-gray-50"
              }
              className="border-collapse w-full table-auto"
            />
          </div>
        </div>
        <ViewAndEditExpense
          isExpense={isExpense}
          isVisible={isModalVisible}
          transaction={selectedTransaction}
          onClose={() => {
            setIsModalVisible(false);
            setSelectedTransaction(null);
          }}
          onTransactionUpdate={onTransactionUpdate}
        />
      </>
    );
  }
);
