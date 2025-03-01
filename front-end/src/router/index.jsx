import { createBrowserRouter } from "react-router-dom";
import App from "../App";

import Home from "../page/Home";
import Profile from "../page/Profile";
import MessagePage from "../components/MessagePage";
import Login from "../page/Login";
import Register from "../page/Register";
import PrivateRouter from "../Layout/PrivateRouter";
import LayoutForm from "../Layout/LayoutForm";
import Setting from "../page/Setting";
import SearchUser from "../page/SearchUser";
import { SocketProvider } from "../context/SocketProvider";
const AppWithSocket = () => (
  <SocketProvider>
    <App />
  </SocketProvider>
);
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRouter>
        <AppWithSocket />
      </PrivateRouter>
    ),
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/:id",
        element: <MessagePage />,
      },
      { path: "profile", element: <Profile /> },
      { path: "setting", element: <Setting /> },
      { path: "search-user", element: <SearchUser /> },
    ],
  },
  {
    path: "/",
    element: <LayoutForm />,
    children: [
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
