import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { AutoSizer, List } from "react-virtualized";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch, RootState } from "../../store";
import { Asset } from "../../types";
import { addAsset } from "../../features/portfolio/portfolioSlice";
import AssetItem from "../common/AssetItem";
import Button from "../common/Button";
import Input from "../common/Input";
import {
  ADD_FORM_LIST_HEIGHT,
  ROW_HEIGHT,
  OVERSCAN_ROW_COUNT,
} from "../../constants/appConstants";

interface AddFormProps {
  onClose: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
  const marketAsset = useSelector((state: RootState) => state.portfolio.marketAssets);
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);
  const [amount, setAmount] = useState("");
  const [searchInput, setSearchInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedAsset && amount) {
      const newAsset = {
        ...selectedAsset,
        id: uuidv4(),
        amount: parseFloat(amount),
      };
      dispatch(addAsset(newAsset));
      // Clear inputs
      setSelectedAsset(null);
      setAmount("");
      // Close the modal
      onClose();
    }
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
    const asset = filteredAssets[index];
    return (
      <div key={key} style={style}>
        <AssetItem
          asset={asset}
          onClick={() => setSelectedAsset(asset)}
          selected={selectedAsset?.id === asset.id}
        />
      </div>
    );
  };

  const filteredAssets = marketAsset.filter((asset) =>
    asset.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
  );

  return (
    <div className="add-form" onSubmit={handleSubmit}>
      <h2>Add Asset</h2>
      <div className="search-container">
        <Input
          variant="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search assets..."
        />
        <div className="asset-list" style={{ height: ADD_FORM_LIST_HEIGHT }}>
          <AutoSizer>
            {({ height, width }) => (
              <List
                width={width}
                height={height}
                rowCount={filteredAssets.length}
                rowHeight={ROW_HEIGHT}
                rowRenderer={rowRenderer}
                overscanRowCount={OVERSCAN_ROW_COUNT}
              />
            )}
          </AutoSizer>
        </div>
      </div>
      {selectedAsset && (
        <>
          <div className="amount-input">
            <label htmlFor="amount">Amount:</label>
            <Input
              variant="primary"
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.5"
            ></Input>
          </div>
          <div className="form-actions">
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
            <Button
              variant="primary"
              onClick={handleSubmit}
              disabled={!selectedAsset || !amount}
            >
              Add
            </Button>
          </div>
        </>
      )}
    </div>
  );
};

export default AddForm;
