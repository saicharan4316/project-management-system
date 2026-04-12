
import { Navigate } from "react-router-dom";

export default function Protected({ children, role }) {
  const userRole = localStorage.getItem("role");

  if (!userRole) return <Navigate to="/" />;
  if (role && role !== userRole) return <Navigate to="/" />;

  return children;
}