import { useMemo } from "react";
import { Asset } from "../../types";
import TopAssetItem from "../TopAssetItem/TopAssetItem";
import "./TopAssets.scss";

interface TopAssetsProps {
  myAssets: Asset[];
}

const TopAssets: React.FC<TopAssetsProps> = ({ myAssets }) => {
  const topAssets = useMemo(() => {
    return [...myAssets]
      .sort((a, b) => b.price * (b.amount || 0) - a.price * (a.amount || 0))
      .slice(0, 3);
  }, [myAssets]);

  return (
    <div className="top-assets">
      <h2>Your Assets</h2>
      <div className="assets-grid">
        {topAssets.length === 0 ? (
          <p>No assets found. Add your first asset.</p>
        ) : (
          <>
            <TopAssetItem asset={topAssets[0]} cardColor="#e5def0" />
            <TopAssetItem asset={topAssets[1]} cardColor="#d6edda" />
            <TopAssetItem asset={topAssets[2]} cardColor="#f5f0d8" />
          </>
        )}
      </div>
    </div>
  );
};

export default TopAssets;
