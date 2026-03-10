import { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import type { ReactNode } from "react";
import { AuthContext } from "../context/AuthContext";

interface Props {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const auth = useContext(AuthContext);
  const location = useLocation();
  if (auth?.loading) {
    return <div>Loading...</div>;
  }
  // If no token → go to login
  if (!auth?.token) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ from: location }}   // optional (for future redirect back)
      />
    );
  }

  return <>{children}</>;
};

export default ProtectedRoute;