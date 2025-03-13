import AddForm from "./components/AddForm/AddForm";
import PortfolioList from "./components/PortfolioList/PortfolioList";

function App() {
  return (
    <div className="app">
      <h1>Portfolio Overview</h1>
      <AddForm />
      <PortfolioList />
    </div>
  );
}

export default App;
