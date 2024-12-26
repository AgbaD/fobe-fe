
import React, { useState, useEffect } from "react";
import { Icon } from "../../ui/Icon";
import toast from "react-hot-toast";
import useRequest from "../../../hooks/useRequest";
import { fundWallet } from "../../../../api/wallet";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FundWalletFormData {
  amount: number | undefined
}

const FundWalletModal: React.FC<ModalProps> = ({ isOpen, onClose }) => {
  const [fundWalletFormData, setFundWalletFormData] = useState<FundWalletFormData>({
    amount: undefined,
  })
  const { makeRequest: FundAccountRequest } = useRequest(fundWallet);

  const handleOutsideClick = (e: MouseEvent) => {
    if (e.target === document.querySelector(".wallet-modal-overlay")) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    } else {
      document.removeEventListener("click", handleOutsideClick);
      resetForm();
    }
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFundWalletFormData(prevData => ({ ...prevData, [name]: value }))
  }

  const resetForm = () => {
    setFundWalletFormData({
      amount: undefined
    })
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const [res, err] = await FundAccountRequest(fundWalletFormData)
    console.log(res, err);

    if (err) {
      toast.error(err.message || 'An error occurred while submitting the form.')
    } else {
      toast.success('Funding initiated successfully!')
      resetForm()
      onClose()
      window.location.href = res.data?.data?.authorization_url
    }
  }

  if (!isOpen) return null;

  return (
    <div className="wallet-modal-overlay">
      <div className="wallet-modal-content">
        <div className="wallet-modal-header">
          <div className="wallet-modal-header-text">
            <h3>Transfer Funds</h3>
          </div>
          <button className="wallet-modal-close" onClick={onClose}>
            <Icon name="close" />
          </button>
        </div>
        <div className="wallet-modal-body">
          <form className="wallet-transfer-funds" onSubmit={handleSubmit}>
            <label className="wallet-label">Amount</label>
            <input
              type="number"
              name="amount"
              value={fundWalletFormData.amount}
              onChange={handleInputChange}
              placeholder="Enter Amount"
              required
            />
            <button type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default FundWalletModal;
