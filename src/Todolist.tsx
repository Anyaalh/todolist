import {FilterValuesType, getFilteredTasks, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    filter: FilterValuesType
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
    changeTaskStatus: (id: string, newIsDone: boolean) => void
}

export const Todolist = ({filter, changeTaskStatus, addTask, title, tasks, removeTask, changeFilter}: PropsType) => {
    const [taskTitle, setTaskTitle] = useState('')
    const [taskInputError, setTaskInputError] = useState(false)
    const [isCollapsed, setIsCollapsed] = useState(false)

    function addTasks() {
        const trimmedTitle = taskTitle.trim()
        if (trimmedTitle) {
            addTask(trimmedTitle)
        } else {
            setTaskInputError(true)
        }
        setTaskTitle('')
    }

    function onChangeInputTitle(e: ChangeEvent<HTMLInputElement>) {
        setTaskTitle(e.currentTarget.value)
        e.currentTarget.value.length > 15 && setTaskInputError(true)
        if (taskInputError) {
            e.currentTarget.value.length <= 15 && setTaskInputError(false)
        }
    }

    function onKeyDownAddTaskHandler(e: KeyboardEvent<HTMLInputElement>) {
        if (!taskInputError) {
            e.key === "Enter" && addTasks()
        }
    }

    const isAddTaskBtnDisabled = taskTitle.length === 0 || taskTitle.length > 15
    const taskTitleInputErrorClass = taskInputError
        ? "taskTitleInputError"
        : ""

    const activeTasksCounter = getFilteredTasks(tasks, "active").length

    return (
        <div>
            <h3>
                {title}
                {isCollapsed && <span className="tasks-counter">active: {activeTasksCounter}</span>}

                <button onClick={() => setIsCollapsed(!isCollapsed)}>{isCollapsed ? "Open" : "Close"}</button>
            </h3>

            {isCollapsed
                ? null
                :
                <>

                    <div>
                        <input
                            value={taskTitle}
                            className={taskTitleInputErrorClass}
                            placeholder={"Enter title max 15 charters"}
                            onChange={onChangeInputTitle}
                            onKeyDown={onKeyDownAddTaskHandler}/>

                        <button
                            disabled={isAddTaskBtnDisabled}
                            onClick={addTasks}>+
                        </button>
                        {taskInputError && <div style={{color: "red"}}>Enter correct title</div>}
                    </div>

                    {
                        tasks.length === 0
                            ? <p>Тасок нет</p>
                            : <ul>
                                {tasks.map(task => {
                                    return (
                                        <li key={task.id}>
                                            <input
                                                onChange={(e) => changeTaskStatus(task.id, e.currentTarget.checked)}
                                                type="checkbox"
                                                checked={task.isDone}/>
                                            <span  className={task.isDone ? "task-done task" : "task"}>
                                                {task.title}
                                            </span>
                                            <Button title={'x'} onClick={() => removeTask(task.id)}/>
                                        </li>
                                    )
                                })}
                            </ul>
                    }
                    <div>
                        <Button className={filter === "all" ? "filter-btn-active" : undefined} title={'All'} onClick={() => changeFilter('all')}/>
                        <Button className={filter === "active" ? "filter-btn-active" : undefined} title={'Active'} onClick={() => changeFilter('active')}/>
                        <Button className={filter === "completed" ? "filter-btn-active" : undefined} title={'Completed'} onClick={() => changeFilter('completed')}/>
                    </div>

                </>
            }
        </div>
    )
}
