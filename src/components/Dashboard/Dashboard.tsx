import PortfolioRing from "../PortfolioRing/PortfolioRing";
import TopAssets from "../TopAssets/TopAssets";
import PortfolioList from "../PortfolioList/PortfolioList";
import Analytics from "../Analytics/Analytics";
import "./Dashboard.scss";
import { useSelector } from "react-redux";
import { RootState } from "../../store";

const Dashboard: React.FC = () => {
  const myAssets = useSelector((state: RootState) => state.portfolio.myAssets);

  return (
    <div className="dashboard">
      <PortfolioRing myAssets={myAssets} />
      <TopAssets myAssets={myAssets} />
      <PortfolioList />
      <Analytics />
    </div>
  );
};

export default Dashboard;
