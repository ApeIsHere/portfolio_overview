import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { removeAsset } from "../../features/portfolio/portfolioSlice";
import { useState } from "react";
import { Asset } from "../../types";
import AssetItem from "../common/AssetItem";
import Button from "../common/Button";
import Modal from "../Modal/Modal";

const PortfolioList: React.FC = () => {
  const assets = useSelector((state: RootState) => state.portfolio.myAssets);
  const dispatch = useDispatch<AppDispatch>();
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [assetToRemove, setAssetToRemove] = useState<Asset | null>(null);

  const handleRemove = (id: string) => {
    dispatch(removeAsset(id));
    setIsConfirmOpen(false);
    setAssetToRemove(null);
  };

  const openConfirmModal = (asset: Asset) => {
    setAssetToRemove(asset);
    setIsConfirmOpen(true);
  };

  return (
    <div className="portfolio-list">
      <h2>Portfolio</h2>
      {assets.length === 0 ? (
        <p>No assets found. Add your first asset with "Add Asset" button</p>
      ) : (
        <div className="asset-list">
          {assets.map((asset) => (
            <AssetItem key={asset.id} asset={asset} onRemove={openConfirmModal} />
          ))}
        </div>
      )}

      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <h3 style={{ textAlign: "center" }}>{`Remove ${
          assetToRemove ? assetToRemove.name : "asset"
        } ?`}</h3>
        <p>
          Are you sure you want to remove {assetToRemove && assetToRemove.name} from your
          portfolio?
        </p>
        <div className="confirm-actions">
          <Button variant="secondary" onClick={() => setIsConfirmOpen(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={() => assetToRemove && handleRemove(assetToRemove.id)}
          >
            Remove
          </Button>
        </div>
      </Modal>
    </div>
  );
};

export default PortfolioList;
