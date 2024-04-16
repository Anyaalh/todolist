type TodoListHeaderType = {
    title: string
}

export function TodoListHeader ({title}: TodoListHeaderType) {
    return <h3>{title}</h3>
}