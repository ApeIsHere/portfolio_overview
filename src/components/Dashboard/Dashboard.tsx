import { useSelector } from "react-redux";
import { RootState } from "../../store";
import TopAssets from "../TopAssets/TopAssets";
import PortfolioList from "../PortfolioList/PortfolioList";
import PortfolioPieChart from "../PortfolioPieChart/PortfolioPieChart";
import "./Dashboard.scss";

const Dashboard: React.FC = () => {
  const myAssets = useSelector((state: RootState) => state.portfolio.myAssets);

  return (
    <div className="dashboard">
      <PortfolioPieChart myAssets={myAssets} />
      <TopAssets myAssets={myAssets} />
      <PortfolioList />
    </div>
  );
};

export default Dashboard;
