
import { useNavigate } from "react-router-dom";
import "../styles/global.css";

export default function Layout({ children }) {
  const navigate = useNavigate();
  const role = localStorage.getItem("role");

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="app">

   
      <div className="sidebar">
        <h2>ProjectSys</h2>

        {role === "Admin" && (
          <>
            <button onClick={() => navigate("/admin")}>Dashboard</button>
            <button onClick={() => navigate("/activity")}>Activity</button>
          </>
        )}

        {role === "Manager" && (
          <>
            <button onClick={() => navigate("/manager")}>Dashboard</button>
            <button onClick={() => navigate("/activity")}>Activity</button>
          </>
        )}

        {role === "Developer" && (
          <>
            <button onClick={() => navigate("/developer")}>My Tasks</button>
          </>
        )}
      </div>

   
      <div className="main">

     
        <div className="topbar">
          <h3>{role} Panel</h3>
          <button onClick={logout}>Logout</button>
        </div>

    
        <div className="content">
          {children}
        </div>

      </div>
    </div>
  );
}