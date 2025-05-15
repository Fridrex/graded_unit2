const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;
const { generateSeedPhrase, generateWalletAddress } = require('./utils/utils.js');

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({ origin: 'http://localhost:3001', credentials: true }));
app.use(helmet());
app.use(morgan('dev'));

mongoose
  .connect(uri)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

const transactionSchema = new mongoose.Schema({
  txId: { type: String, required: true },
  amount: { type: Number, required: true },
  timestamp: { type: Date, default: Date.now },
  type: { type: String, enum: ['send', 'receive'], required: true },
  senderAddress: { type: String },
  recipientAddress: { type: String },
  status: { type: String, enum: ['pending', 'completed', 'failed'], default: 'pending' },
});

const walletSchema = new mongoose.Schema({
  walletAddress: { type: String, required: true, unique: true },
  seedPhrase: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
  balance: { type: Number, default: 0 },
  transactions: [transactionSchema],
});

walletSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });
const Wallet = mongoose.model('Wallet', walletSchema);

const learningProgressSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  module: { type: String, required: true },
  completed: { type: Boolean, default: false },
  lastAccessed: { type: Date, default: Date.now },
  expiryDate: { type: Date, required: true },
});

learningProgressSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });
const LearningProgress = mongoose.model('LearningProgress', learningProgressSchema);

const authenticateToken = (req, res, next) => {
  const token = req.cookies.auth_token;

  if (!token) {
    return res.status(401).json({ message: 'Unauthorized' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: 'Token invalid' });
    }

    req.user = user;
    next();
  });
};

app.post('/api/wallet/create', async (req, res) => {
  try {
    const seedPhrase = generateSeedPhrase();
    const walletAddress = generateWalletAddress();
    const randomBalance = Math.floor(Math.random() * 696969);

    const existingWallet = await Wallet.findOne({ walletAddress });
    if (existingWallet) {
      return res.redirect(307, '/api/wallet/create');
    }

    const saltRounds = 10;
    const hashedSeedPhrase = await bcrypt.hash(seedPhrase, saltRounds);

    const expiryDate = new Date();
    expiryDate.setHours(expiryDate.getHours() + 72);

    const newWallet = new Wallet({
      walletAddress,
      seedPhrase: hashedSeedPhrase,
      expiryDate,
      balance: randomBalance,
      transactions: [],
    });

    await newWallet.save();

    const token = jwt.sign({ walletId: newWallet._id, walletAddress }, process.env.JWT_SECRET, { expiresIn: '72h' });

    res.cookie('auth_token', token, {
      httpOnly: true,
      secure: false,
      maxAge: 72 * 60 * 60 * 1000,
    });

    res.status(201).json({
      message: 'Wallet created successfully',
      wallet: {
        _id: newWallet._id,
        walletAddress: newWallet.walletAddress,
        seedPhrase: seedPhrase,
        createdAt: newWallet.createdAt,
        expiryDate: newWallet.expiryDate,
        balance: newWallet.balance,
        transactions: newWallet.transactions,
      },
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error creating wallet',
      error: err.message,
    });
  }
});

app.post('/api/wallet/access', async (req, res) => {
  try {
    const loggedToken = req.cookies.auth_token;

    if (!loggedToken) {
      const { seedPhrase } = req.body;

      if (!seedPhrase) {
        return res.status(400).json({ message: 'Seed phrase is required' });
      }

      const wallets = await Wallet.find({});

      let matchedWallet = null;

      for (const wallet of wallets) {
        const isMatch = await bcrypt.compare(seedPhrase, wallet.seedPhrase);
        if (isMatch) {
          matchedWallet = wallet;
          break;
        }
      }

      if (!matchedWallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }

      const token = jwt.sign(
        { walletId: matchedWallet._id, walletAddress: matchedWallet.walletAddress },
        process.env.JWT_SECRET,
        { expiresIn: '72h' }
      );

      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: false,
        maxAge: 72 * 60 * 60 * 1000,
      });

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
      const decodedToken = jwt.verify(loggedToken, process.env.JWT_SECRET);
      const wallet = await Wallet.findById(decodedToken.walletId);

      if (!wallet) {
        return res.status(404).json({ message: 'Wallet not found' });
      }

      const walletResponse = {
        walletAddress: wallet.walletAddress,
        expiryDate: wallet.expiryDate,
        balance: wallet.balance,
        transactions: wallet.transactions,
      };

      res.status(200).json({
        message: 'Wallet logged in successfully',
        wallet: walletResponse,
      });
    }
  } catch (error) {
    res.status(500).json({
      message: 'Error logging in',
      error: error.message,
    });
  }
});

