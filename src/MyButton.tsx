import Button from "@mui/material/Button";

type MyButtonType = {
    title: string
    onClickHandler:()=> void
    color: "inherit" | "secondary" | "primary" | "success" | "error" | "info" | "warning" | undefined
    disabled?: boolean
}

export const MyButton = ({color,disabled, title, onClickHandler}: MyButtonType) => {
    return (
        <Button
            sx={{m: "0 2px"}}
            onClick={onClickHandler}
            variant='contained'
            size='small'
            color={color}
            disabled={disabled}
        >
            {title}
        </Button>
    )
}