type ButtonType = {
   title: string
 }

export function Button (props: ButtonType) {
   return <button>{props.title}</button>
}