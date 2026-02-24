
import { useState, useEffect, useRef } from "react"
import { FaCheck, FaEdit, FaEllipsisV, FaEraser, FaPlus, FaTimes, FaTrashAlt } from "react-icons/fa"
import { nanoid } from "nanoid"

import Input from "./Input.jsx"

export default function List(props) {
    const [addTaskInput, setAddTaskInput] = useState({ value: null, status: "normal" })
    const [isTaskInputEmpty, setIsTaskInputEmpty] = useState(false)
    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false)

    const addTaskInputRef = useRef(null)
    const taskContainerRef = useRef(null)

    const completedTasksPercent = (props.completedTaskCount / props.tasksLength) * 100

    useEffect(() => {
        setIsScrollbarVisible(taskContainerRef.current?.scrollHeight > taskContainerRef.current?.clientHeight)
    }, [props.tasksLength])

    function addTask(formData) {
        const task = formData.get("addTaskInput")

        if (task.trim().length === 0) {
            setAddTaskInput(prev => ({ ...prev, status: "error" }))
            addTaskInputRef.current?.focus()
            return
        }
        else {
            setAddTaskInput(prev => ({ ...prev, status: "normal" }))
        }
        props.setLists(prev => prev.map(list => (
            list.open ? { ...list, tasks: [...list.tasks, { id: nanoid(), value: task, checked: false }] } : list
        )))
    }

    function editTask(id, ev) {
        props.setLists(prev => prev.map(list => ({
            ...list,
            tasks: list.tasks.map(task => id === task.id ? { ...task, value: ev.target.value } : task)
        })))
    }

    function checkTask(id) {
        props.setLists(prev => prev.map(list => ({
            ...list,
            tasks: list.tasks.map(task => id === task.id ? { ...task, checked: !task.checked } : task)
        })))
    }

    function removeTask(id) {
        props.setLists(prev => prev.map(list => ({
            ...list,
            tasks: list.tasks.filter(task => id !== task.id)
        })))
    }

    const taskElements = props.currentList?.tasks.map(task =>
        <li key={task.id} className="flex gap-2 w-full">
            <button title={task.checked ? "Uncheck task" : "Check task"} onClick={() => checkTask(task.id)} className={`${task.checked ? "bg-emerald-700 border-transparent" : "border border-slate-700/50 text-transparent hover:text-slate-700/50 hover:bg-slate-700/20"} grid place-items-center w-11 md:w-12 h-11 md:h-12 rounded-sm transition-all duration-200 active:scale-95`}><FaCheck /></button>
            <div className="flex justify-between items-center gap-2 flex-1 p-2 rounded-sm bg-slate-900" >
                <input
                    type="text"
                    title={task.checked ? "" : "Edit task"}
                    disabled={task.checked}
                    onBlur={() => {
                        if (isTaskInputEmpty) {
                            removeTask(task.id)
                            setIsTaskInputEmpty(false)
                        }
                    }}
                    onChange={ev => {
                        editTask(task.id, ev)
                        if (ev.target.value.length === 0) {
                            setIsTaskInputEmpty(true)
                        }
                    }}
                    defaultValue={task.value}
                    maxLength={100}
                    className={`${task.checked ? "text-emerald-800 line-through" : "text-white hover:border-slate-700/50 focus:border-white"} truncate w-1 flex-1 py-1 outline-none trasition-colors duration-200 border-b border-transparent`}
                />
                <button onClick={() => removeTask(task.id)} className="grid place-items-center w-7 h-7 rounded-sm hover:bg-rose-700"><FaTimes /></button>
            </div>
        </li >
    )

    return (
        <>
            {props.isDropdownOpen ? <div onClick={() => props.setIsDropdownOpen(false)} className="fixed inset-0 z-39"></div> : null}
            <section className={`${props.tasksLength === 0 ? "flex flex-col" : "grid content-start"} gap-4 mt-12 md:mt-0 min-h-0 h-full relative`}>
                <div className="flex justify-between">
                    <div title="Edit list" onClick={props.showSettings} className={`${props.currentList.desc ? "gap-2" : "gap-0"} grid cursor-pointer wrap-anywhere`}>
                        <h1 className="font-bold text-4xl md:text-5xl">{props.currentList ? props.currentList.title : null}</h1>
                        <p className="text-slate-500">{props.currentList ? props.currentList.desc : null}</p>
                    </div>
                    <div>
                        <button title="List options" onClick={() => props.setIsDropdownOpen(prev => !prev)} className="rounded-full p-2 hover:bg-slate-700/50" ><FaEllipsisV /></button>
                        <ul className={`${props.isDropdownOpen ? "scale-100 opacity-100" : "scale-0 opacity-0"} z-40 overflow-hidden transition-all duration-200 origin-top-right gap-2 absolute right-0 rounded-md border border-slate-700/50 bg-slate-900`}>
                            <li onClick={props.showSettings} className="flex items-center gap-2 cursor-pointer h-11 md:h-12 p-4 bg-slate-900 hover:bg-slate-700/50"> <span className="px-2"><FaEdit /></span> Edit list</li>
                            {props.tasksLength > 0 ? <li onClick={() => props.showConfirmation("task", props.currentList.id)} className="flex items-center gap-2 cursor-pointer h-11 md:h-12 p-4 text-rose-400 hover:bg-rose-700/20"> <span className="px-2"><FaEraser /></span> Erase tasks</li> : null}
                            <li onClick={() => props.showConfirmation("list", props.currentList.id)} className="flex items-center gap-2 cursor-pointer h-11 md:h-12 p-4 text-rose-400 hover:bg-rose-700/20"> <span className="px-2"><FaTrashAlt /></span> Delete list</li>
                        </ul>
                    </div>
                </div>
                <div className={`${props.tasksLength === 0 ? "h-fit" : "min-h-full"} grid gap-6`}>
                    <form action={addTask} className="flex gap-2 w-full">
                        <button type="submit" className="grid place-items-center w-11 md:w-12 h-11 md:h-12 rounded-sm transition-transform duration-200 active:scale-95 bg-slate-700/50 hover:bg-slate-700/70"><FaPlus /></button>
                        <div className="relative flex-1 h-fit">
                            <Input
                                labelText="Enter task here..."
                                maxLength={100}
                                ref={addTaskInputRef}
                                input={addTaskInput}
                                setInput={setAddTaskInput}
                                name="addTaskInput"
                                error={addTaskInput.error}
                            />
                        </div>
                    </form>
                    {props.tasksLength > 0 ? <div className="flex flex-col gap-2 min-h-full">
                        <div className="flex items-center gap-2">
                            <div className="flex-1 h-2.5 rounded-full bg-slate-800">
                                <div style={{ width: `${completedTasksPercent}%` }} className="h-2.5 rounded-full transition-all duration-200 bg-emerald-700"></div>
                            </div>
                            <p className={`${props.completedTaskCount === props.tasksLength ? "text-emerald-700" : "text-slate-500"} font-semibold`}>{`${props.completedTaskCount}/${props.tasksLength} complete`}</p>
                        </div>
                        <ul ref={taskContainerRef} className={`${isScrollbarVisible ? "pr-2" : ""} grid gap-2 h-full overflow-y-auto scrollbar`}>{taskElements}</ul>
                    </div> : null}
                </div>
                {props.tasksLength === 0 ? <div className="grid place-items-center content-center gap-2 flex-1">
                    <h1 className="font-bold text-3xl md:text-4xl">It's empty here...</h1>
                    <p className="text-slate-500">Add a task!</p>
                </div> : null}
            </section >
        </>
    )
}