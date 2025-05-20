/**
 * @file ActiveWallet.jsx
 * @description Component that displays the dashboard for an active simulated wallet.
 * It shows wallet details (address, balance, expiry), transaction history,
 * allows sending simulated transactions, and displays an exchange rate chart.
 */

import { useState, useEffect } from 'react';
import axios from 'axios'; // For making HTTP requests
import Chart from './Chart'; // Chart component for displaying exchange rates
import { motion } from 'motion/react'; // For animations
import { pageVariants, pageTransition } from '../../utils/utils'; // Animation utility constants
import { FaCopy } from 'react-icons/fa6'; // Icon for copy-to-clipboard functionality
import Loading from '../Loading'; // Loading spinner component

/**
 * @function ActiveWallet
 * @description Main component for the active wallet dashboard.
 * Fetches and displays wallet information, handles simulated transactions.
 * @returns {JSX.Element} The active wallet dashboard UI.
 */
const ActiveWallet = () => {
  // State to control the visibility of the send transaction form
  const [isSending, setIsSending] = useState(false);
  // State to store the wallet address
  const [walletAddress, setWalletAddress] = useState('');
  // State to store the wallet balance
  const [balance, setBalance] = useState(0);
  // State to store the wallet expiry date
  const [expiryDate, setExpiryDate] = useState('');
  // State to store the list of transactions
  const [transactions, setTransactions] = useState([]);
  // State for the recipient address input in the send form
  const [recipientAddress, setRecipientAddress] = useState('');
  // State for the amount input in the send form
  const [amount, setAmount] = useState(0);
  // State to display messages (e.g., errors, success) to the user
  const [message, setMessage] = useState('');
  // State to manage the loading indicator
  const [isLoading, setIsLoading] = useState(false);

  /**
   * @function copyToClipboard
   * @description Copies the wallet address to the user's clipboard.
   */
  const copyToClipboard = () => {
    const walletAddressElement = document.getElementById('wallet-address');
    if (walletAddressElement) {
      const textToCopy = walletAddressElement.innerText;
      navigator.clipboard
        .writeText(textToCopy)
        .then(() => {
          setMessage('Wallet address copied to clipboard!'); // Show success message
        })
        .catch((err) => {
          console.error('Failed to copy text: ', err);
        });
    }
  };

  /**
   * @function handleFormOpen
   * @description Toggles the visibility of the send transaction form.
   */
  const handleFormOpen = () => {
    setIsSending(!isSending);
    setMessage(''); // Clear any previous messages when opening/closing form
  };

  /**
   * @function handleTransaction
   * @description Handles the submission of a simulated transaction.
   * Makes an API call to the backend to process the transaction.
   * @param {Event} e - The form submission event.
   */
  const handleTransaction = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior

    const numericAmount = parseFloat(amount); // Ensure amount is a number

    try {
      setIsLoading(true); // Show loading indicator during transaction processing
      setMessage(''); // Clear previous messages

      // API call to send a transaction
      const response = await axios.post(
        'https://graded-unit2.onrender.com/api/wallet/transaction',
        {
          recipientAddress,
          amount: numericAmount,
        },
        { withCredentials: true } // Send cookies with the request
      );

      if (response.status === 200) {
        // Assuming the response contains the updated transaction details
        // and potentially the new balance.
        // For now, we'll just add the transaction and reload the wallet.
        const { transaction } = response.data;
        setTransactions((prev) => [...prev, transaction]); // Add new transaction to the list

        setRecipientAddress(''); // Clear recipient address input
        setAmount(0); // Clear amount input
        setIsSending(false); // Close the send form
        setMessage(response.data.message); // Show success message
        loadWallet(); // Reload wallet data to reflect changes
      }
    } catch (error) {
      console.error('Error sending transaction:', error);
      if (error.response && error.response.data) {
        // Display error message from the backend if available
        const errorMessage = error.response.data.message || error.response.data.error || 'Transaction failed.';
        setMessage(errorMessage);
      } else {
        setMessage('Transaction failed. Please try again.');
      }
    } finally {
      setIsLoading(false); // Hide loading indicator
    }
  };

  /**
   * @function loadWallet
   * @description Fetches the active wallet's data from the backend API.
   * Updates the component's state with the fetched data.
   */
  const loadWallet = async () => {
    try {
      setIsLoading(true);
      // Simulate a small delay for better UX
      await new Promise((resolve) => setTimeout(resolve, 200));

      // API call to get wallet data
      const response = await axios.get('https://graded-unit2.onrender.com/api/wallet', { withCredentials: true });

      if (response.status === 200) {
        const { wallet } = response.data;
        const { walletAddress, expiryDate, balance, transactions } = wallet;

        // Update state with fetched wallet data
        setWalletAddress(walletAddress);
        setExpiryDate(new Date(expiryDate).toLocaleDateString()); // Format date
        setBalance(parseFloat(balance).toFixed(2)); // Format balance to 2 decimal places
        setTransactions(transactions || []); // Ensure transactions is an array
      }
    } catch (error) {
      console.error('Error loading wallet:', error);
      // Handle error (e.g., display an error message to the user)
      if (error.response && error.response.status === 404) {
        setMessage('No active wallet found. Please create or access a wallet.');
      } else {
        setMessage('Failed to load wallet data.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  // useEffect hook to load wallet data when the component mounts
  useEffect(() => {
    loadWallet();
  }, []); // Empty dependency array: run only once on component mount

  // Display loading spinner while data is being fetched or processed
  if (isLoading && !isSending) {
    // Avoid full page load during send transaction
    return <Loading />;
  }

  return (
    <motion.div
      className="active-wallet"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1>Dashboard</h1>
      <hr className="active-wallet__hr" />
      <div className="active-wallet__content">
        <h2>Wallet Overview</h2>
        <p>Your wallet is currently active. You can manage your funds, view transaction history, and more.</p>
        <div className="active-wallet__content__info">
          {/* Wallet Details Section */}
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
            <p id="wallet-balance">{balance} BPC</p> {/* BPC is the simulated currency unit */}
            <p>Expiry date:</p>
            <p id="wallet-expiry">{expiryDate}</p>
          </div>

          {/* Transactions Section */}
          <div className="active-wallet__content__transactions">
            <h3>Your transactions</h3>
            <p>Transaction History: </p>
            {transactions.length > 0 ? (
              <ul>
                {/* Map through transactions and display each one */}
                {transactions.map((transaction, index) => (
                  <li key={index}>
                    <p>
                      {/* Differentiate between sent and received transactions */}
                      {transaction.type === 'receive' ? <span>Received</span> : <span>Sent</span>}{' '}
                      <span>{parseFloat(transaction.amount).toFixed(2)} BPC</span>{' '}
                      {transaction.type === 'receive' ? <span>from</span> : <span>to</span>}{' '}
                      {/* Display sender or recipient based on transaction type */}
                      <span>
                        {transaction.type === 'receive' ? transaction.senderAddress : transaction.recipientAddress}
                      </span>
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
            {/* Button to open the send transaction form */}
            <button onClick={handleFormOpen}>{isSending ? 'Cancel' : 'Send'}</button>

            {/* Send Transaction Form (conditionally rendered) */}
            {isSending && (
              <motion.div
                className="active-wallet__content__transactions__form--wrapper"
                initial="initial"
                animate="in"
                exit="out"
                variants={pageVariants} // Re-use page variants for simple fade
                transition={{ duration: 0.3 }} // Faster transition for form
              >
                <form className="active-wallet__content__transactions__form" onSubmit={handleTransaction}>
                  <input
                    type="text"
                    placeholder="Recipient Address"
                    id="recipient-address"
                    value={recipientAddress}
                    onChange={(e) => setRecipientAddress(e.target.value)}
                    required
                  />
                  <input
                    type="number"
                    placeholder="Amount"
                    id="transaction-amount"
                    min="0.01" // Minimum amount to send
                    step="0.01" // Step for decimal amounts
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                  <button type="submit" disabled={isLoading}>
                    {' '}
                    {/* Disable button during API call */}
                    {isLoading ? 'Sending...' : 'Send'}
                  </button>
                </form>
              </motion.div>
            )}
            {/* Display messages related to transactions or form actions */}
            {message && <p className="active-wallet__content__transactions__message">{message}</p>}
            <p>
              Want to test the functionality of the wallet and send some crypto? <br /> Invite your friends and ask them
              for their wallet addresses!
            </p>
          </div>
        </div>
      </div>
      <hr className="active-wallet__hr" />
      {/* Exchange Rates Chart Section */}
      <div className="active-wallet__chart">
        <h2>Exchange Rates Graph</h2>
        <p>Sample exchange rates for our educational currency (BPC/BTC).</p>
        <div className="active-wallet__chart__content">
          <p>That's how much BTC (Bitcoin) you could potentially buy if BPC were a real currency.</p>
          <Chart /> {/* Render the Chart component */}
        </div>
      </div>
    </motion.div>
  );
};

export default ActiveWallet;
