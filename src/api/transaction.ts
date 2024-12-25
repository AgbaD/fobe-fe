import createRequest from "../utils/api";

function getTransactions() {
  return createRequest("/api/transaction/history", "get");
}

function getTransactionById(transactionId: string) {
    return createRequest(`/api/transaction/${transactionId}`, "get");
  }

export { getTransactionById, getTransactions };
