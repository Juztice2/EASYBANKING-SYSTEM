import React, { useEffect, useState } from "react";
import {
ArrowDownLeft,
ArrowUpRight,
Clock,
Search,
ReceiptText,
RefreshCw,
} from "lucide-react";

export default function TransactionHistory() {
const [transactions, setTransactions] = useState([]);
const [searchTerm, setSearchTerm] = useState("");
const [filter, setFilter] = useState("All");

// Retrieve saved transactions from localStorage
const loadTransactions = () => {
try {
const savedTransactions = JSON.parse(
localStorage.getItem("transaction") || "[]"
);


  // Ensure the saved data is an array
  setTransactions(
    Array.isArray(savedTransactions) ? savedTransactions : []
  );
} catch (error) {
  console.error("Failed to load transactions:", error);
  setTransactions([]);
}


};

useEffect(() => {
loadTransactions();


// Update when localStorage changes in another tab
const handleStorageChange = (event) => {
  if (event.key === "transaction") {
    loadTransactions();
  }
};

window.addEventListener("storage", handleStorageChange);

return () => {
  window.removeEventListener("storage", handleStorageChange);
};


}, []);

// Format currency in Nigerian Naira
const formatCurrency = (amount) => {
return new Intl.NumberFormat("en-US", {
style: "currency",
currency: "USD",
minimumFractionDigits: 2,
maximumFractionDigits: 2,
}).format(Number(amount) || 0);
};

// Filter transactions by search term and type
const filteredTransactions = transactions.filter((transaction) => {
const search = searchTerm.toLowerCase();


const matchesSearch = [
  transaction.recipientName,
  transaction.accountNumber,
  transaction.reference,
  transaction.bank,
  transaction.type,
  transaction.status,
].some((value) =>
  String(value || "").toLowerCase().includes(search)
);

const matchesFilter =
  filter === "All" ||
  String(transaction.type || "").toLowerCase() ===
    filter.toLowerCase();

return matchesSearch && matchesFilter;


});

// Calculate total outgoing transfers
const totalTransfers = transactions.reduce((total, transaction) => {
const type = String(transaction.type || "transfer").toLowerCase();


return type === "transfer"
  ? total + (Number(transaction.amount) || 0)
  : total;


}, 0);

return ( <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6 lg:px-10"> <div className="mx-auto max-w-7xl">


    {/* Page Header */}
    <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Transaction History
        </h1>

        <p className="mt-2 text-sm text-gray-500">
          View and manage your recent transactions.
        </p>
      </div>

      <button
        onClick={loadTransactions}
        className="inline-flex items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm font-semibold text-gray-700 transition hover:bg-gray-100"
      >
        <RefreshCw size={17} />
        Refresh
      </button>
    </div>

    {/* Summary Cards */}
    <div className="mb-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Total Transactions
            </p>

            <h2 className="mt-3 text-3xl font-bold text-gray-900">
              {transactions.length}
            </h2>
          </div>

          <div className="rounded-xl bg-green-50 p-3 text-green-600">
            <ReceiptText size={25} />
          </div>
        </div>
      </div>

      <div className="rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-500">
              Total Transfer Amount
            </p>

            <h2 className="mt-3 text-2xl font-bold text-gray-900">
              {formatCurrency(totalTransfers)}
            </h2>
          </div>

          <div className="rounded-xl bg-blue-50 p-3 text-blue-600">
            <ArrowUpRight size={25} />
          </div>
        </div>
      </div>
    </div>

    {/* Transaction List */}
    <div className="overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm">

      {/* Search and Filters */}
      <div className="flex flex-col gap-4 border-b border-gray-100 p-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-bold text-gray-900">
            All Transactions
          </h2>

          <p className="mt-1 text-sm text-gray-500">
            {filteredTransactions.length} transaction(s) found
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <div className="relative">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <input
              type="text"
              placeholder="Search transactions..."
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              className="w-full rounded-xl border border-gray-200 py-3 pl-10 pr-4 text-sm outline-none transition focus:border-green-500 sm:w-64"
            />
          </div>

          <select
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
            className="rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-green-500"
          >
            <option value="All">All Transactions</option>
            <option value="transfer">Transfers</option>
            <option value="deposit">Deposits</option>
            <option value="withdrawal">Withdrawals</option>
          </select>
        </div>
      </div>

      {/* Empty State */}
      {filteredTransactions.length === 0 ? (
        <div className="px-6 py-20 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-gray-100 text-gray-400">
            <ReceiptText size={30} />
          </div>

          <h3 className="mt-5 text-lg font-semibold text-gray-900">
            No transactions found
          </h3>

          <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-gray-500">
            {transactions.length === 0
              ? "Your transactions will appear here when you save them."
              : "Try changing your search term or transaction filter."}
          </p>
        </div>
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto md:block">
            <table className="w-full text-left">
              <thead className="bg-gray-50 text-xs uppercase tracking-wider text-gray-500">
                <tr>
                  <th className="px-6 py-4 font-semibold">
                    Transaction
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Reference
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Date
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Amount
                  </th>

                  <th className="px-6 py-4 font-semibold">
                    Status
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {filteredTransactions.map((transaction, index) => {
                  const type = String(
                    transaction.type || "transfer"
                  ).toLowerCase();

                  const isIncoming =
                    type === "deposit" || type === "credit";

                  const dateValue =
                    transaction.date ||
                    transaction.createdAt ||
                    transaction.timestamp;

                  const parsedDate = dateValue
                    ? new Date(dateValue)
                    : null;

                  const validDate =
                    parsedDate &&
                    !Number.isNaN(parsedDate.getTime());

                  return (
                    <tr
                      key={
                        transaction.reference ||
                        `${transaction.accountNumber || "transaction"}-${index}`
                      }
                      className="transition hover:bg-gray-50"
                    >
                      <td className="px-6 py-5">
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                              isIncoming
                                ? "bg-green-50 text-green-600"
                                : "bg-orange-50 text-orange-600"
                            }`}
                          >
                            {isIncoming ? (
                              <ArrowDownLeft size={21} />
                            ) : (
                              <ArrowUpRight size={21} />
                            )}
                          </div>

                          <div>
                            <p className="font-semibold text-gray-900">
                              {transaction.recipientName ||
                                transaction.description ||
                                (isIncoming
                                  ? "Deposit"
                                  : "Transfer")}
                            </p>

                            <p className="mt-1 text-xs capitalize text-gray-500">
                              {type}
                              {transaction.bank
                                ? ` • ${transaction.bank}`
                                : ""}
                            </p>
                          </div>
                        </div>
                      </td>

                      <td className="px-6 py-5 text-sm text-gray-600">
                        {transaction.reference || "N/A"}
                      </td>

                      <td className="px-6 py-5">
                        <p className="text-sm text-gray-700">
                          {validDate
                            ? parsedDate.toLocaleDateString("en-NG", {
                                day: "2-digit",
                                month: "short",
                                year: "numeric",
                              })
                            : "Date unavailable"}
                        </p>

                        <p className="mt-1 text-xs text-gray-400">
                          {validDate
                            ? parsedDate.toLocaleTimeString("en-NG", {
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : ""}
                        </p>
                      </td>

                      <td
                        className={`whitespace-nowrap px-6 py-5 text-sm font-bold ${
                          isIncoming
                            ? "text-green-600"
                            : "text-gray-900"
                        }`}
                      >
                        {isIncoming ? "+" : "-"}
                        {formatCurrency(transaction.amount)}
                      </td>

                      <td className="px-6 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold capitalize ${
                            String(
                              transaction.status || "completed"
                            ).toLowerCase() === "completed"
                              ? "bg-green-50 text-green-700"
                              : String(
                                  transaction.status || ""
                                ).toLowerCase() === "pending"
                              ? "bg-yellow-50 text-yellow-700"
                              : "bg-red-50 text-red-700"
                          }`}
                        >
                          {transaction.status || "Completed"}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Transaction Cards */}
          <div className="divide-y divide-gray-100 md:hidden">
            {filteredTransactions.map((transaction, index) => {
              const type = String(
                transaction.type || "transfer"
              ).toLowerCase();

              const isIncoming =
                type === "deposit" || type === "credit";

              const dateValue =
                transaction.date ||
                transaction.createdAt ||
                transaction.timestamp;

              const parsedDate = dateValue
                ? new Date(dateValue)
                : null;

              const validDate =
                parsedDate &&
                !Number.isNaN(parsedDate.getTime());

              return (
                <div
                  key={transaction.reference || index}
                  className="p-5"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex min-w-0 items-center gap-3">
                      <div
                        className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                          isIncoming
                            ? "bg-green-50 text-green-600"
                            : "bg-orange-50 text-orange-600"
                        }`}
                      >
                        {isIncoming ? (
                          <ArrowDownLeft size={21} />
                        ) : (
                          <ArrowUpRight size={21} />
                        )}
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold text-gray-900">
                          {transaction.recipientName ||
                            transaction.description ||
                            "Transfer"}
                        </p>

                        <p className="mt-1 text-xs capitalize text-gray-500">
                          {type}
                        </p>
                      </div>
                    </div>

                    <p
                      className={`shrink-0 text-sm font-bold ${
                        isIncoming
                          ? "text-green-600"
                          : "text-gray-900"
                      }`}
                    >
                      {isIncoming ? "+" : "-"}
                      {formatCurrency(transaction.amount)}
                    </p>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-3 text-xs text-gray-500">
                    <span className="flex min-w-0 items-center gap-1">
                      <Clock size={14} />
                      {validDate
                        ? parsedDate.toLocaleDateString("en-NG")
                        : "Date unavailable"}
                    </span>

                    <span className="truncate">
                      Ref: {transaction.reference || "N/A"}
                    </span>
                  </div>

                  <div className="mt-3">
                    <span className="rounded-full bg-green-50 px-3 py-1 text-xs font-semibold capitalize text-green-700">
                      {transaction.status || "Completed"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  </div>
</div>

);
}
