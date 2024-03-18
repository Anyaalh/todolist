import React from "react";
import {Button} from "./Button";

type TaskType = {
    taskId: number
    title: string
    isDone: boolean
    removeTask: (taskId: number)=> void
}

export function Task ({taskId, title, isDone, removeTask}: TaskType){
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
            <Button title={"x"} onClickHandler={()=>removeTask(taskId)}/>
        </li>
    )
}