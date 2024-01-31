import React from "react";

type TaskType = {
    title: string
    isDone: boolean
}

export function Task ({title, isDone}: TaskType){
    return (
        <li>
            <input type="checkbox" checked={isDone}/>
            <span>{title}</span>
        </li>
    )
}