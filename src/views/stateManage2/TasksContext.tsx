import { createContext, useContext, useReducer } from "react";

export interface TaskFormItem {
  name: string;
  status: "default" | "edit";
  index: number;
}

export interface TaskAction {
  type: string;
  item?: TaskFormItem;
}

// 任务列表内容
const TaskContext = createContext<{
  tasks: TaskFormItem[];
  dispatch: React.Dispatch<TaskAction> | null;
}>({ tasks: [], dispatch: null });

export function useTaskContext() {
  return useContext(TaskContext) as {
    tasks: TaskFormItem[];
    dispatch: React.Dispatch<TaskAction>;
  };
}

function reducer(state: TaskFormItem[], action: TaskAction): TaskFormItem[] {
  switch (action.type) {
    case "add": {
      return [...state, ...(action.item ? [action.item] : [])];
    }
    case "edit": {
      return state.map((item) => {
        if (item.index === action.item?.index) {
          return { ...item, status: "edit" };
        }
        return item;
      });
    }
    case "save": {
      return state.map((item) => {
        if (item.index === action.item?.index) {
          return { ...action.item, status: "default" };
        }
        return item;
      });
    }
    case "delete": {
      return state.filter((item) => {
        return item.index !== action.item?.index;
      });
    }
    default:
      return state;
  }
}

export function TasksProvider({ children }: any) {
  const [tasklist, dispatch] = useReducer(reducer, []);
  return (
    <TaskContext.Provider value={{ tasks: tasklist, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
