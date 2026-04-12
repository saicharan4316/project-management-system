
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Manager() {
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState("");
  const [tasks, setTasks] = useState([]);

  const [projectTitle, setProjectTitle] = useState("");
  const [task, setTask] = useState({
    title: "",
    description: "",
    assignedTo: "",
    priority: "Medium",
    dueDate: ""
  });

  const [devs, setDevs] = useState([]);


  const fetchProjects = async () => {
    const res = await api.get("/projects");
    setProjects(res.data);
  };

  const fetchDevs = async () => {
    const res = await api.get("/tasks/developers");
    setDevs(res.data);
  };

  const fetchTasks = async (id) => {
    const res = await api.get(`/tasks/project/${id}`);
    setTasks(res.data);
  };

 
  const createProject = async () => {
    await api.post("/projects", { title: projectTitle });
    setProjectTitle("");
    fetchProjects();
  };

  const createTask = async () => {
    await api.post("/tasks", {
      ...task,
      project: selectedProject
    });
    fetchTasks(selectedProject);
  };

  useEffect(() => {
    fetchProjects();
    fetchDevs();
  }, []);

  return (
   <>
  <Navbar />

  <div className="container">
    <h2>Manager Dashboard</h2>

    <div className="dashboard-grid">

     
      <div>

        <div className="card">
          <h3>Create Project</h3>
          <input
            className="input"
            placeholder="Project title"
            value={projectTitle}
            onChange={(e) => setProjectTitle(e.target.value)}
          />
          <button className="button" onClick={createProject}>
            Create
          </button>
        </div>

        <div className="card">
          <h3>Select Project</h3>
          <select
            className="input"
            onChange={(e) => {
              setSelectedProject(e.target.value);
              fetchTasks(e.target.value);
            }}
          >
            <option>Select</option>
            {projects.map(p => (
              <option key={p._id} value={p._id}>{p.title}</option>
            ))}
          </select>
        </div>

        <div className="card">
          <h3>Create Task</h3>

          <input
            className="input"
            placeholder="Title"
            onChange={(e) => setTask({ ...task, title: e.target.value })}
          />

          <input
            className="input"
            placeholder="Description"
            onChange={(e) => setTask({ ...task, description: e.target.value })}
          />

          <select
            className="input"
            onChange={(e) => setTask({ ...task, assignedTo: e.target.value })}
          >
            <option>Select Developer</option>
            {devs.map(d => (
              <option key={d._id} value={d._id}>{d.name}</option>
            ))}
          </select>

          <button className="button" onClick={createTask}>
            Create Task
          </button>
        </div>

      </div>

      
      <div className="card">
        <h3>Tasks</h3>

        {tasks.length === 0 && <p>No tasks yet</p>}

        {tasks.map(t => (
          <div key={t._id} style={{ marginBottom: "10px" }}>
            <p><b>{t.title}</b></p>
            <p>Status: {t.status}</p>
            <p>Assigned: {t.assignedTo?.name}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
</>
  );
}