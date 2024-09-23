// react-router
import { createBrowserRouter } from "react-router-dom";
import Root from "../Layout/Root";
import Home from "../components/pages/Home/Home";
import TaskBoard from "../components/pages/TaskBoard/TaskBoard";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root></Root>,
    children: [
        {
            path: '/',
            element: <Home></Home>,
        },
        {
            path: '/taskboard',
            element: <TaskBoard></TaskBoard>,
        },
    ]
  },
]);

export default router;
