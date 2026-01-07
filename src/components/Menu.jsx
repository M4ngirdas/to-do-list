
import { FaTimes } from "react-icons/fa"

export default function Menu(props) {

    function removeTodo(id) {
        props.setTodos(prevTodos => {
            const filtered = prevTodos.filter(todo => id !== todo.id)
            filtered.length > 0 ? props.openTodo(filtered[0].id) : null
            return filtered
        })
    }

    const todoElements = props.todos.map(todo => (
        <li key={todo.id} onClick={() => props.openTodo(todo.id)} className="group cursor-default flex justify-between items-center gap-2 rounded-sm w-50 p-2 outline-2 outline-slate-800 hover:outline-yellow-50">
            <p className="truncate">{todo.title}</p>
            <button onClick={() => removeTodo(todo.id)} className="invisible grid place-items-center h-7 w-7 rounded-sm p-1 group-hover:visible hover:bg-red-500"><FaTimes /></button>
        </li>
    ))

    return (
        <aside className="flex flex-col items-start p-6 gap-4">
            <button onClick={props.showSettings} className="w-50 flex font-semibold ml-1 gap-2 p-2 rounded-sm bg-slate-800">Create new</button>
            <ul className="scrollbar grid gap-2 pr-2 p-1 overflow-y-auto">{todoElements}</ul>
        </aside>
    )
}