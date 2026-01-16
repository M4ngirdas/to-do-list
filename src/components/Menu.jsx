
import { FaPlus, FaTimes } from "react-icons/fa"

export default function Menu(props) {

    const todoElements = props.todos.map(todo => (
        <li key={todo.id} className="flex h-12 w-60 rounded-sm outline-2 outline-slate-800">
            <div onClick={() => { props.openTodo(todo.id); props.setMenuOpen(false) }} className="flex justify-between items-center gap-2 cursor-default w-60 p-2">
                <p onClick={() => { props.openTodo(todo.id); props.setMenuOpen(false) }} className="truncate w-45">{todo.title}</p>
            </div>
            <div className="grid place-items-center p-2">
                <button onClick={() => props.showConfirmation("todos", todo.id)} className="grid place-items-center h-7 w-7 rounded-sm hover:bg-red-500"><FaTimes /></button>
            </div>
        </li>
    ))

    return (
        <nav className="flex flex-col items-start gap-4 p-0 md:p-6">
            <button onClick={() => props.showSettings("menu")} className="flex justify-between items-center font-semibold h-12 ml-1 p-2 gap-2 rounded-sm w-60 outline-none bg-slate-800">Create new <span className="px-2"><FaPlus /></span></button>
            <ul className="scrollbar grid gap-2 pr-2 p-1 overflow-y-auto">{todoElements}</ul>
        </nav>
    )
}