import { useState } from "react";
import { TaskFormItem, useTaskContext } from "./TasksContext";

function TaskItem({ task }: { task: TaskFormItem }) {
  const { dispatch } = useTaskContext();
  const [name, setName] = useState(task.name);
  // 编辑状态
  if (task.status === "edit") {
    return (
      <li>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={() => {
            dispatch({ type: "save", item: { ...task, name } });
          }}
        >
          保存
        </button>
      </li>
    );
  }
  // 常规展示
  return (
    <li>
      <span>{task.name}</span>
      <button
        onClick={() => {
          dispatch({ type: "edit", item: task });
        }}
      >
        编辑
      </button>
      <button
        onClick={() => {
          dispatch({ type: "delete", item: task });
        }}
      >
        删除
      </button>
    </li>
  );
}

export default function AddTaskList() {
  const { tasks } = useTaskContext();

  return (
    <div>
      {tasks.map((task) => {
        return <TaskItem key={task.index} task={task}></TaskItem>;
      })}
    </div>
  );
}
