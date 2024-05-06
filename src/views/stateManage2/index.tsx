import AddTask from './AddTask';
import TaskList from './TaskList';
import { TasksProvider } from './TasksContext';

export default function TaskApp() {
    return (
        <TasksProvider>
            <AddTask></AddTask>
            <TaskList></TaskList>
        </TasksProvider>
    );
}
