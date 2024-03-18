import {FilterType, TaskType} from "./App";
import {Button} from "./Button";
import {Task} from "./Task";

type TasksListType = {
    tasks: Array<TaskType>
    removeTask: (taskId: number)=>void
    changeFilter: (filter: FilterType)=> void
}

export function TasksList({changeFilter, tasks, removeTask}: TasksListType) {

    const tasksList = <ul>
        {
            tasks.map(task => {
                return (
                    <li key={task.id}>
                        <Task
                            title={task.title}
                            isDone={task.isDone}
                            removeTask={removeTask}
                            taskId={task.id}
                        />
                    </li>
                )
            })
        }
    </ul>

    return (
        <>
            {tasksList}
            <div>
                <Button onClickHandler={()=>changeFilter("all")} title="All"/>
                <Button onClickHandler={()=>changeFilter("active")} title="Active"/>
                <Button onClickHandler={()=>changeFilter("complited")} title="Complited"/>
            </div>
        </>
    )
}