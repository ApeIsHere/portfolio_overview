import { useDispatch } from "react-redux";
import { AppDispatch } from "../../store";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { addAsset } from "../../features/portfolio/portfolioSlice";

const AddForm: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && amount) {
      const newAsset = {
        id: uuidv4(),
        name,
        amount: parseFloat(amount),
        price: 0,
      };
      dispatch(addAsset(newAsset));
      setName("");
      setAmount("");
    }
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h2>Add Asset</h2>
      <div>
        <label htmlFor="name">Asset Name:</label>
        <input
          id="name"
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Bitcoin"
        ></input>
      </div>
      <div>
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
      <button type="submit">Add</button>
    </form>
  );
};

export default AddForm;
