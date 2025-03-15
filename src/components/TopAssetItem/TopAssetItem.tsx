import { Asset } from "../../types";
import "./TopAssetItem.scss";

interface TopAssetItemProps {
  asset: Asset;
  cardColor: string;
}

const TopAssetItem: React.FC<TopAssetItemProps> = ({ asset, cardColor }) => {
  return (
    <div className="top-asset-item" style={{ backgroundColor: cardColor }}>
      <div className="asset-icon">{asset.icon}</div>
      <div className="asset-details">
        <span className="asset-amount">
          {(asset.amount || 0).toFixed(3)} {asset.name}
        </span>
        <span className="asset-value">
          {`$${(asset.price * (asset.amount || 0)).toFixed(2)}`}
        </span>
        <span className="asset-change">
          {asset.change24h && asset.change24h >= 0 ? "+" : "-"}{" "}
          {asset.change24h && Math.abs(asset.change24h).toFixed(2)}%
        </span>
      </div>
    </div>
  );
};

export default TopAssetItem;
