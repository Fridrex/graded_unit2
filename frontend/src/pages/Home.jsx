import { Link } from 'react-router';

const Home = () => {
  return (
    <>
      <div className="home">
        <div className="home__header">
          <h1>Demystifying Digital Currency: Your Journey into Blockchain Begins Here</h1>
          <p>From blockchain basics to crypto wallets - learn the future of money through hands-on experience</p>
        </div>
        <div className="home__info-cards">
          <h2>Why Learn?</h2>
          <div className="home__info-cards__card">
            <h3>Stay Ahead of Financial Innovation</h3>
            <p>
              The digital currency revolution is reshaping our financial landscape. Whether it's blockchain technology,
              cryptocurrencies, or Central Bank Digital Currencies (CBDCs), understanding these innovations is becoming
              essential. Get ahead of the curve and build your knowledge in this rapidly evolving field.
            </p>
          </div>
          <div className="home__info-cards__card">
            <h3>Learn by Doing</h3>
            <p>
              Theory meets practice in our interactive learning environment. Create your first simulated crypto wallet,
              understand blockchain transactions, and gain hands-on experience without any financial risk. Our practical
              approach makes complex concepts click.
            </p>
          </div>
          <div className="home__info-cards__card">
            <h3>Make Informed Decisions</h3>
            <p>
              From investment opportunities to potential scams, the world of digital currencies can be overwhelming.
              Gain the knowledge you need to navigate this space confidently. Understand the technology, recognise the
              risks, and make decisions based on solid understanding rather than hype.
            </p>
          </div>
        </div>
        <div className="home__buttons">
          <Link to="/learn">Learn</Link>
          <Link to="/about">About</Link>
        </div>
        <div className="home__explanation">
          <h2>How it Works</h2>
          <div className="home__explanation__blocks">
            <div className="home__explanation__blocks__block">
              <img src="src/assets/images/Object.png" alt="Digital brain" />
              <h3>Start Learning</h3>
              <p>
                Begin your journey with clear, jargon-free explanations of blockchain technology and digital currencies.
              </p>
            </div>
            <div className="home__explanation__blocks__block">
              <img src="src/assets/images/chain.png" alt="A chain of blocks" />
              <h3>Understand Basics</h3>
              <p>Progress through interactive lessons that break down complex concepts into digestible pieces.</p>
            </div>
            <div className="home__explanation__blocks__block">
              <img src="src/assets/images/wallet.png" alt="Wallet" />
              <h3>Try It Out</h3>
              <p>Put your knowledge into practice with our safe, simulated wallet environment.</p>
            </div>
            <div className="home__explanation__blocks__block">
              <img src="src/assets/images/trophy.png" alt="Trophy" />
              <h3>Test Knowledge</h3>
              <p>Reinforce your learning through quizzes and practical exercises at your own pace.</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
