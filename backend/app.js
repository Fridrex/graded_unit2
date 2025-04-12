const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();
const helmet = require('helmet');
const morgan = require('morgan');
const bcrypt = require('bcrypt');
const expressSession = require('express-session');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const uuid = require('uuid').v4;

const app = express();
const PORT = process.env.PORT || 3000;
const uri = process.env.MONGODB_URI;

app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());
app.use(morgan('dev'));
app.use(cookieParser());

app.use(expressSession({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, maxAge: 60000 }
    }));

mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err
));

const transactionSchema = new mongoose.Schema({
    txId: { type: String, required: true },
    amount: { type: Number, required: true },
    timestamp: { type: Date, default: Date.now },
    description: { type: String },
    type: { type: String, enum: ['send', 'receive'], required: true }
});

const walletSchema = new mongoose.Schema({
    walletAddress: { type: String, required: true, unique: true },
    seedPhrase: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true },
    balance: { type: Number, default: 0 },
    transactions: [transactionSchema]
});

walletSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });
const Wallet = mongoose.model('Wallet', walletSchema);

const learningProgressSchema = new mongoose.Schema({
    sessionId: { type: String, required: true},
    module: { type: String, required: true },
    completed: { type: Boolean, default: false },
    lastAccessed: { type: Date, default: Date.now },
    expiryDate: { type: Date, required: true }
});

learningProgressSchema.index({ expiryDate: 1 }, { expireAfterSeconds: 0 });
const LearningProgress = mongoose.model('LearningProgress', learningProgressSchema);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});