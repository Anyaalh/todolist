import {ChangeEvent, KeyboardEvent, useState} from "react";
import IconButton from "@mui/material/IconButton";
import AddIcon from '@mui/icons-material/Add';
import TextField from "@mui/material/TextField";


type PropsType = {
    addItem: (title: string) => void
}

export const AddItemForm = ({addItem}: PropsType) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const addItemHandler = () => {
        if (title.trim() !== '') {
            addItem(title.trim())
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    const changeItemHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }

    const addItemOnKeyUpHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (event.key === 'Enter') {
            addItemHandler()
        }
    }
    return (
        <div style={{display: "flex", alignItems: "center"}}>
            <TextField
                className={error ? 'error' : ''}
                value={title}
                onChange={changeItemHandler}
                onKeyUp={addItemOnKeyUpHandler}
                label="Enter a title"
                size={'small'}
                error={!!error}
                helperText={error}
            />
            <IconButton onClick={addItemHandler}>
                <AddIcon/>
            </IconButton>
        </div>
    )
}


