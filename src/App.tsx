import { useState } from "react";
import AddForm from "./components/AddForm/AddForm";
import PortfolioList from "./components/PortfolioList/PortfolioList";
import Modal from "./components/Modal/Modal";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  return (
    <div className="app">
      <h1>Portfolio Overview</h1>
      <button className="add-button" onClick={() => setIsModalOpen(true)}>
        Add Asset
      </button>
      <PortfolioList />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;
