import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type FilterType = "all" | "active" | "complited"

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const todoListTitle = "What to learn"
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "React", isDone: false}
    ])

    const [filter, setFilter] = useState<FilterType>("all")

    function removeTask(taskId: number) {
        const newState = tasks.filter(tasks => tasks.id !== taskId)
        setTasks(newState)
    }

    function changeFilter (filter: FilterType){
        setFilter(filter)
    }

    let tasksForTodoList = tasks
    if (filter === "active") {
        tasksForTodoList = tasks.filter(tasks=> !tasks.isDone)
    }
    if (filter === "complited") {
        tasksForTodoList = tasks.filter(tasks=> tasks.isDone)
    }

    return (
        <div className="App">
            <Todolist
                tasks={tasksForTodoList}
                todoListTitle={todoListTitle}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    );
}

export default App;
