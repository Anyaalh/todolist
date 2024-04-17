import {FilterValuesType, TodolistType} from "../App";
import {v1} from "uuid";

export type RemoveTodolistAT = {
    type: 'REMOVE-TODOLIST'
    payload: {
        id: string
    }
}
export type AddTodolistAT = {
    type: 'ADD-TODOLIST'
    payload: {
        title: string
    }
}

export type ChangeTodolistTitleAT = ReturnType<typeof ChangeTodolistTitleAC>

export type ChangeTodolistFilterAT = ReturnType<typeof ChangeTodolistFilterAC>

type ActionType = RemoveTodolistAT | AddTodolistAT | ChangeTodolistTitleAT | ChangeTodolistFilterAT


export const todolistsReducer = (todolists: Array<TodolistType>, action: ActionType) => {
    switch (action.type) {
        case "REMOVE-TODOLIST": {
            const {id} = action.payload

            return todolists.filter(tl => tl.id !== id)
        }


        case 'ADD-TODOLIST': {
            const {title} = action.payload
            const todolistId = v1()
            const newTodolist: TodolistType = {id: todolistId, title: title, filter: 'all'}

            return [...todolists, newTodolist]
        }

        case 'CHANGE-TODOLIST-TITLE': {
            const {id, title} = action.payload

            return todolists.map(tl => tl.id === id ? {...tl, title} : tl)
        }

        case 'CHANGE-TODOLIST-FILTER': {
            const {id, filter} = action.payload
            return todolists.map(tl => {
                return tl.id === id ? {...tl, filter} : tl
            })
        }


        default:
            return todolists
    }
}

export const RemoveTodolistAC = (id: string): RemoveTodolistAT => {
    return {
        type: 'REMOVE-TODOLIST',
        payload: {
            id: id
        }
    }
}
export const AddTodolistAC = (title: string): AddTodolistAT => {
    return {
        type: 'ADD-TODOLIST',
        payload: {
            title: title
        }
    }
}

export const ChangeTodolistTitleAC = (id: string, title: string) => {
    return {
        type: 'CHANGE-TODOLIST-TITLE',
        payload: {
            id: id,
            title: title
        }
    } as const
}
export const ChangeTodolistFilterAC = (id: string, filter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            id: id,
            filter: filter
        }
    } as const
}