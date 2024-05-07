import { useState } from "react";
import { useTaskContext } from "./TasksContext";

export default function AddTask() {
  const [name, setName] = useState("");
  const { tasks, dispatch } = useTaskContext();
  return (
    <div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <button
        onClick={() => {
          setName("");
          dispatch({
            type: "add",
            item: { name, status: "default", index: tasks.length },
          });
        }}
      >
        提交
      </button>
    </div>
  );
}
