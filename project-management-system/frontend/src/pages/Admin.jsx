
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";
import "../styles/global.css";
import Layout from "../components/Layout";
export default function Admin() {
  const [users, setUsers] = useState([]);
  const [stats, setStats] = useState({});
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    role: "Developer"
  });

 
  const fetchUsers = async () => {
    const res = await api.get("/users");
    setUsers(res.data);
  };

  
  const fetchStats = async () => {
    const res = await api.get("/admin/stats");
    setStats(res.data);
  };


  const createUser = async () => {
    try {
      await api.post("/users", form);
      alert("User created");
      setForm({ name: "", email: "", password: "", role: "Developer" });
      fetchUsers();
    } catch (err) {
      alert(err.response?.data?.msg || "Error");
    }
  };

  
  const toggleStatus = async (id) => {
    await api.put(`/users/${id}/toggle`);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
    fetchStats();
  }, []);

  return (
    <>
      
   <Layout>
      <div className="container">
        <h2>Admin Dashboard</h2>

      
        <div className="grid">
          <div className="stat-card">
            <h3>Users</h3>
            <p>{stats.users}</p>
          </div>
          <div className="stat-card">
            <h3>Projects</h3>
            <p>{stats.projects}</p>
          </div>
          <div className="stat-card">
            <h3>Tasks</h3>
            <p>{stats.tasks}</p>
          </div>
        </div>

        <div className="card form section">
          <h3>Create User</h3>
          
          <input
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />

          <input
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
          >
            <option>Admin</option>
            <option>Manager</option>
            <option>Developer</option>
          </select>

          <button className="button" onClick={createUser}>
            Create User
          </button>
        </div>

       
        <h3>Users</h3>

        {users.map((u) => (
          <div className="card" key={u._id}>
            <p>
              {u.name} — {u.role} — {u.status}
            </p>
            <button onClick={() => toggleStatus(u._id)}>
              Toggle Status
            </button>
          </div>
        ))}
      </div>
      </Layout>
    </>
  );
}