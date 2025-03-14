import { Asset } from "../../types";
import "./PortfolioRing.scss";

interface PortfolioRingProps {
  myAssets: Asset[];
}

const PortfolioRing: React.FC<PortfolioRingProps> = ({ myAssets }) => {
  const totalValue = myAssets.reduce(
    (total, asset) => total + asset.price * (asset.amount || 0),
    0
  );

  return (
    <div className="portfolio-ring">
      <h2>Portfolio</h2>
      <div className="ring-placeholder">
        <p>{`Total Value: $${totalValue.toFixed(2)}`}</p>
        <p>Placeholder for ring chart</p>
      </div>
    </div>
  );
};

export default PortfolioRing;
