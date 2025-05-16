import { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from './Chart';
import { FaCopy } from 'react-icons/fa6';

const ActiveWallet = () => {
  const [isSending, setIsSending] = useState(false);
  const [walletAddress, setWalletAddress] = useState('');
  const [balance, setBalance] = useState(0);
  const [expiryDate, setExpiryDate] = useState('');
  const [transactions, setTransactions] = useState([]);
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState(0);
  const [message, setMessage] = useState('');

  const copyToClipboard = () => {
    const walletAddress = document.getElementById('wallet-address');
    const textToCopy = walletAddress.innerText;
    navigator.clipboard.writeText(textToCopy);
  };

  const handleFormOpen = () => {
    setIsSending(!isSending);
  };

  const handleTransaction = async (e) => {
    e.preventDefault();

    const numericAmount = parseFloat(amount);

    try {
      const response = await axios.post(
        'http://localhost:3000/api/wallet/transaction',
        {
          recipientAddress,
          amount: numericAmount,
        },
        { withCredentials: true }
      );

      if (response.status === 200) {
        const { transaction } = response.data;
        const { amount, senderAddress, status, timestamp } = transaction;

        setTransactions((prev) => [
          ...prev,
          {
            amount,
            senderAddress,
            status,
            timestamp,
          },
        ]);

        setRecipientAddress('');
        setAmount(0);
        setIsSending(false);
        loadWallet();
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
      if (error.response && error.response.status === 400) {
        setMessage(error.response.data.message);
      } else {
        setMessage(error.response.data.error);
      }
    }
  };

  const loadWallet = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/wallet', { withCredentials: true });

      if (response.status === 200) {
        const { wallet } = response.data;
        const { walletAddress, expiryDate, balance, transactions } = wallet;

        setWalletAddress(walletAddress);
        setExpiryDate(new Date(expiryDate).toLocaleDateString());
        setBalance(balance.toFixed(2));
        setTransactions(transactions);
      }
    } catch (error) {
      console.error('Error loading wallet:', error);
    }
  };

  useEffect(() => {
    loadWallet();
  }, []);

  return (
    <div className="active-wallet">
      <h1>Dashboard</h1>
      <hr className="active-wallet__hr" />
      <div className="active-wallet__content">
        <h2>Wallet Overview</h2>
        <p>Your wallet is currently active. You can manage your funds, view transaction history, and more.</p>
        <div className="active-wallet__content__info">
          <div className="active-wallet__content__wallet">
            <h3>Wallet Details</h3>
            <p>Wallet Address:</p>
            <div className="active-wallet__content__wallet__address-container">
              <p id="wallet-address" onClick={copyToClipboard} title="Copy to Clipboard">
                {walletAddress}
              </p>
              <FaCopy onClick={copyToClipboard} className="active-wallet__copy" title="Copy to Clipboard" />
            </div>
            <p>Balance:</p>
            <p id="wallet-balance">{balance} BPC</p>
            <p>Expiry date:</p>
            <p id="wallet-expiry">{expiryDate}</p>
          </div>
          <div className="active-wallet__content__transactions">
            <h3>Your transactions</h3>
            <p>Transaction History: </p>
            {transactions.length > 0 ? (
              <ul>
                {transactions.map((transaction, index) => (
                  <li key={index}>
                    <p>
                      {transaction.type === 'receive' ? <span>Received</span> : <span>Sent</span>}{' '}
                      <span>{transaction.amount} BPC</span>{' '}
                      {transaction.type === 'receive' ? <span>from</span> : <span>to</span>}{' '}
                      <span>{transaction.senderAddress}</span>
                    </p>
                    <hr className="active-wallet__hr-secondary" />
                    <div className="active-wallet__content__transactions__span-container">
                      <span>{new Date(transaction.timestamp).toLocaleDateString()}</span>
                      <span>{transaction.status}</span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p>No transactions available.</p>
            )}
            <button onClick={handleFormOpen}>Send</button>
            {isSending && (
              <form className="active-wallet__content__transactions__form">
                <input
                  type="text"
                  placeholder="Recipient Address"
                  id="recipient-address"
                  value={recipientAddress}
                  onChange={(e) => setRecipientAddress(e.target.value)}
                />
                <input
                  type="number"
                  placeholder="Amount"
                  id="transaction-amount"
                  min={0}
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />
                <button onClick={handleTransaction}>Send</button>
              </form>
            )}
            {isSending && message && <p className="active-wallet__content__transactions__message">{message}</p>}
            <p>
              Want to test the functionality of the wallet and send some crypto? <br /> Invite your friends and ask them
              for their wallet addresses!
            </p>
          </div>
        </div>
      </div>
      <hr className="active-wallet__hr" />
      <div className="active-wallet__chart">
        <h2>Exchange Rates Graph</h2>
        <p>Sample exchange rates for our educational currency</p>
        <div className="active-wallet__chart__content">
          <p>That's how much BTC (Bitcoin) you could potentially buy if it were a real currency</p>
          <Chart />
        </div>
      </div>
    </div>
  );
};

export default ActiveWallet;
