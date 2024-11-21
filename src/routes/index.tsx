import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/Homepage";
import UserJournals from "../pages/UserJournals/UserJournals";
import YearlyDashboard from "@/pages/YearlyDashboard/YearlyDashboard.js";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/journals",
    element: <UserJournals />,
  },
  {
    path: "/dashboard",
    element: <YearlyDashboard />,
  },
]);

export default router;
