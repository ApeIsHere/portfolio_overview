import { useSelector } from "react-redux";
import { RootState } from "../../store";

const PortfolioList: React.FC = () => {
  const assets = useSelector((state: RootState) => state.portfolio.assets);

  return (
    <div className="portfolio-list">
      <h2>Portfolio</h2>
      {assets.length === 0 ? (
        <p>No assets found. Add your first asset with "Add Asset" button</p>
      ) : (
        <ul className="asset-list">
          {assets.map((asset) => (
            <li key={asset.id} className="asset-item">
              <span className="asset-icon">{asset.icon || "🔶"}</span>
              <span className="asset-name">{asset.name}</span>
              <span className="asset-amount">{asset.amount} units</span>
              <span className="asset-price">${asset.price.toFixed(2)}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PortfolioList;
