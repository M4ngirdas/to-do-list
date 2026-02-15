
import { FaExclamationCircle } from "react-icons/fa"

export default function Input(props) {

    function getStatusMessage() {
        if (props.input.status === "error") {
            return props.name === "taskInput" ? "Task cannot be empty" : "Title cannot be empty"
        }
        else if (props.input.status === "warning") {
            return props.input.value.length >= props.maxLength - 10 ? `Character limit: ${props.input.value.length}/${props.maxLength}` : null
        }
    }

    return (
        <>
            <input
                className={`${props.input.status !== "normal" ? props.input.status === "error" ? "outline-rose-400" : "outline-yellow-500" : "outline-slate-700/50 focus:outline-white"} peer select-none w-full h-11 md:h-12 p-2 rounded-sm outline`}
                ref={props.ref}
                type="text"
                placeholder=" "
                maxLength={props.maxLength}
                defaultValue={props.defaultValue}
                name={props.name}
                onChange={ev => (
                    props.setInput(prev => (
                        { ...prev, value: ev.target.value, status: ev.target.value.length >= props.maxLength - 10 ? "warning" : "normal" }
                    ))
                )}
            />
            <label className={`${props.input.status === "error" ? "text-rose-400" : ""} ${props.input.status === "warning" ? "text-yellow-500" : ""} top-1/2 peer-focus:top-0 peer-not-placeholder-shown:top-0 floating-label bg-slate-950`}>{props.labelText}</label>
            {props.input.status !== "normal" ? <span className={`${props.input.status === "error" ? "text-rose-400" : "text-yellow-500"} flex items-center gap-2 italic absolute left-0 mt-0.5 text-sm`}><FaExclamationCircle /> {getStatusMessage()}</span> : null}
        </>
    )
}