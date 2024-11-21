import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
} from "@/components/ui/select";
import { format } from "date-fns";
import { PieChartIcon, Zap } from "lucide-react";
import { useState } from "react";
import MonthlyMoodRadarChart from "../../components/chart/MonthlyMoodRadarChart";
import { Link } from "react-router-dom";
import { MoodName } from "@/gql/graphql";
import MoodLineChart from "@/components/chart/MoodLineChart";
const summaryData = {
  totalEvents: 365,
  totalJournals: 280,
  tagJournalCount: [
    {
      id: 1,
      tagName: "red flag",
      count: 21,
      color: "#e78b8bFF",
    },
    {
      id: 2,
      tagName: "english exchange",
      count: 3,
      color: "#4fea7b",
    },
    {
      id: 3,
      tagName: "tech meetup",
      count: 3,
      color: "#58a0ff",
    },
    {
      id: 2,
      tagName: "sport",
      count: 3,
      color: "#d54fea",
    },
    {
      id: 2,
      tagName: "self-care",
      count: 3,
      color: "#ff8630",
    },
  ],
  journalMoodDistribution: [
    {
      month: "1",
      [MoodName["Happy"]]: 220,
      [MoodName["Anger"]]: 12,
      [MoodName["Love"]]: 6,
      [MoodName["Neutral"]]: 0,
      [MoodName["Anxiety"]]: 21,
      [MoodName["Sadness"]]: 33,
    },
    {
      month: "2",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 12,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 12,
      [MoodName["Sadness"]]: 5,
    },
    {
      month: "3",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 12,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 12,
      [MoodName["Sadness"]]: 5,
    },
    {
      month: "4",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 12,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 12,
      [MoodName["Sadness"]]: 5,
    },
    {
      month: "5",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 12,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 12,
      [MoodName["Sadness"]]: 5,
    },
    {
      month: "6",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 12,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 12,
      [MoodName["Sadness"]]: 5,
    },
    {
      month: "7",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 12,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 12,
      [MoodName["Sadness"]]: 5,
    },
    {
      month: "8",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 12,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 12,
      [MoodName["Sadness"]]: 5,
    },
    {
      month: "9",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 12,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 12,
      [MoodName["Sadness"]]: 5,
    },
    {
      month: "10",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 12,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 12,
      [MoodName["Sadness"]]: 5,
    },
    {
      month: "11",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 12,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 12,
      [MoodName["Sadness"]]: 5,
    },
    {
      month: "12",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 12,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 12,
      [MoodName["Sadness"]]: 5,
    },
  ],

  eventMoodDistribution: [
    {
      month: "1",
      [MoodName["Happy"]]: 20,
      [MoodName["Anger"]]: 12,
      [MoodName["Love"]]: 6,
      [MoodName["Neutral"]]: 0,
      [MoodName["Anxiety"]]: 1,
      [MoodName["Sadness"]]: 33,
    },
    {
      month: "2",
      [MoodName["Happy"]]: 30,
      [MoodName["Anger"]]: 10,
      [MoodName["Neutral"]]: 5,
      [MoodName["Anxiety"]]: 2,
      [MoodName["Love"]]: 15,
      [MoodName["Sadness"]]: 8,
    },
    {
      month: "3",
      [MoodName["Happy"]]: 40,
      [MoodName["Anger"]]: 5,
      [MoodName["Neutral"]]: 10,
      [MoodName["Anxiety"]]: 3,
      [MoodName["Love"]]: 20,
      [MoodName["Sadness"]]: 7,
    },
    {
      month: "4",
      [MoodName["Happy"]]: 35,
      [MoodName["Anger"]]: 8,
      [MoodName["Neutral"]]: 12,
      [MoodName["Anxiety"]]: 4,
      [MoodName["Love"]]: 18,
      [MoodName["Sadness"]]: 6,
    },
    {
      month: "5",
      [MoodName["Happy"]]: 45,
      [MoodName["Anger"]]: 6,
      [MoodName["Neutral"]]: 15,
      [MoodName["Anxiety"]]: 5,
      [MoodName["Love"]]: 22,
      [MoodName["Sadness"]]: 4,
    },
    {
      month: "6",
      [MoodName["Happy"]]: 50,
      [MoodName["Anger"]]: 7,
      [MoodName["Neutral"]]: 10,
      [MoodName["Anxiety"]]: 6,
      [MoodName["Love"]]: 25,
      [MoodName["Sadness"]]: 3,
    },
    {
      month: "7",
      [MoodName["Happy"]]: 55,
      [MoodName["Anger"]]: 4,
      [MoodName["Neutral"]]: 8,
      [MoodName["Anxiety"]]: 7,
      [MoodName["Love"]]: 30,
      [MoodName["Sadness"]]: 2,
    },
    {
      month: "8",
      [MoodName["Happy"]]: 60,
      [MoodName["Anger"]]: 3,
      [MoodName["Neutral"]]: 5,
      [MoodName["Anxiety"]]: 8,
      [MoodName["Love"]]: 35,
      [MoodName["Sadness"]]: 1,
    },
    {
      month: "9",
      [MoodName["Happy"]]: 65,
      [MoodName["Anger"]]: 2,
      [MoodName["Neutral"]]: 4,
      [MoodName["Anxiety"]]: 9,
      [MoodName["Love"]]: 40,
      [MoodName["Sadness"]]: 0,
    },
    {
      month: "10",
      [MoodName["Happy"]]: 70,
      [MoodName["Anger"]]: 1,
      [MoodName["Neutral"]]: 3,
      [MoodName["Anxiety"]]: 10,
      [MoodName["Love"]]: 45,
      [MoodName["Sadness"]]: 0,
    },
    {
      month: "11",
      [MoodName["Happy"]]: 75,
      [MoodName["Anger"]]: 0,
      [MoodName["Neutral"]]: 2,
      [MoodName["Anxiety"]]: 11,
      [MoodName["Love"]]: 50,
      [MoodName["Sadness"]]: 0,
    },
    {
      month: "12",
      [MoodName["Happy"]]: 80,
      [MoodName["Anger"]]: 0,
      [MoodName["Neutral"]]: 1,
      [MoodName["Anxiety"]]: 12,
      [MoodName["Love"]]: 55,
      [MoodName["Sadness"]]: 0,
    },
  ],
  monthlyData: Array.from({ length: 12 }, (_, i) => ({
    month: `${i + 1}`,
    moods: [
      {
        id: 1,
        mood: MoodName["Happy"],
        countInJournal: Math.trunc(Math.random() * 50),
        countInEvent: Math.trunc(Math.random() * 50),
      },
      {
        id: 2,
        mood: MoodName["Anger"],
        countInJournal: Math.trunc(Math.random() * 30),
        countInEvent: Math.trunc(Math.random() * 30),
      },
      {
        id: 3,
        mood: MoodName["Sadness"],
        countInJournal: Math.trunc(Math.random() * 20),
        countInEvent: Math.trunc(Math.random() * 20),
      },
      //   { id: 4, mood: "neutral", count: Math.trunc(Math.random() * 40) },
    ],
  })),
};

