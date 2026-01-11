
import { FaPlus, FaTimes } from "react-icons/fa"

export default function Menu(props) {

    function removeTodo(id) {
        props.todos.length === 1 ? props.setMenuOpen(false) : null
        props.setTodos(prevTodos => {
            const filtered = prevTodos.filter(todo => id !== todo.id)
            filtered.length > 0 ? props.openTodo(filtered[0].id) : null
            return filtered
        })
    }

    const todoElements = props.todos.map(todo => (
        <li key={todo.id} className="flex justify-between items-center gap-2 cursor-default rounded-sm w-60 p-2 outline-2 outline-slate-800 hover:outline-yellow-50">
            <div onClick={() => { props.openTodo(todo.id); props.setMenuOpen(false) }}>
                <p className="truncate">{todo.title}</p>
            </div>
            <div>
                <button onClick={() => removeTodo(todo.id)} className="grid place-items-center h-7 w-7 rounded-sm p-1 hover:bg-red-500"><FaTimes /></button>
            </div>
        </li>
    ))

    return (
        <nav className="flex flex-col w-full items-start gap-4 p-0 md:p-6">
            <button onClick={props.showSettings} className="flex justify-between items-center font-semibold ml-1 gap-2 p-2 rounded-sm w-60 outline-none bg-slate-800">Create new <FaPlus /></button>
            <ul className="scrollbar grid gap-2 pr-2 p-1 overflow-y-auto">{todoElements}</ul>
        </nav>
    )
}