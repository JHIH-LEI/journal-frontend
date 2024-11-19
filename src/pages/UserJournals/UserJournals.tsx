import { useQuery } from "@apollo/client";
import { gql } from "../../gql";
import { GetJournalsQuery, GetJournalsQueryVariables } from "../../gql/graphql";
import { useState } from "react";
import JournalCard from "../../components/JournalCard";

const GET_JOURNALS = gql(`
    query GetJournals($input: GetJournalsInput!) {
  getJournals(input: $input) {
    code
    data {
      id
      journalTitle
      journalDate
      journalMood {
        id
        icon {
          id
          iconName
          iconURL
        }
        moodName
      }
      events {
        id
        eventTitle
        eventIndex
        eventMood {
          id
          icon {
            id
            iconURL
          }
          moodName
        }
        mood {
          id
          icon {
            id
            iconURL
          }
          moodName
        }
      }
      tracks {
        id
        trackId
        trackName
        trackDisplayType
        trackGoal
        trackValue
      }
      journalBody
      category {
        id
        categoryName
      }
      activities {
        id
        activityName
      }
    }
    success
    message
  }
}

`);
const UserJournals = () => {
  const [filter, setFilter] = useState<GetJournalsQueryVariables["input"]>({
    categoryId: undefined,
    moodId: undefined,
    startDate: undefined,
    endDate: undefined,
    activityIds: undefined,
  });

  const { loading, data, error } = useQuery<
    GetJournalsQuery,
    GetJournalsQueryVariables
  >(GET_JOURNALS, {
    variables: {
      input: filter,
    },
  });

  if (loading) return <p>still loading</p>;
  if (error) return <p>Error : {error.message}</p>;

  const journals = data?.getJournals?.data || [];

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* TODO: filter bar */}
      <div className="space-y-4">
        {journals.map((journal) => (
          <JournalCard
            id={`${journal.id}`}
            title={journal.journalTitle || ""}
            journalDate={journal.journalDate}
            journalBody={journal.journalBody || ""}
            moodName={journal.journalMood?.moodName}
            categoryName={journal.category?.categoryName}
            events={journal.events}
            activities={journal.activities}
            tracks={journal.tracks}
          />
        ))}
      </div>
    </div>
  );
};

export default UserJournals;
