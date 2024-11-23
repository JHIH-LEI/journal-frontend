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
import {
  GetYearlyDashbardDataQuery,
  GetYearlyDashbardDataQueryVariables,
  MonthlyMoodData,
  MoodName,
} from "@/gql/graphql";
import MoodLineChart from "@/components/chart/MoodLineChart";
import { useQuery } from "@apollo/client";
import { gql } from "@/gql";

function transformToJournalMoodDistribution(
  data: MonthlyMoodData[]
): Array<{ x: string } & Record<MoodName, number>> {
  const result = data.map((d) => {
    const moods = d.moods.reduce((acc, cur) => {
      acc[cur.moodName] = cur.journalCount;
      return acc;
    }, {} as Record<MoodName, number>);

    return {
      x: `${d.month}`,
      ...moods,
    };
  });
  return result;
}

function transformToEventMoodDistribution(
  data: MonthlyMoodData[]
): Array<{ x: string } & Record<MoodName, number>> {
  const result = data.map((d) => {
    const moods = d.moods.reduce((acc, cur) => {
      acc[cur.moodName] = cur.eventCount;
      return acc;
    }, {} as Record<MoodName, number>);

    return {
      x: `${d.month}`,
      ...moods,
    };
  });
  return result;
}

const GET_DASHBOARD = gql(`
query GetYearlyDashbardData($year: String!) {
    getYearlySummaryData(year: $year) {
    code
    message
    data {
      counter {
        totalEventCount
        totalJournalCount
      }
      monthlyMoodData {
        month
        moods {
          moodId
          moodName
          eventCount
          journalCount
        }
      }
      activityJournalCounts {
        activityId
        activityName
        activityColor
        journalCount
      }
    }
    success
  }
}
`);

const YearlyDashboard = () => {
  const [selectedYear, setSelectedYear] = useState(format(new Date(), "yyyy"));
  const { data, loading, error } = useQuery<
    GetYearlyDashbardDataQuery,
    GetYearlyDashbardDataQueryVariables
  >(GET_DASHBOARD, {
    variables: {
      year: selectedYear,
    },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error : {error.message}</p>;
  const summaryData = data?.getYearlySummaryData?.data;
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
      {/* yearly data */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0">
            <CardTitle>Total Journals</CardTitle>
            <Zap className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {summaryData?.counter?.totalJournalCount}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0">
            <CardTitle>Total Events</CardTitle>
            <Zap className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="text-2xl font-bold">
            {summaryData?.counter?.totalEventCount}
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row justify-between items-center space-y-0">
            <CardTitle>{`${selectedYear} Activity Counts`}</CardTitle>
            <Zap className="w-4 h-4 text-yellow-500" />
          </CardHeader>
          <CardContent className="text-sm font-bold">
            <ul className="flex flex-wrap gap-2">
              {summaryData?.activityJournalCounts?.map((activity) => (
                <li
                  key={activity.activityId}
                  className="px-4 py-2 border rounded-full bg-opacity-50"
                  style={{ background: activity.activityColor || "#ffffff" }}
                >
                  <Link to="/">
                    <span>{`#${activity.activityName || "others"}`}:</span>
                    <span>&nbsp;{activity.journalCount}</span>
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
              data={transformToJournalMoodDistribution(
                summaryData?.monthlyMoodData || []
              )}
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
              data={transformToEventMoodDistribution(
                summaryData?.monthlyMoodData || []
              )}
            />
          </CardContent>
        </Card>
      </div>
      {/* monthly mood */}
      <h2 className="text-xl font-bold">Monthly Mood Tracking</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {summaryData?.monthlyMoodData?.map((data) => (
          <MonthlyMoodRadarChart key={data.month} data={data} />
        ))}
      </div>
    </div>
  );
};

export default YearlyDashboard;
