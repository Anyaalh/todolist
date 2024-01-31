import {TodoListHeader} from "./TodoListHeader";
import {AddTasksForm} from "./AddTasksForm";
import {TasksList} from "./TasksList";
import React from "react";
import {TaskType} from "./App";

type TodolistType = {
    todoListTitle: string
    tasks: Array<TaskType>
}

export function Todolist({todoListTitle, tasks}: TodolistType) {
    return (
        <div>
            <TodoListHeader title={todoListTitle}/>
            <AddTasksForm/>
            <TasksList tasks={tasks}/>
        </div>
    )
}