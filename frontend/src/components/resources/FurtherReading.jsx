import { HashLink as Link } from 'react-router-hash-link';
import { motion, AnimatePresence } from 'motion/react';
import { pageTransition, pageVariants } from '../../utils/utils';

const FurtherReading = ({ isOpen, handleIsOpen }) => {
  return (
    <>
      <AnimatePresence initial={false}>
        {isOpen ? (
          <motion.div
            className="resources__info-blocks__further-reading"
            key="further-reading-content"
            initial="initial"
            animate="in"
            exit="out"
            variants={pageVariants}
            transition={pageTransition}
            style={{ overflow: 'hidden' }}
          >
            <div className="resources__info-blocks__further-reading__header">
              <h2>Dive Deeper: Expanding Your Blockchain Expertise</h2>
            </div>
            <div className="resources__info-blocks__further-reading__main">
              <h3>Explore these curated resources to enhance your understanding of blockchain technology</h3>
              <ul className="resources__info-blocks__further-reading__main__navigation">
                <li>
                  <Link to="#articles_fr">Articles</Link>
                </li>
                <li>
                  <Link to="#videos_fr">Videos</Link>
                </li>
              </ul>
              <ul className="resources__info-blocks__further-reading__main">
                <h4 id="articles_fr">Articles</h4>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    Fantastic article from IBM on Blockchain
                  </p>
                  <Link to="https://www.ibm.com/think/topics/blockchain" target="_blank">
                    Read Full Article
                  </Link>
                </li>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    Blockchain explained by Investopedia
                  </p>
                  <Link to="https://www.investopedia.com/terms/b/blockchain.asp" target="_blank">
                    Read Full Article
                  </Link>
                </li>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    Detailed explanation on Blockchain from Amazon’s AWS
                  </p>
                  <Link
                    to="https://aws.amazon.com/what-is/blockchain/?aws-products-all.sort-by=item.additionalFields.productNameLowercase&aws-products-all.sort-order=asc"
                    target="_blank"
                  >
                    Read Full Article
                  </Link>
                </li>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">Cryptocurrency explained</p>
                  <Link
                    to="https://www.kaspersky.com/resource-center/definitions/what-is-cryptocurrency"
                    target="_blank"
                  >
                    Read Full Article
                  </Link>
                </li>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">Explanation of CBDC from EDPS</p>
                  <Link
                    to="https://www.edps.europa.eu/press-publications/publications/techsonar/central-bank-digital-currency_en#:~:text=Central%20Bank%20Digital%20Currency%20(CBDC,transactions%20and%20transfers%20become%20simple"
                    target="_blank"
                  >
                    Read Full Article
                  </Link>
                </li>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    A detailed explanation of crypto wallets by Investopedia
                  </p>
                  <Link to="https://www.investopedia.com/terms/b/bitcoin-wallet.asp" target="_blank">
                    Read Full Article
                  </Link>
                </li>
                <hr className="resources__info-blocks__further-reading__main__hr" />
                <h4 id="videos_fr">Videos</h4>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    Great video that explains blockchain in 7 minutes
                  </p>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube-nocookie.com/embed/yubzJw0uiE4?si=S4XzJ5icAi9AdYb5"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </li>
                <li>
                  <p className="resources__info-blocks__further-reading__main__header">
                    Another great video on cryptocurrency
                  </p>
                  <iframe
                    width="560"
                    height="315"
                    src="https://www.youtube-nocookie.com/embed/1YyAzVmP9xQ?si=-QMA9eROv0xTf_0O"
                    title="YouTube video player"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    referrerpolicy="strict-origin-when-cross-origin"
                    allowfullscreen
                  ></iframe>
                </li>
              </ul>
            </div>
            <hr className="resources__info-blocks__further-reading__main__hr" />
            <div className="resources__info-blocks__further-reading__footer">
              <p>
                These additional materials offer a wealth of information for those eager to learn more. Enjoy the
                journey!
              </p>
              <button onClick={handleIsOpen}>Close Further Reading</button>
            </div>
          </motion.div>
        ) : (
          <div className="resources__info-blocks__further-reading">
            <div className="resources__info-blocks__further-reading--shadowed"></div>
            <div className="resources__info-blocks__further-reading__header">
              <h2>Dive Deeper: Expanding Your Blockchain Expertise</h2>
            </div>
            <div className="resources__info-blocks__further-reading__main">
              <h3>Explore these curated resources to enhance your understanding of blockchain technology</h3>
              <ul className="resources__info-blocks__further-reading__main--preview">
                <h4 id="articles_fr">Articles</h4>
                <li>
                  <p className="resources__info-blocks__faq__main__question">
                    Fantastic article from IBM on Blockchain
                  </p>
                  <Link to="https://www.ibm.com/think/topics/blockchain" target="_blank">
                    Read Article
                  </Link>
                </li>
                <li>
                  <p className="resources__info-blocks__faq__main__question">Blockchain explained by Investopedia</p>
                  <Link to="https://www.investopedia.com/terms/b/blockchain.asp" target="_blank">
                    Read Article
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FurtherReading;
