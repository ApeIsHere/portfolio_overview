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

  // Colors for the top 3 coins
  const colors = [
    { cardColor: "var(--card-top1)", iconColor: "var(--icon-top1)" },
    { cardColor: "var(--card-top2)", iconColor: "var(--icon-top2)" },
    { cardColor: "var(--card-top3)", iconColor: "var(--icon-top3)" },
  ];

  return (
    <div className="top-assets">
      <h2>Your Assets</h2>
      <div className="assets-grid">
        {topAssets.length === 0 ? (
          <p>No assets found. Add your first asset.</p>
        ) : (
          topAssets.map((asset, index) => {
            const { cardColor, iconColor } = colors[index] || colors[0];
            return (
              <TopAssetItem
                key={asset.id}
                asset={asset}
                cardColor={cardColor}
                iconColor={iconColor}
              />
            );
          })
        )}
      </div>
    </div>
  );
};

export default TopAssets;
