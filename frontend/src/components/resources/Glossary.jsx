import { HashLink as Link } from 'react-router-hash-link';

const Glossary = ({ isOpen, handleIsOpen }) => {
  return (
    <>
      {isOpen ? (
        <div className="resources__info-blocks__glossary">
          <div className="resources__info-blocks__glossary__header">
            <h2>Demystifying the Tech: Your Comprehensive Glossary</h2>
          </div>
          <div className="resources__info-blocks__glossary__main">
            <h3>Find the Definitions You Need</h3>
            <ul className="resources__info-blocks__glossary__main__navigation">
              <li>
                <Link to="#core_jargon">Core Jargons</Link>
              </li>
              <li>
                <Link to="#blockchain_specific">Blockchain Specific terms</Link>
              </li>
              <li>
                <Link to="#cryptocurrency_specific">Cryptocurrency Specific terms</Link>
              </li>
              <li>
                <Link to="#cbdc_specific">CBDC Specific terms</Link>
              </li>
              <li>
                <Link to="#important_terms">Important terms</Link>
              </li>
            </ul>
            <ul className="resources__info-blocks__glossary__main--preview">
              <h4 id="core_jargon">Core Jargon from Educational Texts</h4>
              <li>
                <p>
                  <span>Blockchain</span> — A digital ledger duplicated across many computers, making it difficult to
                  change or delete data
                </p>
              </li>
              <li>
                <p>
                  <span>Central Bank Digital Currency (CBDC)</span> — A digital form of a country's national currency,
                  issued by the central bank
                </p>
              </li>
              <li>
                <p>
                  <span>Cryptography</span> — The art of writing or solving codes
                </p>
              </li>
              <li>
                <p>
                  <span>Decentralisation</span> — No single authority controls the network; it is distributed
                </p>
              </li>
              <li>
                <p>
                  <span>Digital Currency</span> — Money that exists only in electronic form
                </p>
              </li>
              <li>
                <p>
                  <span>Digital Wallet</span> — A software program or hardware device that allows you to store, send,
                  and receive cryptocurrencies
                </p>
              </li>
              <li>
                <p>
                  <span>Immutability</span> — Once a block of data is added to the chain, it's very hard to change
                </p>
              </li>
              <li>
                <p>
                  <span>Mining</span> — In Proof-of-Work systems, the process of validating transactions and adding them
                  to the blockchain
                </p>
              </li>
              <li>
                <p>
                  <span>Private Key</span> — A secret code that allows you to access and spend your cryptocurrency
                </p>
              </li>
              <li>
                <p>
                  <span>Public Key</span> — A code that you can share with others to receive cryptocurrency
                </p>
              </li>
              <li>
                <p>
                  <span>Staking</span> — In Proof-of-Stake systems, the process of holding and "locking up"
                  cryptocurrency to support the network and validate transactions
                </p>
              </li>
              <li>
                <p>
                  <span>Transaction</span> — An exchange of digital currency from one person to another
                </p>
              </li>
              <li>
                <p>
                  <span>Transparency</span> — All transactions are visible to participants in the network, but personal
                  information is kept private
                </p>
              </li>
            </ul>
            <hr className="resources__info-blocks__glossary__main__hr" />
            <ul className="resources__info-blocks__glossary__main--preview--expanded">
              <h4>Expanded Glossary with Descriptions</h4>
              <p className="resources__info-blocks__glossary__main--preview--expanded__group" id="blockchain_specific">
                A. Blockchain Specific
              </p>
              <li>
                <p>
                  <span>Block</span> — A collection of data records grouped together
                </p>
              </li>
              <li>
                <p>
                  <span>Consensus Mechanism</span> — The method used to validate transactions and secure a blockchain
                  (e.g., Proof-of-Work, Proof-of-Stake)
                </p>
              </li>
              <li>
                <p>
                  <span>Distributed Ledger Technology (DLT)</span> — A digital system for recording transactions in
                  which the data is recorded in multiple places at the same time
                </p>
              </li>
              <li>
                <p>
                  <span>Fork</span> — A change to the blockchain's protocol that can result in two versions of the
                  blockchain
                </p>
              </li>
              <li>
                <p>
                  <span>Hash</span> — A unique digital fingerprint of a block of data
                </p>
              </li>
              <li>
                <p>
                  <span>Node</span> — A computer connected to the blockchain network that maintains a copy of the
                  blockchain
                </p>
              </li>
              <li>
                <p>
                  <span>Smart Contract</span> — Self-executing contracts with the terms of the agreement directly
                  written into code
                </p>
              </li>
              <p
                className="resources__info-blocks__glossary__main--preview--expanded__group"
                id="cryptocurrency_specific"
              >
                B. Cryptocurrency Specific
              </p>
              <li>
                <p>
                  <span>Altcoin</span> — Any cryptocurrency other than Bitcoin
                </p>
              </li>
              <li>
                <p>
                  <span>Exchange</span> — A platform where cryptocurrencies are bought and sold
                </p>
              </li>
              <li>
                <p>
                  <span>Fiat Currency</span> — Government-issued currency (e.g., USD, EUR, GBP)
                </p>
              </li>
              <li>
                <p>
                  <span>Gas</span> — A fee required to conduct a transaction on the Ethereum blockchain
                </p>
              </li>
              <li>
                <p>
                  <span>Hard Cap</span> — The maximum amount of cryptocurrency that will ever exist for a specific
                  project
                </p>
              </li>
              <li>
                <p>
                  <span>Liquidity</span> — The ease with which a cryptocurrency can be bought or sold without affecting
                  its price
                </p>
              </li>
              <li>
                <p>
                  <span>Market Capitalisation</span> — The total value of all coins in circulation for a cryptocurrency
                </p>
              </li>
              <li>
                <p>
                  <span>Token</span> — A digital asset that can represent various things on a blockchain
                </p>
              </li>
              <p className="resources__info-blocks__glossary__main--preview--expanded__group" id="cbdc_specific">
                C. CBDC Specific
              </p>
              <li>
                <p>
                  <span>Central Bank</span> — The institution that manages a country's currency and monetary policy
                  (e.g., Bank of England)
                </p>
              </li>
              <li>
                <p>
                  <span>Digital Pound</span> — The potential UK version of a Central Bank Digital Currency
                </p>
              </li>
              <li>
                <p>
                  <span>Financial Inclusion</span> — Providing access to financial services for individuals and
                  businesses
                </p>
              </li>
              <li>
                <p>
                  <span>Monetary Policy</span> — Actions taken by a central bank to manage the money supply and interest
                  rates
                </p>
              </li>
              <p className="resources__info-blocks__glossary__main--preview--expanded__group" id="important_terms">
                D. Important Terms
              </p>
              <li>
                <p>
                  <span>Adoption</span> — The rate at which a technology or currency becomes accepted and used
                </p>
              </li>
              <li>
                <p>
                  <span>Algorithm</span> — A set of rules to be followed in calculations or other problem-solving
                  operations
                </p>
              </li>
              <li>
                <p>
                  <span>Asset</span> — Something that has value
                </p>
              </li>
              <li>
                <p>
                  <span>Audit Trail</span> — A record that tracks a transaction from beginning to end
                </p>
              </li>
              <li>
                <p>
                  <span>Bear Market</span> — A market in which prices are falling
                </p>
              </li>
              <li>
                <p>
                  <span>Bull Market</span> — A market in which prices are rising
                </p>
              </li>
              <li>
                <p>
                  <span>Decentralised Applications (dApps)</span> — Applications that run on a decentralised network
                </p>
              </li>
              <li>
                <p>
                  <span>Inflation</span> — A general increase in prices and fall in the purchasing value of money
                </p>
              </li>
              <li>
                <p>
                  <span>Regulation</span> — Rules and laws governing a particular activity
                </p>
              </li>
              <li>
                <p>
                  <span>Scalability</span> — The ability of a system to handle increasing amounts of work or to be
                  easily expanded
                </p>
              </li>
              <li>
                <p>
                  <span>Security</span> — Measures taken to protect a system or data from unauthorised access or damage
                </p>
              </li>
              <li>
                <p>
                  <span>Volatility</span> — The degree to which the price of an asset changes over time
                </p>
              </li>
            </ul>
            <hr className="resources__info-blocks__glossary__main__hr" />
          </div>
          <div className="resources__info-blocks__glossary__footer">
            <p>
              Feel free to pop back to the glossary whenever you encounter unfamiliar terms in your learning journey.
              We're always here to help clarify things!
            </p>
            <button onClick={handleIsOpen}>Close Glossary</button>
          </div>
        </div>
      ) : (
        <div className="resources__info-blocks__glossary">
          <div className="resources__info-blocks__glossary--shadowed"></div>
          <div className="resources__info-blocks__glossary__header">
            <h2>Demystifying the Tech: Your Comprehensive Glossary</h2>
          </div>
          <div className="resources__info-blocks__glossary__main">
            <h3>Find the Definitions You Need</h3>
            <ul className="resources__info-blocks__glossary__main--preview">
              <h4>Core Jargon from Educational Texts</h4>
              <li>
                <p>
                  <span>Blockchain</span> — A digital ledger duplicated across many computers, making it difficult to
                  change or delete data
                </p>
              </li>
              <li>
                <p>
                  <span>Central Bank Digital Currency (CBDC)</span> — A digital form of a country's national currency,
                  issued by the central bank
                </p>
              </li>
              <li>
                <p>
                  <span>Cryptography</span> — The art of writing or solving codes
                </p>
              </li>
            </ul>
          </div>
        </div>
      )}
    </>
  );
};

export default Glossary;
