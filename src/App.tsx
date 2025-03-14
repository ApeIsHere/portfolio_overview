import { useState } from "react";
import useWebSocket from "./hooks/useWebsocket";
import AddForm from "./components/AddForm/AddForm";
import Modal from "./components/Modal/Modal";
import Button from "./components/common/Button";
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  useWebSocket();

  return (
    <div className="app">
      <div className="tablet-container">
        <div className="add-button-container">
          <Button variant="primary" onClick={() => setIsModalOpen(true)}>
            Add Asset
          </Button>
        </div>
        <Dashboard />
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <AddForm onClose={() => setIsModalOpen(false)} />
      </Modal>
    </div>
  );
}

export default App;