const YearlyDashboard = () => {
  const [selectedYear, setSelectedYear] = useState(format(new Date(), "yyyy"));
  const headerChartCardDynamicContentH = "md:h-[25vh] lg:h-[40vh]";
  return (
    <div className="max-w-7xl mx-auto p-4 space-y-6">
      {/* header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Yearly Summary Dashboard</h1>
        <Select onValueChange={setSelectedYear}>
          <SelectTrigger className="w-32">
            <SelectValue placeholder={selectedYear} />
          </SelectTrigger>
          <SelectContent></SelectContent>
        </Select>
      </div>
      {/* 年度總結 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0">
            <CardTitle>Total Journals</CardTitle>
            <Zap className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {summaryData.totalJournals}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0">
            <CardTitle>Total Events</CardTitle>
            <Zap className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {summaryData.totalEvents}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0">
            <CardTitle>Tag's Jorunals</CardTitle>
            <Zap className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="text-sm font-bold">
            <ul className="flex flex-wrap gap-2">
              {summaryData.tagJournalCount.map((tagData) => (
                <li
                  className="px-4 py-2 border rounded-full"
                  style={{ background: tagData.color }}
                >
                  <Link to="/">
                    <span>{`#${tagData.tagName}`}:</span>
                    <span>{tagData.count}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0">
            <CardTitle>Journal Mood Tracking</CardTitle>
            <PieChartIcon className="w-4 h-4 text-purple-500" />
          </CardHeader>
          <CardContent
            className={`h-48 ${headerChartCardDynamicContentH} text-2xl font-bold"`}
          >
            <MoodLineChart
              data={summaryData.eventMoodDistribution.map((d) => ({
                x: d.month,
                ...d,
              }))}
            />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0">
            <CardTitle>Event Mood Tracking</CardTitle>
            <PieChartIcon className="w-4 h-4 text-green-500" />
          </CardHeader>
          <CardContent
            className={`h-48 ${headerChartCardDynamicContentH} text-2xl font-bold"`}
          >
            <MoodLineChart
              data={summaryData.journalMoodDistribution.map((d) => ({
                x: d.month,
                ...d,
              }))}
            />
          </CardContent>
        </Card>
      </div>
      {/* 月心情總結 */}
      <h2 className="text-xl font-bold">Monthly Mood Tracking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {summaryData.monthlyData.map((data) => (
          <MonthlyMoodRadarChart data={data} />
        ))}
      </div>
    </div>
  );
};

export default YearlyDashboard;
