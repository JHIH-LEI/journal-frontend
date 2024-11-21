import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Legend,
} from "recharts";

import { MoodMapping } from "@/constants/MoodMapping";
import { MoodName } from "@/gql/graphql";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";

const MonthlyMoodRadarChart = ({
  data,
}: {
  data: {
    month: string;
    moods: Array<{
      id: number;
      mood: MoodName;
      countInJournal: number;
      countInEvent: number;
    }>;
  };
}) => {
  const sortedMoodData = [...data.moods].sort(
    (a, b) =>
      b.countInJournal + b.countInEvent - (a.countInJournal + a.countInEvent)
  );

  return (
    <Card
      className={`${
        MoodMapping[sortedMoodData[0].mood].backgroundColor200
      } bg-opacity-40`}
    >
      <CardHeader>
        <CardTitle>{data.month} Mood Chart</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data.moods}>
              <PolarGrid />
              <PolarAngleAxis dataKey="mood" />
              <PolarRadiusAxis />
              <Radar
                name={`Journal`}
                dataKey="countInJournal"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
              <Radar
                name={`Event`}
                dataKey="countInEvent"
                stroke="#8884d8"
                fill="#8884d8"
                fillOpacity={0.6}
              />
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </div>
        <div className="mt-2">
          <Table className="table-auto">
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Mood Name</TableHead>
                <TableHead>Count By Journal</TableHead>
                <TableHead>Count By Event</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedMoodData.map((moodData) => (
                <TableRow>
                  <TableCell className="font-medium">{moodData.mood}</TableCell>
                  <TableCell>{moodData.countInJournal}</TableCell>
                  <TableCell>{moodData.countInEvent}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default MonthlyMoodRadarChart;
