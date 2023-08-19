import React from "react";
import { FaEdit, FaCheckDouble, FaRegTrashAlt } from "react-icons/fa";
export default function Task({
  task,
  index,
  deletTask,
  getSingleTask,
  completeTask,
}) {
  return (
    <div className={task.completed ? "completed" : "task"}>
      <p>
        <b>{index + 1}.</b>
        {task.name}
      </p>
      <div className="task-icon">
        <FaCheckDouble
          color="green"
          id="si"
          onClick={() => completeTask(task)}
        />
        <FaEdit
          color="blue"
          id="si"
          onClick={() => {
            getSingleTask(task);
          }}
        />
        <FaRegTrashAlt
          color="red"
          id="si"
          onClick={() => {
            deletTask(task._id);
          }}
        />
      </div>
    </div>
  );
}
