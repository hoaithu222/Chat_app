import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../page/Home";
import Profile from "../page/Profile";
import MessagePage from "../components/MessagePage";
import Login from "../page/Login";
import Register from "../page/Register";
import PrivateRouter from "../Layout/PrivateRouter";
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <App />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
        children: [
          {
            path: "/:id",
            element: <MessagePage />,
          },
        ],
      },
      { path: "profile", element: <Profile /> },
      { path: "message", element: <MessagePage /> },
    ],
  },
  { path: "/login", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default router;
