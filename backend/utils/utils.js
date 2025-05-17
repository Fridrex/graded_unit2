/**
 * @file utils.js (Backend)
 * @description Utility functions for the backend, such as generating seed phrases and wallet addresses.
 * Uses an array of English words for seed phrase generation.
 */

// Import an array of English words for seed phrase generation
const words = require('an-array-of-english-words'); // Using require for CommonJS

/**
 * @function generateSeedPhrase
 * @description Generates a random 12-word seed phrase.
 * @returns {string} The generated seed phrase, with words separated by spaces.
 */
const generateSeedPhrase = () => {
  let seedPhrase = []; // Array to store the words of the seed phrase
  const wordCount = 12; // Number of words in the seed phrase

  for (let i = 0; i < wordCount; i++) {
    // Select a random word from the imported array
    const randomIndex = Math.floor(Math.random() * words.length);
    seedPhrase.push(words[randomIndex]);
  }
  return seedPhrase.join(' '); // Join the words into a string, separated by spaces
};

/**
 * @function generateWalletAddress
 * @description Generates a random wallet address in a format similar to Ethereum (0x + 40 hexadecimal characters).
 * @returns {string} The generated wallet address.
 */
const generateWalletAddress = () => {
  let address = '0x'; // Addresses typically start with '0x'
  const characters = '0123456789abcdef'; // Allowed characters for the hexadecimal part of the address
  const addressLength = 40; // Length of the hexadecimal part of the address

  for (let i = 0; i < addressLength; i++) {
    // Append a random hexadecimal character
    const randomIndex = Math.floor(Math.random() * characters.length);
    address += characters[randomIndex];
  }

  return address;
};

// Export functions for use in other modules (e.g., in app.js)
module.exports = {
  generateSeedPhrase,
  generateWalletAddress,
};
