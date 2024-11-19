import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tag, Calendar, BookOpen, CheckSquare, SquareX } from "lucide-react";
import { Activity, JournalEvent, Track, TrackDisplayType } from "@/gql/graphql";
import { Link } from "react-router-dom";
import EventsList from "./EventList";

const JournalCard = ({
  id,
  title,
  events,
  journalDate,
  moodName,
  journalBody,
  tracks,
  activities,
  categoryName,
}: {
  id: string;
  title: string;
  moodName?: string;
  journalBody: string;
  journalDate: Date;
  events: Pick<JournalEvent, "id" | "eventIndex" | "eventTitle">[];
  activities: Pick<Activity, "id" | "activityName">[];
  categoryName?: string;
  tracks: Track[];
}) => {
  return (
    <Link to={`/journals/${id}`}>
      <Card id={id} className="hover:shadow-lg transition-shadow mb-4">
        <CardHeader>
          <div className="flex justify-between items-start">
            <div className="flex flex-col">
              <CardTitle className="max-w-[14ch] break-words">
                {title}
              </CardTitle>
              <div className="text-sm text-muted-foreground mt-1">
                <div className="flex items-center gap-2 ">
                  <Calendar className="w-5 h-5" />
                  {`${journalDate}`}
                </div>
              </div>
              <div className="text-sm text-muted-foreground mt-1">
                Mood：{moodName || "-"}
              </div>
            </div>
            <div className="flex justify-end flex-wrap gap-2">
              {activities.map((act) => (
                <span
                  key={act.id}
                  className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800"
                >
                  <Tag className="w-3 h-3" />
                  {act.activityName}
                </span>
              ))}
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <BookOpen className="w-4 h-4" />
              Category：{categoryName || "-"}
            </div>

            {/* Event list */}
            {events.length > 0 && (
              <div className="bg-gray-50 p-3 rounded-lg">
                <EventsList events={events} />
              </div>
            )}

            <p className="text-sm overflow-hidden text-ellipsis line-clamp-2">
              {journalBody}
            </p>
            <div className="border-t pt-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center gap-2">
                  {/* track list */}
                  <Table className="text-sm w-full border border-gray-200">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="font-semibold text-left">
                          Name
                        </TableHead>
                        <TableHead className="font-semibold text-left">
                          Value
                        </TableHead>
                        <TableHead className="font-semibold text-left">
                          Goal
                        </TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {tracks
                        .filter(
                          (t) => t.trackDisplayType === TrackDisplayType.Value
                        )
                        .map((row, index) => (
                          <TableRow key={index}>
                            <TableCell className="px-4 py-2">
                              {row.trackName}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                              {row.trackValue}
                            </TableCell>
                            <TableCell className="px-4 py-2">
                              {row.trackGoal || "-"}
                            </TableCell>
                          </TableRow>
                        ))}
                    </TableBody>
                  </Table>
                </div>
                <div>
                  <div className="text-sm font-medium mb-2">Check List</div>
                  {tracks
                    .filter(
                      (t) => t.trackDisplayType === TrackDisplayType.CheckBox
                    )
                    .map((track) => (
                      <div
                        key={track.id}
                        className="flex items-center gap-2 text-sm"
                      >
                        {track.trackValue ? (
                          <CheckSquare className="w-4 h-4 text-green-500" />
                        ) : (
                          <SquareX className="w-4 h-4 text-gray-500" />
                        )}
                        {track.trackName}
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default JournalCard;
