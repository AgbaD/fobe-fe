import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../../../context/authContext";
import { TableLoadingSkeleton } from "../loadingComponent";
import "../../../../assets/styles/_tablestyles.scss";
import "./index.scss";
import "../../../../assets/styles/statisticsCard.scss";
import useRequest from "../../../hooks/useRequest";
import { getTransactions } from "../../../../api/transaction";
import toast from "react-hot-toast";
import Layout from "../layout";

interface TransactionInterface {
  id: string;
  sender: string;
  receiver: string;
  amount: number;
  completed: boolean;
  type: string;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { makeRequest: transactionsRequest } = useRequest(getTransactions);
  const [isLoading, setIsLoading] = useState(false);
  const [transactions, setTransactions] = useState<TransactionInterface[]>([]);

  useEffect(() => {
    getTransactionsLocal();
  }, [token]);

  const getTransactionsLocal = async () => {
    setIsLoading(true);
    const [resp, err] = await transactionsRequest();
    setIsLoading(false);
    if (err) {
      toast.error(err.message);
    }
    if (resp.status == "success") {
      const transformedTransactions = resp.data.map((transaction: any) => ({
        id: transaction.id,
        sender: transaction.senderWallet?.user?.email || "N/A",
        receiver: transaction.receiverWallet?.user?.email || "N/A",
        amount: parseFloat(transaction.amount),
        completed: transaction.completed,
        type: transaction.type,
      }));
      setTransactions(transformedTransactions)
    }
  };

  return (
    <Layout>
      <div className="main-content">
        <div className="table-section">
          <h2 className="table-heading">Recent Transactions</h2>
          {isLoading ? (
            <TableLoadingSkeleton />
          ) : (
            <table className="striped-table">
              <tbody>
                <tr>
                  <th>Sender</th>
                  <th>Receiver</th>
                  <th>Amount</th>
                  <th>Status</th>
                  <th>Type</th>
                </tr>
                {transactions.map((transaction) => (
                  <tr
                    key={transaction.id}
                    onClick={() => navigate(`/transaction/${transaction.id}`)}
                  >
                    <td>{transaction.sender}</td>
                    <td>{transaction.receiver}</td>
                    <td>{transaction.amount}</td>
                    <td>
                      <button className={`status-button ${transaction.completed ? 'complete' : 'pending'}`}>
                        {transaction.completed ? 'Completed': 'Pending'}
                      </button>
                    </td>
                    {/* <td>{transaction.completed ? 'Completed': 'Pending'}</td> */}
                    <td>{transaction.type}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </Layout>
  );
}
