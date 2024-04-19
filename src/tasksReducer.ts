import {TaskType} from "./Todolist";
import {v1} from "uuid";

type TasksReducerType = RemoveTaskACType | addTaskACType

export const tasksReducer = (state: TaskType[], action: TasksReducerType): TaskType[] => {
    switch (action.type) {
        case "REMOVE-TASK":
            const currentId = action.payload.id
            return state.filter(t => t.id !== currentId)
        case "ADD-TASK":
            return [{id: v1(), title: action.payload.title, isDone: false},...state]
        default:
            return state

    }
}

//action creator

type RemoveTaskACType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (id: string) => {
    return {
        type: "REMOVE-TASK",
        payload: {
            id
        }
    } as const
}


type addTaskACType = ReturnType<typeof addTaskAC>
export const addTaskAC = (title: string) => {
    return{
        type: "ADD-TASK",
        payload: {
            title
        }
    } as const
}