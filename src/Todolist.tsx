import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent} from "react";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";
import IconButton from "@mui/material/IconButton";
import {MyButton} from "./MyButton";
import ClearIcon from '@mui/icons-material/Clear';
import Checkbox from "@mui/material/Checkbox";
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'

type PropsType = {
    title: string
    todolistId: string
    tasks: TaskType[]
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (filter: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
    filter: FilterValuesType
    removeTodolist: (todolistId: string) => void
    updateTask: (todolistId: string, taskId: string, title: string) => void
    updateTodolist: (todolistId: string, title: string) => void
}

export const Todolist = (props: PropsType) => {
    const {
        title,
        tasks,
        filter,
        removeTask,
        changeFilter,
        addTask,
        changeTaskStatus,
        todolistId,
        removeTodolist,
        updateTask,
        updateTodolist
    } = props

    const changeFilterTasksHandler = (filter: FilterValuesType) => {
        changeFilter(filter, props.todolistId)
    }

    const removeTodolistHandler = () => {
        removeTodolist(todolistId)
    }

    const addTaskCallback = (title: string) => {
        addTask(title, props.todolistId)
    }

    const updateTodolistHandler = (title: string) => {
        updateTodolist(props.todolistId, title)
    }

    return (
        <div className={"todolist"}>
            <div className={"todolist-title-container"}>
                <h3><EditableSpan value={title} onChange={updateTodolistHandler}/></h3>
                <IconButton onClick={removeTodolistHandler}>
                    <ClearIcon/>
                </IconButton>
            </div>
            <AddItemForm addItem={addTaskCallback}/>
            {
                tasks.length === 0
                    ? <p>Тасок нет</p>
                    : <List>
                        {tasks.map((task) => {

                            const removeTaskHandler = () => {
                                removeTask(task.id, todolistId)
                            }

                            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
                                const newStatusValue = e.currentTarget.checked
                                changeTaskStatus(task.id, newStatusValue, todolistId)
                            }

                            const changeTaskTitleHandler = (title: string) => {
                                updateTask(todolistId, task.id, title)
                            }

                            return <ListItem key={task.id} className={task.isDone ? 'is-done' : ''}
                                             secondaryAction={
                                                 <IconButton onClick={removeTaskHandler} size="small">
                                                     <ClearIcon fontSize="inherit"/>
                                                 </IconButton>
                                             }
                                             disablePadding
                            >
                                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} size="small"/>
                                <EditableSpan value={task.title} onChange={changeTaskTitleHandler}/>

                            </ListItem>
                        })}
                    </List>
            }
            <div>

                <MyButton
                    title={"All"}
                    onClickHandler={() => changeFilterTasksHandler('all')}
                    color={filter === "all" ? "secondary" : "primary"}
                />
                <MyButton
                    title={"Active"}
                    onClickHandler={() => changeFilterTasksHandler('active')}
                    color={filter === "active" ? "secondary" : "primary"}
                />
                <MyButton
                    title={"Completed"}
                    onClickHandler={() => changeFilterTasksHandler('completed')}
                    color={filter === "completed" ? "secondary" : "primary"}
                />

            </div>
        </div>
    )
}
