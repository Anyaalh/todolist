type ButtonType = {
    title: string
    onClickHandler?: () => void
}

export function Button({title, onClickHandler}: ButtonType) {
    return <button onClick={onClickHandler}>{title}</button>
}