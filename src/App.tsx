import './App.css';
import {Todolist} from "./Todolist";
import {useState} from "react";
import {v1} from "uuid";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

export type FilterValuesType = 'all' | 'active' | 'completed'

export function getFilteredTasks (allTasks: TaskType[], filterValue: FilterValuesType): TaskType[]{
    let tasksForTodolist = allTasks
    if (filterValue === 'active') {
        tasksForTodolist = allTasks.filter(task => !task.isDone)
    }
    if (filterValue === 'completed') {
        tasksForTodolist = allTasks.filter(task => task.isDone)
    }
    return tasksForTodolist
}

function App() {
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: 'HTML&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Redux', isDone: false},
        {id: v1(), title: 'Typescript', isDone: false},
        {id: v1(), title: 'RTK query', isDone: false},
    ])
    const [filter, setFilter] = useState<FilterValuesType>('all')


    const removeTask = (taskId: string) => {
        const filteredTasks = tasks.filter((task) => {
            return task.id !== taskId
        })
        setTasks(filteredTasks)
    }

    //CRUD
    const changeFilter = (filter: FilterValuesType) => {
        setFilter(filter)
    }
    const addTask = (title: string) => {
        let newTask: TaskType = {id: v1(), title: title, isDone: false}
        setTasks([newTask, ...filteredTasks])
    }
    const changeTaskStatus = (id: string, newIsDone: boolean) => {
        // const task = tasks.find(t => t.id === id)
        // if(task){
        //     task.isDone = !task.isDone
        //     setTasks([...tasks])
        // }
        const nextState = tasks.map(t=> t.id === id ? {...t, isDone: newIsDone} : t)
        setTasks(nextState)
    }

const filteredTasks = getFilteredTasks(tasks, filter)

    return (
        <div className="App">
            <Todolist title="What to learn"
                      tasks={filteredTasks}
                      filter={filter}
                      removeTask={removeTask}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
            />
        </div>
    );
}

export default App;
