import {TasksStateType} from "../App";
import {v1} from "uuid";
import {AddTodolistActionType, RemoveTodolistActionType} from "./todolists-reducer";

type RemoveTaskAT = ReturnType<typeof removeTaskAC>
type AddTaskAT = ReturnType<typeof addTaskAC>
type ChangeTaskStatusAT = ReturnType<typeof changeTaskStatusAC>
type ChangeTaskTitleAT = ReturnType<typeof changeTaskTitleAC>

type ActionType = RemoveTaskAT
    | AddTaskAT
    | ChangeTaskStatusAT
    | ChangeTaskTitleAT
    | AddTodolistActionType
    | RemoveTodolistActionType

export const tasksReducer = (state: TasksStateType, action: ActionType) => {
    switch (action.type){
        case "REMOVE-TASK":{
          const todolistID = action.payload.todolistId
            return {...state, [todolistID]:state[todolistID].filter(task=> task.id != action.payload.taskId)}
        }
        case "ADD-TASK":{
            let newTask = {id: v1(), title: action.payload.title, isDone: false}
            return {...state, [action.payload.todolistId]: [newTask, ...state[action.payload.todolistId]]}
        }
        case "CHANGE-TASK-STATUS":{
            let todolistID = action.payload.todolistId
            return {...state, [todolistID]:state[todolistID].map(todo=> todo.id === action.payload.taskId ?{...todo, isDone: action.payload.isDone} : todo)}
        }
        case "CHANGE-TASK-TITLE":{
            let todolistID = action.payload.todolistId
            return {...state, [todolistID]:state[todolistID].map(todo=> todo.id === action.payload.taskId ? {...todo, title: action.payload.newTitle} : todo)}
        }
        case "ADD-TODOLIST":{
            return {...state, [action.todolistId]: []}
        }
        case "REMOVE-TODOLIST":{
            let newState = {...state}
            delete newState[action.id]
            return newState
        }
        default: {
            return state
        }
    }
}

export const removeTaskAC = (taskId: string, todolistId: string) => {
    return{
        type: 'REMOVE-TASK',
        payload: {
            taskId,
            todolistId
        }
    } as const
}
export const addTaskAC = (title: string, todolistId: string) => {
    return{
        type: 'ADD-TASK',
        payload:{
            title,
            todolistId
        }
    } as const
}
export const changeTaskStatusAC = (taskId: string, isDone: boolean, todolistId: string) => {
    return{
        type: "CHANGE-TASK-STATUS",
        payload: {
            taskId,
            isDone,
            todolistId
        }
    } as const
}
export const changeTaskTitleAC = (taskId: string, newTitle: string, todolistId: string)=> {
    return{
        type: "CHANGE-TASK-TITLE",
        payload: {
            taskId,
            newTitle,
            todolistId
        }
    } as const
}