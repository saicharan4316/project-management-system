
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles/global.css";

export default function Activity() {
  const [logs, setLogs] = useState([]);
  const [users, setUsers] = useState([]);

  const [filters, setFilters] = useState({
    user: "",
    action: "",
    startDate: "",
    endDate: ""
  });
  const role = localStorage.getItem("role");

  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };


  const fetchLogs = async () => {
    const res = await api.get("/activity", { params: filters });
    setLogs(res.data);
  };

  useEffect(() => {
  if (role === "Admin") {
    fetchUsers();
  }
  fetchLogs();
}, []);

  return (
    <>
      <Navbar />

      <div className="container">
        <h2>
  {role === "Admin" ? "System Activity Logs" : "Project Activity Logs"}
</h2>

       
        <div className="filters">

          <select onChange={(e) => setFilters({ ...filters, user: e.target.value })}>
            <option value="">All Users</option>
            {users.map(u => (
              <option key={u._id} value={u._id}>{u.name}</option>
            ))}
          </select>

          <select onChange={(e) => setFilters({ ...filters, action: e.target.value })}>
            <option value="">All Actions</option>
            <option>TASK_CREATED</option>
            <option>TASK_UPDATED</option>
            <option>PROJECT_CREATED</option>
            <option>USER_UPDATED</option>
          </select>

          <input
            type="date"
            onChange={(e) => setFilters({ ...filters, startDate: e.target.value })}
          />

          <input
            type="date"
            onChange={(e) => setFilters({ ...filters, endDate: e.target.value })}
          />

          <button className="button" onClick={fetchLogs}>
            Apply
          </button>
        </div>

     
        <table className="table">
          <thead>
            <tr>
              <th>User</th>
              <th>Action</th>
              <th>Details</th>
              <th>Date</th>
            </tr>
          </thead>

          <tbody>
            {logs.map(log => (
              <tr key={log._id}>
                <td>{log.user?.name}</td>
                <td>{log.action}</td>
                <td>{log.details}</td>
                <td>{new Date(log.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}