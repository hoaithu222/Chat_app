import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRouter({ children }) {
  const user = useSelector((state) => state.user);

  if (user.name != "") {
    return children;
  }
  return <Navigate to="/login" replace />;
}
