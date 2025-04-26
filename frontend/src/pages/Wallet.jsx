const Wallet = () => {
    return (
        <>
            <div className="wallet">
                <div className="wallet__note">
                    <p>Important Note</p>
                    <p>This is a simulation tool for educational purposes only. No real cryptocurrency is involved. All wallets and transactions are simulated to provide a safe learning environment.</p>
                </div>
                <div className="wallet__header">
                    <h1>Experience Digital Currency Management in a Safe Environment</h1>
                </div>
                <div className="wallet__create-wallet">
                    <h2>Create New Wallet</h2>
                    <div className="wallet__create-wallet__content">
                        <div className="wallet__create-wallet__content__text-and-button">
                        <p>Ready to see how digital currency wallets work? Our simulator lets you experience the essential features of a cryptocurrency wallet without any financial risk. Create your wallet to understand seed phrases, public addresses, and basic transactions.</p>
                        <button className="create-wallet__button">Create Your First Wallet</button>
                        </div>
                        <div className="wallet__create-wallet__content__image">
                            <img src="src/assets/images/bitcoin-key-icon.png" alt="Bitcoin Key" />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};

export default Wallet;
