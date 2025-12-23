
import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import { FaCog, FaPlus } from "react-icons/fa"

import { Task } from "./components/Task.jsx"
import { Settings } from "./components/Settings.jsx"

export function App() {

    const [title, setTitle] = useState(() => {
        const savedTitle = localStorage.getItem("title")
        return savedTitle || "List title"
    })
    const [desc, setDesc] = useState(() => {
        const savedDesc = localStorage.getItem("desc")
        return savedDesc || "List description"
    })
    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks")
        return JSON.parse(savedTasks) || []
    })
    const [confirmation, setConfirmation] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)

    const settingsRef = useRef(null)
    const taskInputRef = useRef(null)

    useEffect(() => {
        localStorage.setItem("title", title)
        localStorage.setItem("desc", desc)
    }, [title && desc])

    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks))
    }, [tasks])

    function handleTaskInputFocus() {
        taskInputRef.current.focus()
    }

    function showSettings() {
        if (settingsRef.current) {
            settingsRef.current.showModal()
            setSettingsOpen(true)
        }
    }

    function closeSettings() {
        if (settingsRef.current) {
            settingsRef.current.close()
            setSettingsOpen(false)
            handleTaskInputFocus()
        }
    }

    function checkTask(id) {
        setTasks(prevTasks => prevTasks.map((task) => (
            id === task.id
                ? { ...task, checked: !task.checked }
                : task
        )))
    }

    function removeTask(id) {
        setTasks(prevTasks => prevTasks.filter(task => (
            id === task.id
                ? !task
                : task
        )))
    }

    function addTask(formData) {
        const task = formData.get("taskInput")
        if (task.trim().length === 0) return
        setTasks(prevTasks =>
            [...prevTasks, { id: nanoid(), value: task, checked: false }]
        )
    }

    function handleConfirmation() {
        setConfirmation(true)
        setTimeout(() => (
            setConfirmation(false)
        ), 2000)
        if (confirmation) {
            setTasks([])
            setConfirmation(false)
        }
    }

    const taskElements = tasks.map(task => (
        <Task
            key={task.id}
            value={task.value}
            checked={task.checked}
            checkTask={() => checkTask(task.id)}
            removeTask={() => removeTask(task.id)}
        />
    ))

    const completedCount = tasks.filter(task => task.checked).length

    return (
        <>
            <main className="grid place-items-center h-screen p-5 text-lg text-yellow-50">
                <div className={`${tasks.length > 0 ? "gap-15" : ""} p-4 grid w-full md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl`}>
                    <div className="flex justify-center">
                        <button onClick={showSettings} className="flex justify-center items-center gap-2 w-60 font-semibold absolute top-4 rounded-sm p-2 bg-slate-800"><FaCog /> Settings</button>
                    </div>
                    <div className="grid gap-4">
                        <div className="wrap-anywhere">
                            <h1 className="font-bold text-6xl">{title}</h1>
                            <p className="text-lg">{desc}</p>
                        </div>
                        <form action={addTask} className="flex gap-2 w-full">
                            <button className="grid place-items-center w-12 rounded-sm bg-slate-800"><FaPlus /></button>
                            <div className="relative flex-1">
                                <input
                                    ref={taskInputRef}
                                    className="peer select-none w-full flex-1 outline-none p-2 rounded-sm border-2 border-slate-800 focus:border-yellow-50"
                                    id="taskInput"
                                    name="taskInput"
                                    type="text"
                                    required
                                    placeholder=" "
                                    maxLength={100}
                                    minLength={1}
                                ></input>
                                <label htmlFor="taskInput" className="floating-label bg-slate-950">Enter task here...</label>
                            </div>
                        </form>
                        {tasks.length > 0 ? <section className="grid gap-4">
                            <div className="grid gap-2">
                                <div className="flex items-center gap-2">
                                    <meter className="flex-1 h-5" min={0} max={tasks.length} value={completedCount}></meter>
                                    <p className={`${completedCount === tasks.length ? "text-emerald-600" : "text-slate-500"} font-semibold`}>{completedCount}/{tasks.length} complete</p>
                                </div>
                                {taskElements}
                            </div>
                            <button onClick={handleConfirmation} className="p-2 rounded-sm font-semibold bg-slate-800">{confirmation ? <p>Are you sure? <span className="italic">(click to confirm)</span></p> : "Clear all"}</button>
                        </section> : null}
                    </div>
                </div>
            </main>
            <Settings
                settingsRef={settingsRef}
                settingsOpen={settingsOpen}
                closeSettings={closeSettings}
                setTitle={setTitle}
                setDesc={setDesc}
                handleTaskInputFocus={handleTaskInputFocus}
            />
        </>
    )
}