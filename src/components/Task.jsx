
import { FaCheck, FaTimes } from "react-icons/fa";

export function Task(props) {
    return (
        <article className="flex gap-2">
            <button onClick={props.checkTask} className={`${props.checked ? "bg-emerald-700" : "bg-yellow-50"} grid place-items-center w-12 h-12 rounded-sm`}>{props.checked ? <FaCheck /> : null}</button>
            <div className="flex-1 flex justify-between items-center px-2 rounded-sm bg-slate-900">
                <p className={`${props.checked ? "text-emerald-700 line-through" : "text-yellow-50"}`}>{props.value}</p>
                <button onClick={props.removeTask} className="rounded-sm p-1 bg-red-500"><FaTimes /></button>
            </div>
        </article>
    )
}