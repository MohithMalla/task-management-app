import React, { useEffect, useState } from "react";
import API from "./api";
import { useNavigate } from "react-router-dom";
import "./taskList.css";

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");
  const navigate = useNavigate();

  const fetchTasks = async () => {
    try {
      const res = await API.get("/tasks");
      setTasks(res.data);
    } catch (err) {
      if (err.response?.status === 401) navigate("/login");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const addTask = async () => {
    if (!title.trim()) return;
    await API.post("/tasks", { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id, completed) => {
    await API.put(`/tasks/${id}`, { completed: !completed });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await API.delete(`/tasks/${id}`);
    fetchTasks();
  };

  const updateTaskTitle = async (id) => {
    if (!editedTitle.trim()) return;
    await API.put(`/tasks/${id}`, { title: editedTitle });
    setEditingTaskId(null);
    setEditedTitle("");
    fetchTasks();
  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);
  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <div className="container mt-4 px-3 px-md-5">
      {/* Header */}
      <h2 className="text-center mb-4 d-flex align-items-center justify-content-center gap-2 flex-wrap">
        <i className="fas fa-list-check text-primary"></i>
        <span>Task Management App</span>
      </h2>

      {/* Input and Add Button */}
      <div className="row justify-content-center mb-4">
        <div className="col-12 col-md-8 d-flex flex-column flex-sm-row gap-2">
          <input
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="New task..."
          />
          <button className="btn btn-primary" onClick={addTask}>
            Add
          </button>
        </div>
      </div>

      {/* Incomplete Tasks */}
      {incompleteTasks.map((task, index) => (
  <li
    key={task._id}
    className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 px-3 py-2"
  >
    {editingTaskId === task._id ? (
      <div className="d-flex flex-column flex-sm-row w-100 gap-2">
        <input
          className="form-control"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
        />
        <div className="d-flex gap-2">
          <button
            className="btn btn-sm btn-success"
            onClick={() => updateTaskTitle(task._id)}
          >
            Save
          </button>
          <button
            className="btn btn-sm btn-secondary"
            onClick={() => {
              setEditingTaskId(null);
              setEditedTitle("");
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    ) : (
      <>
        {/* Left Side: Title + Edit Button */}
        <div className="d-flex align-items-center gap-2 flex-grow-1">
          <span className="task-number">{index + 1}.</span>
          <span>{task.title}</span>
          <button
            className="btn btn-sm btn-outline-info ms-3 edit-btn"
            onClick={() => {
              setEditingTaskId(task._id);
              setEditedTitle(task.title);
            }}
          >
            
            Edit
            <i class="fa-solid fa-pen mx-1"></i>
          </button>
        </div>

        {/* Right Side: Complete & Delete */}
        <div className="d-flex gap-2 mt-2 mt-sm-0">
          <button
            className="btn btn-sm btn-success"
            onClick={() => toggleTask(task._id, task.completed)}
          >
            Complete
          </button>
          <button
            className="btn btn-sm btn-danger"
            onClick={() => deleteTask(task._id)}
          >
            Delete
          </button>
        </div>
      </>
    )}
  </li>
))}


      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <>
          <h4>Completed Tasks</h4>
          <ul className="list-group mb-4">
            {completedTasks.map((task) => (
              <li
                key={task._id}
                className="list-group-item d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-2 px-3 py-2"
              >
                <span
                  className="mb-2 mb-sm-0"
                  style={{ textDecoration: "line-through", color: "gray" }}
                >
                  {task.title}
                </span>
                <div className="d-flex gap-2">
                  <button
                    className="btn btn-sm btn-warning"
                    onClick={() => toggleTask(task._id, task.completed)}
                  >
                    Undo Task
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => deleteTask(task._id)}
                  >
                    Delete
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Logout */}
      <div className="d-flex justify-content-center mt-4">
        <button className="btn btn-secondary px-4 fs-6" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default TaskList;
