import { useState } from "react";
import AddForm from "./components/AddForm/AddForm";
import PortfolioList from "./components/PortfolioList/PortfolioList";
import Modal from "./components/Modal/Modal";
import Button from "./components/common/Button";
import useWebSocket from "./hooks/useWebsocket";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useWebSocket();

  return (
    <div className="app">
      <h1>Portfolio Overview</h1>
      <Button variant="primary" onClick={() => setIsModalOpen(true)}>
        Add Asset
      </Button>
      <PortfolioList />

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;
