import { createContext, useContext, useReducer } from 'react';

const TasksContext = createContext(null);
const TasksDispatchContext = createContext(null);

export function useTasks(): any {
    return useContext(TasksContext);
}

export function useTasksDispatch(): any {
    return useContext(TasksDispatchContext);
}

function tasksReducer(tasks: any, action: any) {
    switch (action.type) {
        case 'added': {
            return [
                ...tasks,
                {
                    id: action.id,
                    text: action.text,
                    done: false,
                },
            ];
        }
        case 'changed': {
            return tasks.map((t: any) => {
                if (t.id === action.task.id) {
                    return action.task;
                } else {
                    return t;
                }
            });
        }
        case 'deleted': {
            return tasks.filter((t: any) => t.id !== action.id);
        }
        default: {
            throw Error('未知操作：' + action.type);
        }
    }
}

const initialTasks = [
    { id: 0, text: '哲学家之路', done: true },
    { id: 1, text: '参观寺庙', done: false },
    { id: 2, text: '喝抹茶', done: false },
];

export function TasksProvider({ children }: any) {
    const [tasks, dispatch] = useReducer(tasksReducer, initialTasks);

    return (
        <TasksContext.Provider value={tasks}>
            <TasksDispatchContext.Provider value={dispatch as any}>{children}</TasksDispatchContext.Provider>
        </TasksContext.Provider>
    );
}
