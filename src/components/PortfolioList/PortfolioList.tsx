import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../store";
import { removeAsset } from "../../features/portfolio/portfolioSlice";
import { useState } from "react";
import { Asset } from "../../types";
import AssetItem from "../common/AssetItem";
import Button from "../common/Button";
import Modal from "../Modal/Modal";
import { AutoSizer, List } from "react-virtualized";
import {
  ROW_HEIGHT,
  MYASSET_LIST_HEIGHT,
  OVERSCAN_ROW_COUNT,
} from "../../constants/appConstants";

const PortfolioList: React.FC = () => {
  const myAssets = useSelector((state: RootState) => state.portfolio.myAssets);
  const dispatch = useDispatch<AppDispatch>();
  const [isConfirmOpen, setIsConfirmOpen] = useState<boolean>(false);
  const [assetToRemove, setAssetToRemove] = useState<Asset | null>(null);

  //Logic to remove asset with Modal window
  const handleRemove = (id: string) => {
    dispatch(removeAsset(id));
    setIsConfirmOpen(false);
    setAssetToRemove(null);
  };
  const openConfirmModal = (asset: Asset) => {
    setAssetToRemove(asset);
    setIsConfirmOpen(true);
  };

  // Function to render visible rows with react-virtualized
  const rowRenderer = ({
    index,
    key,
    style,
  }: {
    index: number;
    key: string;
    style: React.CSSProperties;
  }) => {
    const asset = myAssets[index];
    return (
      <div key={key} style={style}>
        <AssetItem asset={asset} onRemove={openConfirmModal} />
      </div>
    );
  };

  return (
    <div className="portfolio-list">
      <h2>My Assets</h2>
      {myAssets.length === 0 ? (
        <p>No assets found. Add your first asset with "Add Asset" button</p>
      ) : (
        <div className="asset-list" style={{ height: MYASSET_LIST_HEIGHT }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={myAssets.length}
                rowHeight={ROW_HEIGHT}
                rowRenderer={rowRenderer}
                overscanRowCount={OVERSCAN_ROW_COUNT}
              />
            )}
          </AutoSizer>
        </div>
      )}

      <Modal isOpen={isConfirmOpen} onClose={() => setIsConfirmOpen(false)}>
        <h3 style={{ textAlign: "center" }}>{`Remove ${
          assetToRemove ? assetToRemove.name : "asset"
        }`}</h3>
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
