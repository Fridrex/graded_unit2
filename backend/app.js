/**
 * @file app.js
 * @description Main backend application file. Handles API requests for wallet creation,
 * access, transactions, and tracking learning progress.
 * Uses Express.js, Mongoose for MongoDB interaction, and JWT for authentication.
 */

// Import necessary modules
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors'); // Middleware for handling CORS requests
const dotenv = require('dotenv'); // For loading environment variables from a .env file
dotenv.config(); // Activate dotenv
const helmet = require('helmet'); // Middleware for setting various security-related HTTP headers
const morgan = require('morgan'); // HTTP request logger middleware
const bcrypt = require('bcrypt'); // For hashing passwords (in this case, seed phrases)
const jwt = require('jsonwebtoken'); // For creating and verifying JSON Web Tokens
const cookieParser = require('cookie-parser'); // Middleware for parsing cookies
const uuid = require('uuid').v4; // For generating UUIDs (used for transaction IDs and session IDs)
const { generateSeedPhrase, generateWalletAddress } = require('./utils/utils.js'); // Utilities for generating seed phrases and wallet addresses

const app = express(); // Create an Express application instance
const PORT = process.env.PORT || 3000; // Server port, from environment variables or default to 3000
const uri = process.env.MONGODB_URI; // URI for MongoDB connection, from environment variables

// Application-wide middleware
app.use(express.json()); // Parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // Parse URL-encoded request bodies
app.use(cookieParser()); // Parse cookies
app.use(cors({ origin: 'https://graded-unit2-1.onrender.com', credentials: true })); // Configure CORS to allow requests from the frontend (port 3001) and allow credentials (cookies)
app.use(helmet()); // Set security headers
app.use(morgan('dev')); // Log HTTP requests in development mode

// Connect to MongoDB
mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected')) // Successful connection
  .catch((err) => console.error('MongoDB connection error:', err)); // Connection error

// Schema for transactions within a wallet
const transactionSchema = new mongoose.Schema({
  txId: { type: String, required: true }, // Unique transaction ID
  amount: { type: Number, required: true }, // Transaction amount
  timestamp: { type: Date, default: Date.now }, // Transaction timestamp
  type: { type: String, enum: ['send', 'receive'], required: true }, // Transaction type: send or receive
  senderAddress: { type: String }, // Sender's address (can be null for 'receive' if it's an initial funding)
  recipientAddress: { type: String }, // Recipient's address
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'completed' }, // Transaction status (in simulation, all are 'completed' or 'failed' immediately)
});

// Schema for a wallet
const walletSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true }, // Unique wallet address
  seedPhrase: { type: String, required: true }, // Hashed seed phrase
  createdAt: { type: Date, default: Date.now }, // Wallet creation date
  expiryDate: { type: Date, required: true }, // Wallet expiry date (for automatic deletion)
  balance: { type: Number, default: 0 }, // Wallet balance
  transactions: [transactionSchema], // Array of transactions
});

// TTL index for automatic deletion of Wallet documents after expiryDate
walletSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 }); // Set TTL index on expiryDate
walletSchema.index({ 'transactions.txId': 1 }, { unique: true, sparse: true }); // Ensure unique transaction IDs within transactions array
const Wallet = mongoose.model('Wallet', walletSchema); // Create Wallet model

// Schema for tracking user's learning progress
const learningProgressSchema = new mongoose.Schema({
  sessionId: { type: String, required: true }, // User's session ID (from cookie)
  module: { type: String, required: true }, // Name of the learning module
  completed: { type: Boolean, default: false }, // Module completion status
  lastAccessed: { type: Date, default: Date.now }, // Last access date for the module
  expiryDate: { type: Date, required: true }, // Expiry date for the progress record
});

// TTL index for automatic deletion of LearningProgress records
learningProgressSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });
const LearningProgress = mongoose.model('LearningProgress', learningProgressSchema); // Create LearningProgress model

/**
 * @function authenticateToken
 * @description Middleware to authenticate a user based on a JWT token from a cookie.
 * @param {object} req - Express request object.
 * @param {object} res - Express response object.
 * @param {function} next - Next middleware function.
 */
