import { useState, useEffect } from 'react';
import '../../../../assets/styles/_tablestyles.scss';
import './index.scss';
import useRequest from '../../../hooks/useRequest';
import toast from 'react-hot-toast';
import Layout from '../layout';
import { getProfile } from '../../../../api/profile';
import TransferFundsModal from './TransferFunds';
import FundWalletModal from './FundAccount';
import BaseButton from '../../ui/button';
import { Icon } from '../../ui/Icon';


interface Wallet {
  balance: string;
  user: any;
}

export default function Wallet() {
  const [transferFundsModalOpen, setTransferFundsModalOpen] = useState(false);
  const [fundAccountModalOpen, setFundAccountModalOpen] = useState(false);
  const { makeRequest: getProfileRequest } = useRequest(getProfile);
  const [isLoading, setIsLoading] = useState(false);
  const [balance, setBalance] = useState<number>()
  const handleTransferFundsModalOpen = () => {
    setTransferFundsModalOpen(true);
  };

  const handleTransferFundsModalClose = () => {
    setTransferFundsModalOpen(false);
  };

  const handleFundAccountModalOpen = () => {
    setFundAccountModalOpen(true);
  };

  const handleFundAccountModalClose = () => {
    setFundAccountModalOpen(false);
  };

  const getProfileLocal = async () => {
    setIsLoading(true)
    const [resp, err] = await getProfileRequest();
    setIsLoading(false)
    if (err) {
      toast.error(err.message);
    }
    if (resp.status == 'success') {
      setBalance(resp.data?.wallet?.balance)
    } 
  }

  useEffect(() => {
    getProfileLocal();
  }, []);

  return (
    <Layout>
      <div className="account-container">
        <div className="account-balance-section">
          <h2 className="account-balance">
            Account Balance: { isLoading? 'loading': `#${balance}` }
          </h2>
        </div>
        
        <div className="account-actions">
          <BaseButton
            onClick={handleFundAccountModalOpen}
            variant="primary"
            className="offer-button fund-button"
          >
            <Icon name="plane" className="icon" />
            Fund Account
          </BaseButton>
          <BaseButton
            onClick={handleTransferFundsModalOpen}
            variant="primary"
            className="offer-button transfer-button"
          >
            <Icon name="plane" className="icon" />
            Transfer Funds
          </BaseButton>
        </div>
      </div>
      <TransferFundsModal isOpen={transferFundsModalOpen} onClose={handleTransferFundsModalClose} />
      <FundWalletModal isOpen={fundAccountModalOpen} onClose={handleFundAccountModalClose} />
    </Layout>
  );
}