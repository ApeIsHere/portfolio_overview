import { Asset } from "../../types";
import "./AssetItem.scss";

interface AssetItemProps {
  asset: Asset;
  onClick?: () => void;
  onRemove?: (asset: Asset) => void;
  selected?: boolean;
}

const AssetItem: React.FC<AssetItemProps> = ({ asset, onClick, onRemove, selected }) => {
  const handleClick = () => {
    if (onRemove) {
      onRemove(asset);
    } else if (onClick) {
      onClick();
    }
  };

  const totalValue = asset.amount ? (asset.amount * asset.price).toFixed(2) : 0;
  const marketPrice = asset.price.toFixed(2);

  return (
    <div className={`asset-item ${selected ? "selected" : ""}`} onClick={handleClick}>
      <div className="asset-info">
        <span className="asset-icon">{asset.icon || "⭐"}</span>
        <span className="asset-name">
          {asset.amount && <span className="asset-amount">{asset.amount} </span>}
          {asset.name}
        </span>
      </div>
      <span className="asset-total-value">${totalValue}</span>
      <span className="asset-price">${marketPrice}</span>
      {asset.change24h !== undefined && (
        <span
          className={`asset-change ${asset.change24h >= 0 ? "positive" : "negative"}`}
        >
          {asset.change24h >= 0 ? "▲" : "▼"} {Math.abs(asset.change24h).toFixed(2)}%
        </span>
      )}
    </div>
  );
};

export default AssetItem;
