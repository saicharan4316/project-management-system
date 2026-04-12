
import { useEffect, useState } from "react";
import api from "../api/axios";
import Navbar from "../components/Navbar";

export default function Developer() {
  const [tasks, setTasks] = useState([]);

  const fetchTasks = async () => {
    const res = await api.get("/tasks/my");
    setTasks(res.data);
  };

  const updateStatus = async (id, status) => {
    await api.put(`/tasks/${id}`, { status });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const cols = ["To Do", "In Progress", "Done"];

  return (
    <>
      <Navbar />
      <div className="container">
  <h2>My Tasks</h2>

  <div className="dev-board">

  
    <div className="column">
      <h3>To Do</h3>

      {tasks.filter(t => t.status === "To Do").map(t => (
        <div className="task-card" key={t._id}>
          <p><b>{t.title}</b></p>

          <button onClick={() => updateStatus(t._id, "In Progress")}>
            Start
          </button>
        </div>
      ))}
    </div>

  
    <div className="column">
      <h3>In Progress</h3>

      {tasks.filter(t => t.status === "In Progress").map(t => (
        <div className="task-card" key={t._id}>
          <p><b>{t.title}</b></p>

          <button onClick={() => updateStatus(t._id, "Done")}>
            Done
          </button>
        </div>
      ))}
    </div>


    <div className="column">
      <h3>Done</h3>

      {tasks.filter(t => t.status === "Done").map(t => (
        <div className="task-card" key={t._id}>
          <p><b>{t.title}</b></p>
        </div>
      ))}
    </div>

  </div>
</div>
    </>
  );
}