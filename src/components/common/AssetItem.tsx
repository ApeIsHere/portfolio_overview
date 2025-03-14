import { Asset } from "../../types";
import "./AssetItem.scss";

interface AssetItemProps {
  asset: Asset;
  onClick?: () => void;
  selected?: boolean;
}

const AssetItem: React.FC<AssetItemProps> = ({ asset, onClick, selected }) => {
  return (
    <div className={`asset-item ${selected ? "selected" : ""}`} onClick={onClick}>
      <span className="asset-icon">{asset.icon || "⭐"}</span>
      <span className="asset-icon">{asset.name}</span>
      <span className="asset-icon">${asset.price.toFixed(2)}</span>
      {asset.change24h !== undefined && (
        <span className={`asset-change ${asset.change24h >= 0 ? "up" : "down"}`}>
          {asset.change24h >= 0 ? "▲" : "▼"} {asset.change24h.toFixed(2)}%
        </span>
      )}
      {asset.amount && <span className="asset-amount">{asset.amount} units</span>}
    </div>
  );
};

export default AssetItem;
