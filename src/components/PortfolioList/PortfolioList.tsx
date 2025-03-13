import { useSelector } from "react-redux";
import { RootState } from "../../store";

const PortfolioList: React.FC = () => {
  const assets = useSelector((state: RootState) => state.portfolio.assets);

  return (
    <div className="portfolio-list">
      <h2>Portfolio</h2>
      {assets.length === 0 ? (
        <p>Нет активов в вашем портфеле. Добавьте что-нибудь, чтобы начать!</p>
      ) : (
        <ul>
          {assets.map((asset) => (
            <li key={asset.id}>
              {asset.name} - {asset.amount} - ${asset.price}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PortfolioList;
