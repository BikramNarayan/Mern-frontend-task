import React from "react";

export default function TaskForm({
  createTask,
  name,
  handleChange,
  editing,
  updateTask,
}) {
  return (
    <form className="task-form" onSubmit={editing ? updateTask : createTask}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        placeholder="Add a Task"
      />
      <button type="submit">{editing ? "Edit" : "Add"}</button>
    </form>
  );
}