const authenticateToken = (req, res, next) => {
  const token = req.cookies.auth_token; // Get token from 'auth_token' cookie

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' }); // Error if token is missing
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalid' }); // Error if token is invalid
    }
    // If token is valid, add user information (from token) to the request object
    req.user = user;
    next(); // Proceed to the next handler
  });
};

// Endpoint for creating a new wallet
app.post('/api/wallet/create', async (req, res) => {
  try {
    const seedPhrase = generateSeedPhrase(); // Generate a new seed phrase
    const walletAddress = generateWalletAddress(); // Generate a new wallet address
    const randomBalance = Math.floor(Math.random() * 696969); // Generate a random initial balance

    // Check if a wallet with this address already exists (unlikely, but for completeness)
    const existingWallet = await Wallet.findOne({ walletAddress });
    if (existingWallet) {
      // If wallet exists, try to create a new one (rare address collision case)
      return res.redirect(307, '/api/wallet/create'); // Temporary redirect for a retry
    }

    const saltRounds = 10; // Number of salt rounds for hashing
    const hashedSeedPhrase = await bcrypt.hash(seedPhrase, saltRounds); // Hash the seed phrase

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 72); // Set wallet lifespan (72 hours)

    // Create a new wallet document
    const newWallet = new Wallet({
      walletAddress,
      seedPhrase: hashedSeedPhrase,
      expiryDate,
      balance: randomBalance,
      transactions: [], // Initial transaction list is empty
    });

    await newWallet.save(); // Save the wallet to the DB

    // Create a JWT token for the user's session
    const token = jwt.sign(
      { walletId: newWallet._id, walletAddress: newWallet.walletAddress },
      process.env.JWT_SECRET, // Secret key for signing the token
      { expiresIn: '72h' } // Token expiry time
    );

    // Set the token in an httpOnly cookie
    res.cookie('auth_token', token, {
      httpOnly: true, // Cookie is not accessible via client-side JavaScript
      secure: true, // Cookie is only sent over HTTPS (in production)
      maxAge: 72 * 60 * 60 * 1000, // Cookie lifespan (72 hours)
      sameSite: 'None', // Cookie is sent with cross-origin requests
    });

    // Respond to the client with the created wallet data (including the original seed phrase)
    res.status(201).json({
      message: 'Wallet created successfully',
      wallet: {
        _id: newWallet._id,
        walletAddress: newWallet.walletAddress,
        seedPhrase: seedPhrase, // Send the unhashed seed phrase for the user to see
        createdAt: newWallet.createdAt,
        expiryDate: newWallet.expiryDate,
        balance: newWallet.balance,
        transactions: newWallet.transactions,
      },
    });
  } catch (err) {
    // Handle errors during wallet creation
    res.status(500).json({
      message: 'Error creating wallet',
      error: err.message,
    });
  }
});

