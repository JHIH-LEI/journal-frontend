import { useState } from "react";
import { ChevronDown, ChevronUp, Zap } from "lucide-react";
import { JournalEvent } from "@/gql/graphql";

const EventsList = ({
  events,
}: {
  events: Pick<JournalEvent, "id" | "eventIndex" | "eventTitle">[];
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayEvents = isExpanded ? events : events.slice(0, 3);
  const hasMoreEvents = events.length > 3;

  return (
    <div className="space-y-2">
      <div className="text-sm font-medium flex items-center gap-2">
        <Zap className="w-4 h-4 text-yellow-500" />
        Today's Events
      </div>
      <div className="space-y-1">
        {displayEvents
          .sort((a, b) => a.eventIndex - b.eventIndex)
          .map((event) => (
            <div
              key={event.id}
              className="text-sm py-1 px-2 bg-gray-50 rounded-md flex items-center gap-2"
            >
              <div className="w-2 h-2 bg-blue-400 rounded-full" />
              {event.eventTitle}
            </div>
          ))}
      </div>
      {hasMoreEvents && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="text-sm text-blue-500 hover:text-blue-600 flex items-center gap-1"
        >
          {isExpanded ? (
            <>
              <ChevronUp className="w-4 h-4" />
              收起
            </>
          ) : (
            <>
              <ChevronDown className="w-4 h-4" />
              顯示更多 ({events.length - 3} 個事件)
            </>
          )}
        </button>
      )}
    </div>
  );
};

export default EventsList;
