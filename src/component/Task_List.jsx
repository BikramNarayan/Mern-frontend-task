import React, { useEffect, useState } from "react";
import TaskForm from "./TaskForm";
import Task from "./Task";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import loadingGif from "../../public/loader.gif";

export default function Task_List() {
  const [formData, setFormData] = useState({ name: "", completed: false });
  const { name } = formData;
  const [task, setTask] = useState([]);
  const [completedTask, setcompletedTask] = useState([]);
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const [taskId, setTaskId] = useState("");
  const [comTask, setComTask] = useState([]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const getTask = async () => {
    setLoading(true);
    console.log("hello hi there");
    try {
      console.log("here--> ", import.meta.env.VITE_SERVER_URL);
      const { data } = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/api/post`
      );
      setTask(data);
      setUnComTask(task.length);
      // console.log(res);
      // toast.success("data fetched");
      setLoading(false);
    } catch (error) {
      toast.error(error.msg);
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getTask();
  }, []);
  const createTask = async (e) => {
    e.preventDefault();
    if (name === "") {
      return toast.error("Task cannot be empty", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
    try {
      await axios.post(`${import.meta.env.VITE_SERVER_URL}/api/post`, formData);
      toast.success("Task added");
      setFormData({ ...formData, name: "" });
      getTask();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deletTask = async (_id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_SERVER_URL}/api/post/${_id}`);
      // toast.success("Delted successfully");
      getTask();
    } catch (error) {
      toast.error(error.msg);
    }
  };

  const getSingleTask = async (task) => {
    setFormData({ name: task.name, completed: false });
    setEditing(true);
    setTaskId(task._id);
  };

  const updateTask = async () => {
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/post/${taskId}`,
        formData
      );
      setFormData({ ...formData, name: "" });
      setEditing(false);
      getTask();
    } catch (error) {
      toast.error(error.msg);
    }
  };

  const completeTask = async (task) => {
    const newFormData = {
      name: task.name,
      completed: true,
    };
    try {
      await axios.put(
        `${import.meta.env.VITE_SERVER_URL}/api/post/${task._id}`,
        newFormData
      );
      // setComTask((e) => e + 1);
      getTask();
    } catch (error) {
      toast.error(error.msg);
    }
  };
  useEffect(() => {
    const t = task.filter((task) => {
      return task.completed == true;
    });
    setComTask(t);
  }, [task]);
  return (
    <div>
      <h2>Task Manager</h2>
      <TaskForm
        name={name}
        handleChange={handleChange}
        createTask={createTask}
        editing={editing}
        updateTask={updateTask}
      />
      <div className="--flex-between -pb">
        <b>Total Task: </b>
        {task.length}
        <b>Completed Task: </b>
        {comTask.length}
      </div>
      <hr />
      {loading && (
        <div className="--flex-center">
          <img src={loadingGif} alt="Loading" />
        </div>
      )}
      {!loading && task.length === 0 ? (
        <p className="--py">No Task Added. Please Add a Task</p>
      ) : (
        <>
          {task.map((e, i) => {
            return (
              <Task
                key={task._id}
                index={i}
                task={e}
                deletTask={deletTask}
                getSingleTask={getSingleTask}
                completeTask={completeTask}
              />
            );
          })}
        </>
      )}
    </div>
  );
}