app.get('/api/wallet/', authenticateToken, async (req, res) => {
  try {
    const wallet = await Wallet.findById(req.user.walletId);

    if (!wallet) {
      return res.status(404).json({ message: 'Wallet not found' });
    }

    const walletResponse = {
      _id: wallet._id,
      walletAddress: wallet.walletAddress,
      expiryDate: wallet.expiryDate,
      balance: wallet.balance,
      transactions: wallet.transactions,
    };

    res.status(200).json({ wallet: walletResponse });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching wallet',
      error: err.message,
    });
  }
});

app.post('/api/learning/progress', async (req, res) => {
  try {
    const { module } = req.body;
    let sessionId = req.cookies.sessionId;

    if (!module) {
      return res.status(400).json({ message: 'Module is required' });
    }

    if (!sessionId) {
      const newSessionId = uuid();
      res.cookie('sessionId', newSessionId, { httpOnly: true, secure: false, maxAge: 168 * 60 * 60 * 1000 });
      sessionId = newSessionId;
    }

    let learningProgress = await LearningProgress.findOne({ sessionId, module });

    if (learningProgress) {
      learningProgress.completed = true;
      learningProgress.lastAccessed = new Date();
      await learningProgress.save();
    } else {
      const expiryDate = new Date();
      expiryDate.setHours(expiryDate.getHours() + 168);

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

app.get('/api/learning/getProgress', async (req, res) => {
  try {
    let sessionId = req.cookies.sessionId;

    const learningProgress = await LearningProgress.find({ sessionId });

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

app.post('/api/wallet/transaction', authenticateToken, async (req, res) => {
  const { recipientAddress, amount } = req.body;
  const senderId = req.user.walletId;
  const senderAddress = req.user.walletAddress;

  if (!recipientAddress || !amount) {
    return res.status(400).json({ message: 'Recipient address and amount are required' });
  }

  if (typeof amount !== 'number' || amount <= 0) {
    return res.status(400).json({ message: 'Invalid amount' });
  }

  if (recipientAddress === senderAddress) {
    return res.status(400).json({ message: 'You cannot send funds to yourself' });
  }

  if (recipientAddress.length !== 42) {
    return res.status(400).json({ message: 'Invalid recipient address format' });
  }

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const senderWallet = await Wallet.findById(senderId).session(session);

    if (!senderWallet) {
      throw new Error('Sender wallet not found');
    }

    if (senderWallet.balance < amount) {
      throw new Error('Insufficient balance');
    }

    const recipientWallet = await Wallet.findOne({ walletAddress: recipientAddress }).session(session);

    const txId = uuid();
    const timestamp = new Date();

    senderWallet.balance -= amount;
    const senderTx = {
      txId,
      amount,
      timestamp,
      type: 'send',
      senderAddress: senderAddress,
      recipientAddress: recipientAddress,
      status: recipientWallet ? 'completed' : 'failed',
    };
    senderWallet.transactions.push(senderTx);

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
      await recipientWallet.save({ session });
    } else {
      console.log(`Transaction ${txId}: failed to find recipient wallet`);
    }

    await senderWallet.save({ session });

    await session.commitTransaction();

    res.status(200).json({
      message: recipientWallet
        ? 'Transaction completed successfully'
        : 'Transaction sent but recipient wallet not found',
      transaction: senderTx,
      newBalance: senderWallet.balance,
    });
  } catch (error) {
    await session.abortTransaction();
    console.error('Transaction failed:', error);
    res.status(500).json({
      message: 'Transaction failed',
      error: error.message,
    });
  } finally {
    session.endSession();
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
