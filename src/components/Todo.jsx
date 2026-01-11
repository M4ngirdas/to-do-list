
import { useState } from "react"
import { FaCog, FaPlus } from "react-icons/fa"

export default function Todo(props) {

    const [expand, setExpand] = useState(false)

    return (
        <section className={`${props.tasksLength > 0 ? "gap-15" : ""} flex flex-col min-h-0 w-full mx-auto my-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl`}>
            <div className="flex flex-col gap-4 min-h-0">
                <div className="flex justify-between gap-4">
                    <div>
                        <div onClick={() => setExpand(prevExpand => !prevExpand)} className="wrap-anywhere cursor-pointer md:cursor-default md:h-full">
                            <h1 className="font-bold text-4xl md:text-5xl">{props.currentTodo ? props.currentTodo.title : null}</h1>
                            <p className={`${props.currentTodo.title.length <= 30 || expand ? "block" : "hidden"} md:block text-slate-500`}>{props.currentTodo ? props.currentTodo.desc : null}</p>
                        </div>
                    </div>
                    <div>
                        <button
                            onClick={() => props.showSettings("rename")}
                            className="grid place-items-center gap-2 h-12 w-12 font-semibold top-4 rounded-sm p-2 bg-slate-800"
                        ><FaCog />
                        </button>
                    </div>
                </div>
                <form action={props.addTask} className="flex gap-2 w-full">
                    <button className="grid place-items-center w-12 rounded-sm bg-slate-800"><FaPlus /></button>
                    <div className="relative flex-1">
                        <input
                            className="peer select-none h-12 w-full flex-1 outline-none p-2 rounded-sm border-2 border-slate-800 focus:border-yellow-50"
                            name="taskInput"
                            type="text"
                            required
                            maxLength={100}
                        ></input>
                        <label className="floating-label bg-slate-950">Enter task here...</label>
                    </div>
                </form>
                {props.tasksLength > 0 ? <div className="flex flex-col gap-4 min-h-0">
                    <div className="flex items-center gap-2">
                        <meter className="flex-1 h-5" min={0} max={props.tasksLength} value={props.completedTaskCount}></meter>
                        <p className={`${props.completedTaskCount === props.tasksLength ? "text-emerald-600" : "text-slate-500"} font-semibold`}>{props.completedTaskCount}/{props.currentTodo.tasks.length} complete</p>
                    </div>
                    <ul className="scrollbar grid gap-2 w-full pr-2 overflow-y-auto">{props.taskElements}</ul>
                    <button onClick={props.handleConfirmation} className="p-2 rounded-sm font-semibold bg-slate-800">{props.confirmation ? <p>Are you sure? <span className="italic">(click to confirm)</span></p> : "Clear all"}</button>
                </div> : null}
            </div>
        </section>
    )
}