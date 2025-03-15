import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Asset } from "../../types";
import { PIE_CHART_COLORS } from "../../constants/appConstants";
import "./PortfolioPieChart.scss";

interface PortfolioPieChartProps {
  myAssets: Asset[];
}

interface PieChartData {
  name: string;
  value: number;
  color: string;
}

// Prepare the data for piechart
function prepareData(myAssets: Asset[], totalValue: number): PieChartData[] {
  const data = myAssets.map((asset, index) => {
    const assetValue: number = asset.price * (asset.amount || 0);
    const percentage: number = (assetValue / totalValue) * 100;
    return {
      name: asset.name,
      value: percentage,
      color: PIE_CHART_COLORS[index % PIE_CHART_COLORS.length], // Picking a color within the color array
    };
  });

  return data;
}

const PortfolioPieChart: React.FC<PortfolioPieChartProps> = ({ myAssets }) => {
  // Total value of all assets in the portfolio
  const totalValue = myAssets.reduce(
    (total, asset) => total + asset.price * (asset.amount || 0),
    0
  );

  const data = prepareData(myAssets, totalValue);

  return (
    <div className="portfolio-pie-chart">
      <h2>Portfolio</h2>
      <div className="chart-container">
        {data.length > 0 ? (
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie
                data={data}
                dataKey="value"
                nameKey="name"
                innerRadius={75}
                outerRadius={100}
                cx="50%"
                cy="50%"
                paddingAngle={3}
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} stroke={entry.color} />
                ))}
              </Pie>
              <Tooltip
                formatter={(value: number) => `${value.toFixed(2)}%`}
                contentStyle={{
                  backgroundColor: "var(--card-background)",
                  borderRadius: "4px",
                }}
              />
              <Legend
                verticalAlign="middle"
                align="right"
                width={200}
                layout="vertical"
                iconSize={15}
                iconType="circle"
              />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <p>No assets to display</p>
        )}
        <div className="total-value">Total Value: ${totalValue.toFixed(2)}</div>
      </div>
    </div>
  );
};

export default PortfolioPieChart;
