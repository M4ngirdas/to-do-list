
import { FaCheck, FaTimes } from "react-icons/fa";

export function Task(props) {

    return (
        <article className="flex gap-2">
            <button title={props.checked ? "Click to uncheck" : "Click to check"} onClick={props.checkTask} className={`${props.checked ? "bg-emerald-600" : "bg-yellow-50 text-slate-300"} grid place-items-center w-12 h-12 rounded-sm`}><FaCheck /></button>
            <div className="flex-1 flex justify-between gap-2 items-center p-2 rounded-sm bg-slate-900">
                <p className={`${props.checked ? "text-emerald-600 line-through" : "text-yellow-50"} w-1 flex-1 whitespace-nowrap overflow-hidden hover:whitespace-normal hover:overflow-visible hover:break-all`}>{props.value}</p>
                <button onClick={props.removeTask} className="shrink-0 grid place-items-center h-7 w-7 rounded-sm p-1 bg-red-500"><FaTimes /></button>
            </div>
        </article>
    )
}