import {TodoListHeader} from "./TodoListHeader";
import {AddTasksForm} from "./AddTasksForm";
import {TasksList} from "./TasksList";
import React from "react";
import {FilterType, TaskType} from "./App";

type TodolistType = {
    todoListTitle: string
    tasks: Array<TaskType>
    removeTask: (taskId: number)=> void
    changeFilter: (filter: FilterType) => void
}

export function Todolist({changeFilter, todoListTitle, tasks, removeTask}: TodolistType) {
    return (
        <div>
            <TodoListHeader title={todoListTitle}/>
            <AddTasksForm/>
            <TasksList
                tasks={tasks}
                removeTask={removeTask}
                changeFilter={changeFilter}
            />
        </div>
    )
}