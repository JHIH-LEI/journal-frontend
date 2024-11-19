import { createBrowserRouter } from "react-router-dom";
import HomePage from "../pages/Home/Homepage";
import UserJournals from "../pages/UserJournals/UserJournals";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/journals",
    element: <UserJournals />,
  },
]);

export default router;
