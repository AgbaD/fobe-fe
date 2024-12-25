
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthContext } from '../../../context/authContext';
import { TableLoadingSkeleton } from '../loadingComponent';
import '../../../../assets/styles/_tablestyles.scss';
import './index.scss';
import '../../../../assets/styles/statisticsCard.scss';
import useRequest from '../../../hooks/useRequest';
import toast from 'react-hot-toast';
import Layout from '../layout';
import { transferFunds } from '../../../../api/wallet';


interface Wallet {
  balance: string;
  user: any;
}

export default function Wallet() {
  const navigate = useNavigate();
  const { token } = useAuthContext();
  const { makeRequest: transferFundsRequest } = useRequest(transferFunds);
  const [isLoading, setIsLoading] = useState(false);

  const transferFundsLocal = async () => {
    setIsLoading(true)
    const [resp, err] = await transferFundsRequest();
    setIsLoading(false)
    if (err) {
      toast.error(err.message);
    }
    if (resp.status == 'success') {
      
    } 
  }

  const getProfileLocal = async () => {
    const [resp, err] = await transferFundsRequest();
    setIsLoading(false)
    if (err) {
      toast.error(err.message);
    }
    if (resp.status == 'success') {
      
    } 
  }

  useEffect(() => {
    getProfileLocal();
  }, [token]);

  return (
    <Layout>
      
    </Layout>
  );
}