// Endpoint for accessing an existing wallet
app.post('/api/wallet/access', async (req, res) => {
  try {
    const loggedToken = req.cookies.auth_token; // Check for an existing authentication token

    if (!loggedToken) {
      // If no token, attempt login via seed phrase
      const { seedPhrase } = req.body;

      if (!seedPhrase) {
        return res.status(400).json({ message: 'Seed phrase is required' });
      }

      const wallets = await Wallet.find({}); // Get all wallets

      let matchedWallet = null;
      // Iterate through all wallets and compare hashed seed phrases
      for (const wallet of wallets) {
        const isMatch = await bcrypt.compare(seedPhrase, wallet.seedPhrase);
        if (isMatch) {
          matchedWallet = wallet;
          break;
        }
      }

      if (!matchedWallet) {
        return res.status(404).json({ message: 'Wallet not found or seed phrase incorrect' });
      }

      // If wallet found, create a new JWT token
      const token = jwt.sign(
        { walletId: matchedWallet._id, walletAddress: matchedWallet.walletAddress },
        process.env.JWT_SECRET,
        { expiresIn: '72h' }
      );

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: true,
        maxAge: 72 * 60 * 60 * 1000,
        sameSite: 'None',
      });

      // Prepare wallet data for the response
      const walletResponse = {
        walletAddress: matchedWallet.walletAddress,
        expiryDate: matchedWallet.expiryDate,
        balance: matchedWallet.balance,
        transactions: matchedWallet.transactions,
      };

      res.status(200).json({
        message: 'Wallet logged in successfully',
        wallet: walletResponse,
      });
    } else {
      // If token exists, verify it and get wallet data
      const decodedToken = jwt.verify(loggedToken, process.env.JWT_SECRET);
      const wallet = await Wallet.findById(decodedToken.walletId);

      if (!wallet) {
        // If wallet not found by ID from token (e.g., deleted), clear the cookie
        res.clearCookie('auth_token');
        return res.status(404).json({ message: 'Wallet not found' });
      }

      const walletResponse = {
        walletAddress: wallet.walletAddress,
        expiryDate: wallet.expiryDate,
        balance: wallet.balance,
        transactions: wallet.transactions,
      };

      res.status(200).json({
        message: 'Wallet accessed successfully via token',
        wallet: walletResponse,
      });
    }
  } catch (error) {
    // Handle errors during wallet access
    if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
      res.clearCookie('auth_token'); // Clear invalid token
      return res.status(403).json({ message: 'Token invalid or expired, please log in again.' });
    }
    res.status(500).json({
      message: 'Error logging in',
      error: error.message,
    });
  }
});

// Endpoint to get data for the currently authenticated wallet
app.get('/api/wallet/', authenticateToken, async (req, res) => {
  try {
    // req.user contains data from the JWT token (walletId, walletAddress)
    const wallet = await Wallet.findById(req.user.walletId);

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    // Prepare wallet data for the response
    const walletResponse = {
      _id: wallet._id,
      walletAddress: wallet.walletAddress,
      expiryDate: wallet.expiryDate,
      balance: wallet.balance,
      transactions: wallet.transactions,
    };

    res.status(200).json({ wallet: walletResponse });
  } catch (err) {
    // Handle errors when fetching wallet data
    res.status(500).json({
      message: 'Error fetching wallet',
      error: err.message,
    });
  }
});

// Endpoint to update learning progress
app.post('/api/learning/progress', async (req, res) => {
  try {
    const { module } = req.body; // Get module name from request body
    let sessionId = req.cookies.sessionId; // Get session ID from cookie

    if (!module) {
      return res.status(400).json({ message: 'Module is required' });
    }

    // If no session ID, generate a new one and set it in a cookie
    if (!sessionId) {
      const newSessionId = uuid(); // Generate UUID for session
      // Set 'sessionId' cookie for 7 days (168 hours)
      res.cookie('sessionId', newSessionId, {
        httpOnly: true,
        secure: true,
        maxAge: 168 * 60 * 60 * 1000,
        sameSite: 'None',
      });
      sessionId = newSessionId;
    }

    // Find existing progress record for this session and module
    let learningProgress = await LearningProgress.findOne({ sessionId, module });

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 168); // Progress record lifespan - 7 days

    if (learningProgress) {
      // If record exists, update it
      learningProgress.completed = true;
      learningProgress.lastAccessed = new Date();
      learningProgress.expiryDate = expiryDate; // Update expiry date
      await learningProgress.save();
    } else {
      // If no record, create a new one
      learningProgress = new LearningProgress({
        sessionId,
        module,
        completed: true,
        lastAccessed: new Date(),
        expiryDate,
      });
      await learningProgress.save();
    }

    res.status(200).json({
      message: 'Learning progress updated successfully',
      progress: learningProgress,
    });
  } catch (err) {
    console.error('Error updating learning progress:', err);
    res.status(500).json({
      message: 'Error updating learning progress',
      error: err.message,
    });
  }
});

