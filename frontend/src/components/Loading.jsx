import { CircleLoader } from 'react-spinners';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-spinner">
        <div className="spinner">
          <CircleLoader color="#ffd700" size={200} speedMultiplier={1.5} />
        </div>
      </div>
      <h1>Loading...</h1>
      <p>Please wait while we load the content for you.</p>
    </div>
  );
};

export default Loading;
