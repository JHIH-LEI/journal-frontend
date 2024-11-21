import { MoodName } from "@/gql/graphql";
import { LucideIcon } from "lucide-react";
import { Smile, Frown, Meh, Angry } from "lucide-react";

interface IconMappingItem {
  icon: LucideIcon;
  backgroundColor200: string;
  chartFillColor: string;
}
const MoodMapping: Record<MoodName, IconMappingItem> = {
  [MoodName["Happy"]]: {
    icon: Smile,
    backgroundColor200: "bg-yellow-200",
    chartFillColor: "#949909",
  },
  [MoodName["Sadness"]]: {
    icon: Frown,
    backgroundColor200: "bg-blue-200",
    chartFillColor: "#0000FF",
  },
  [MoodName["Neutral"]]: {
    icon: Meh,
    backgroundColor200: "bg-gray-200",
    chartFillColor: "#808080",
  },
  [MoodName["Anger"]]: {
    icon: Angry,
    backgroundColor200: "bg-red-200",
    chartFillColor: "#FF0000",
  },
  [MoodName["Anxiety"]]: {
    icon: Angry,
    backgroundColor200: "bg-orange-200",
    chartFillColor: "#FFA500",
  },
  [MoodName["Love"]]: {
    icon: Angry,
    backgroundColor200: "bg-pink-200",
    chartFillColor: "#FFC0CB",
  },
};

export { MoodMapping };
