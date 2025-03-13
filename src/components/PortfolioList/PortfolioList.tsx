import { useSelector } from "react-redux";
import { RootState } from "../../store";
import AssetItem from "../common/AssetItem";

const PortfolioList: React.FC = () => {
  const assets = useSelector((state: RootState) => state.portfolio.assets);

  return (
    <div className="portfolio-list">
      <h2>Portfolio</h2>
      {assets.length === 0 ? (
        <p>No assets found. Add your first asset with "Add Asset" button</p>
      ) : (
        <div className="asset-list">
          {assets.map((asset) => (
            <AssetItem key={asset.id} asset={asset} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
