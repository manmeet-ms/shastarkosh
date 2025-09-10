import { Navigate } from "@tanstack/react-router";
import { useSelector } from "react-redux";

const ProtectedLayout = ({ children }) => {
  const { user } = useSelector((state) => state.auth);
  console.log(user);

  return <>{!user ? <Navigate to="/auth/login" /> : children}</>;
};

export default ProtectedLayout;
