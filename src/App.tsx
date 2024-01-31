import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number
    title: string
    isDone: boolean
}

function App() {

    const todoListTitle = "What to learn"
    const tasks: TaskType[] =[
        {id: 1, title: "HTML&CSS", isDone:true},
        {id: 2, title: "JS", isDone:true},
        {id: 3, title: "React", isDone:false}
    ]

    return (
        <div className="App">
            <Todolist tasks={tasks} todoListTitle={todoListTitle}/>
        </div>
    );
}

export default App;