// Endpoint to get all learning progress for the current session
app.get('/api/learning/getProgress', async (req, res) => {
  try {
    let sessionId = req.cookies.sessionId; // Get session ID from cookie

    if (!sessionId) {
      // If no sessionId, user hasn't taken any quizzes yet
      return res.status(200).json({
        message: 'No learning progress found for this session.',
        progress: [], // Return an empty array
      });
    }

    const learningProgress = await LearningProgress.find({ sessionId }); // Find all records for this sessionId

    res.status(200).json({
      message: 'Learning progress fetched successfully',
      progress: learningProgress,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Error fetching learning progress',
      error: error.message,
    });
  }
});

// Endpoint for making a transaction between wallets
app.post('/api/wallet/transaction', authenticateToken, async (req, res) => {
  const { recipientAddress, amount } = req.body; // Recipient address and amount
  const senderId = req.user.walletId; // Sender's ID from JWT token
  const senderAddress = req.user.walletAddress; // Sender's address from JWT token

  // Validate input data
  if (!recipientAddress || !amount) {
    return res.status(400).json({ message: 'Recipient address and amount are required' });
  }
  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }
  if (recipientAddress === senderAddress) {
    return res.status(400).json({ message: 'You cannot send funds to yourself' });
  }
  // Simple address format check (should start with 0x and be 42 characters long)
  if (!/^0x[a-fA-F0-9]{40}$/.test(recipientAddress)) {
    return res.status(400).json({ message: 'Invalid recipient address format' });
  }

  const session = await mongoose.startSession(); // Start MongoDB session for atomic transaction
  session.startTransaction(); // Start database transaction

  try {
    // Get sender's wallet from DB within the session
    const senderWallet = await Wallet.findById(senderId).session(session);
    if (!senderWallet) {
      throw new Error('Sender wallet not found');
    }
    if (senderWallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    // Get recipient's wallet from DB within the session
    const recipientWallet = await Wallet.findOne({ walletAddress: recipientAddress }).session(session);

    const txId = uuid(); // Generate unique ID for the transaction
    const timestamp = new Date(); // Current timestamp

    // Update sender's balance and add transaction
    senderWallet.balance -= amount;
    const senderTx = {
      txId,
      amount,
      timestamp,
      type: 'send',
      senderAddress: senderAddress,
      recipientAddress: recipientAddress,
      // Status is 'failed' if recipient not found, otherwise 'completed'
      status: recipientWallet ? 'completed' : 'failed',
    };
    senderWallet.transactions.push(senderTx);

    // If recipient wallet found, update its balance and add transaction
    if (recipientWallet) {
      recipientWallet.balance += amount;
      const recipientTx = {
        txId,
        amount,
        timestamp,
        type: 'receive',
        senderAddress: senderAddress,
        recipientAddress: recipientAddress,
        status: 'completed',
      };
      recipientWallet.transactions.push(recipientTx);
      await recipientWallet.save({ session }); // Save recipient wallet changes
    } else {
      // If recipient wallet not found, log it.
      // The sender's transaction will be marked as 'failed'.
      console.log(
        `Transaction ${txId}: recipient wallet ${recipientAddress} not found. Funds remain with sender but transaction is logged as failed attempt.`
      );
      // In this simulation, if recipient is not found, funds are deducted from sender,
      // and sender's transaction status is 'failed'. This isn't perfectly realistic
      // (funds might be returned or "burned" in a real blockchain).
      // For this simulation, senderTx.status 'failed', sender balance IS reduced.
    }

    await senderWallet.save({ session }); // Save sender wallet changes

    await session.commitTransaction(); // Commit database transaction

    res.status(200).json({
      message: recipientWallet
        ? 'Transaction completed successfully'
        : 'Transaction attempt logged. Recipient wallet not found.', // Clarified message
      transaction: senderTx, // Return sender's transaction details
      newBalance: senderWallet.balance, // Sender's new balance
    });
  } catch (error) {
    await session.abortTransaction(); // Rollback database transaction on error
    console.error('Transaction failed:', error);
    res.status(500).json({
      message: error.message || 'Transaction failed',
      error: error.message,
    });
  } finally {
    session.endSession(); // End MongoDB session
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
