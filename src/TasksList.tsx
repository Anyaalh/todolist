import {TaskType} from "./App";
import {Button} from "./Button";
import {Task} from "./Task";

type TasksListType = {
    tasks: Array<TaskType>
}

export function TasksList({tasks}: TasksListType) {

    const tasksList = <ul>
        {
            tasks.map(task => {
                return (
                    <li key={task.id}>
                        <Task title={task.title} isDone={task.isDone}/>
                    </li>
                )
            })
        }
    </ul>

    return (
        <>
            {tasksList}
            <div>
                <Button title="All"/>
                <Button title="Active"/>
                <Button title="Complited"/>
            </div>
        </>
    )
}