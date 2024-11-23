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
// TODO: month轉成月字串
const MonthlyMoodRadarChart = ({
  data,
}: {
  data: {
    month: number;
    moods: Array<{
      moodId: number;
      moodName: MoodName;
      journalCount: number;
      eventCount: number;
    }>;
  };
}) => {
  const sortedMoodData = [...data.moods].sort(
    (a, b) => b.journalCount + b.eventCount - (a.journalCount + a.eventCount)
  );
  return (
    <Card
      className={`${
        sortedMoodData[0].journalCount === 0 &&
        sortedMoodData[0].eventCount === 0
          ? ""
          : MoodMapping[sortedMoodData[0].moodName].backgroundColor200
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
              <PolarAngleAxis dataKey="moodName" />
              <PolarRadiusAxis />
              <Radar
                name={`Journal`}
                dataKey="journalCount"
                stroke="#82ca9d"
                fill="#82ca9d"
                fillOpacity={0.6}
              />
              <Radar
                name={`Event`}
                dataKey="eventCount"
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
                <TableRow key={moodData.moodId}>
                  <TableCell className="font-medium">
                    {moodData.moodName}
                  </TableCell>
                  <TableCell>{moodData.journalCount}</TableCell>
                  <TableCell>{moodData.eventCount}</TableCell>
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
