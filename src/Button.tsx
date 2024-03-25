type ButtonPropsType = {
	title: string
	onClick?:()=> void
	disabled?: boolean
}

export const Button = ({title, onClick}: ButtonPropsType) => {
	return (
		<button onClick={onClick}>{title}</button>
	)
}
