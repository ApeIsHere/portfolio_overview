import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import AssetItem from "../common/AssetItem";
import { removeAsset } from "../../features/portfolio/portfolioSlice";

const PortfolioList: React.FC = () => {
  const assets = useSelector((state: RootState) => state.portfolio.myAssets);
  const dispatch = useDispatch<AppDispatch>();

  const handleRemove = (id: string) => {
    dispatch(removeAsset(id));
  };

  return (
    <div className="portfolio-list">
      <h2>Portfolio</h2>
      {assets.length === 0 ? (
        <p>No assets found. Add your first asset with "Add Asset" button</p>
      ) : (
        <div className="asset-list">
          {assets.map((asset) => (
            <AssetItem key={asset.id} asset={asset} onRemove={handleRemove} />
          ))}
        </div>
      )}
    </div>
  );
};

export default PortfolioList;
