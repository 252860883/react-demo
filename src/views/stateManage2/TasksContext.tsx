import { createContext, useContext, useReducer, useState } from 'react';

export interface TaskFormItem {
    [key: string]: string;
}

// 任务列表内容
const TaskContext = createContext<TaskFormItem[]>([]);
const TaskDispatchContext = createContext<React.Dispatch<string> | null>(null);

export function useTaskContext() {
    return useContext(TaskContext);
}

export function useTaskDispatch() {
    return useContext(TaskDispatchContext) as React.Dispatch<string>;
}

function reducer(state: TaskFormItem[], action: string, item?: TaskFormItem): TaskFormItem[] {
    switch (action) {
        case 'add': {
            return [...state, ...(item ? [item] : [])];
        }
        default:
            return state;
    }
}

export function TasksProvider({ children }: any) {
    const [tasklist, dispatch] = useReducer(reducer, []);
    return (
        <TaskContext.Provider value={tasklist}>
            <TaskDispatchContext.Provider value={dispatch}>{children}</TaskDispatchContext.Provider>
        </TaskContext.Provider>
    );
}
