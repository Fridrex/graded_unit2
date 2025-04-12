import words from 'an-array-of-english-words';

const generateSeedPhrase = () => {
    let seedPhrase = [];
    for (let i = 0; i < 12; i++) {
        const randomIndex = Math.floor(Math.random() * words.length);
        seedPhrase.push(words[randomIndex]);
    }
    return seedPhrase.join(' ');
}

const generateWalletAddress = () => {
    let address = '0x';
    const characters = '0123456789abcdef';

    for (let i = 0; i < 40; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        address += characters[randomIndex];
    }

    return address;
}

module.exports = {
    generateSeedPhrase,
    generateWalletAddress
};