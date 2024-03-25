import {FilterValuesType, TaskType} from "./App";
import {Button} from "./Button";
import {ChangeEvent, KeyboardEvent, useState} from "react";

type PropsType = {
    title: string
    tasks: TaskType[]
    removeTask: (taskId: string) => void
    changeFilter: (filter: FilterValuesType) => void
    addTask: (title: string) => void
}

export const Todolist = ({addTask, title, tasks, removeTask, changeFilter}: PropsType) => {
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

    return (
        <div>
            <h3>
                {title}
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
                                    <input type="checkbox" checked={task.isDone}/>
                                    <span>{task.title}</span>
                                    <Button title={'x'} onClick={() => removeTask(task.id)}/>
                                </li>
                            )
                        })}
                    </ul>
            }
            <div>
                <Button title={'All'} onClick={() => changeFilter('all')}/>
                <Button title={'Active'} onClick={() => changeFilter('active')}/>
                <Button title={'Completed'} onClick={() => changeFilter('completed')}/>
            </div>

                </>
            }
        </div>
    )
}
