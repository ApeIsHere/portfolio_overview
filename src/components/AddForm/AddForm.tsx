import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addAsset } from "../../features/portfolio/portfolioSlice";
import { Asset, fakeAssets } from "../../types";

interface AddFormProps {
  onClose: () => void;
}

const AddForm: React.FC<AddFormProps> = ({ onClose }) => {
  const dispatch = useDispatch<AppDispatch>();
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

  const filteredAssets = fakeAssets.filter((asset) =>
    asset.name.toLowerCase().includes(searchInput.toLocaleLowerCase())
  );

  return (
    <div className="add-form" onSubmit={handleSubmit}>
      <h2>Add Asset</h2>
      <div className="search-container">
        <input
          className="search-input"
          type="text"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
          placeholder="Search assets..."
        ></input>
      </div>
      <ul className="asset-list">
        {filteredAssets.map((asset) => (
          <li
            key={asset.id}
            className="asset-item"
            onClick={() => setSelectedAsset(asset)}
            style={{
              background: selectedAsset?.id === asset.id ? "#333" : "transparent",
            }}
          >
            <span className="asset-icon">{asset.icon}</span>
            <span className="asset-name">{asset.name}</span>
            <span className="asset-price">${asset.price.toFixed(2)}</span>
          </li>
        ))}
      </ul>
      {selectedAsset && (
        <div className="amount-input">
          <label htmlFor="amount">Amount:</label>
          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="1"
            step="1"
          ></input>
        </div>
      )}
      <div className="form-actions">
        <button type="button" onClick={onClose} className="close-button">
          Close
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="add-button"
          disabled={!selectedAsset || !amount}
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddForm;
