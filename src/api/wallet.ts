import createRequest from "../utils/api";

function fundWallet(payload: {
  amount: number;
}) {
  return createRequest("/api/wallet/fund", "post", payload);
}

function transferFunds(payload: {
  receiverId: string;
  amount: number;
}) {
  return createRequest("/api/wallet/transfer", "post", payload);
}

export { fundWallet, transferFunds };
