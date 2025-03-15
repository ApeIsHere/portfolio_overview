import { useMemo } from "react";
import { Asset } from "../../types";
import TopAssetItem from "../TopAssetItem/TopAssetItem";
import "./TopAssets.scss";

interface TopAssetsProps {
  myAssets: Asset[];
}

const TopAssets: React.FC<TopAssetsProps> = ({ myAssets }) => {
  const cardColors = ["#e5def0", "#d6edda", "#f5f0d8"];
  const topAssets = useMemo(() => {
    return [...myAssets]
      .sort((a, b) => b.price * (b.amount || 0) - a.price * (a.amount || 0))
      .slice(0, 3);
  }, [myAssets]);

  return (
    <div className="top-assets">
      <h2>Top Assets</h2>
      <div className="assets-grid">
        {topAssets.length === 0 ? (
          <p>No assets found. Add your first asset.</p>
        ) : (
          <>
            {topAssets.map((asset, index) => (
              <TopAssetItem asset={asset} cardColor={cardColors[index]} />
            ))}
          </>
        )}
      </div>
    </div>
  );
};

export default TopAssets;
