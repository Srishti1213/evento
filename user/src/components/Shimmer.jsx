import "./Shimmer.css";

const Shimmer = () => {
  return (
    <div>
      {[...Array(5)].map((_, i) => (
        <div key={i} className="shimmer-card">
          <div className="shimmer"></div>
          <div className="shimmer"></div>
          <div className="shimmer"></div>
        </div>
      ))}
    </div>
  );
};

export default Shimmer;