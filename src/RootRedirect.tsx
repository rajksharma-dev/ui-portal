import { Navigate } from "react-router-dom";

const RootRedirect = () => {
  const token = localStorage.getItem("token");

  if (token) {
    return <Navigate to="/users" replace />;
  }

  return <Navigate to="/login" replace />;
};

export default RootRedirect;