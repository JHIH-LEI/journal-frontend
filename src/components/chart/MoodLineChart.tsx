import { MoodMapping } from "@/constants/MoodMapping";
import { MoodName } from "@/gql/graphql";
import {
  ResponsiveContainer,
  Line,
  Tooltip,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  LineChart,
} from "recharts";
type dataItem = {
  x: string;
} & Record<MoodName, number>;

const MoodLineChart = ({ data }: { data: dataItem[] }) => {
  const MoodKeyList = Object.values(MoodName);

  return (
    <ResponsiveContainer>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 0, bottom: 0 }}>
        <XAxis dataKey="x" />
        <YAxis />
        <Legend
          verticalAlign="bottom"
          align="center"
          wrapperStyle={{
            fontWeight: "700",
            fontSize: "0.875rem",
            lineHeight: "1.25rem",
          }}
        />
        {MoodKeyList.map((moodName) => (
          <Line
            key={moodName}
            type="monotone"
            dataKey={moodName}
            fillOpacity={0.5}
            fill={MoodMapping[moodName].chartFillColor}
            stroke={MoodMapping[moodName].chartFillColor}
          />
        ))}
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
      </LineChart>
    </ResponsiveContainer>
  );
};
export default MoodLineChart;
