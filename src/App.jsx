
import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import { FaCog, FaPlus } from "react-icons/fa"

import Task from "./components/Task.jsx"
import Menu from "./components/Menu.jsx"
import Settings from "./components/Settings.jsx"

export default function App() {

    const [todos, setTodos] = useState(() => {
        const savedTodos = localStorage.getItem("todos")
        return savedTodos ? JSON.parse(savedTodos) : []
    })
    const [confirmation, setConfirmation] = useState(false)
    const [settingsOpen, setSettingsOpen] = useState(false)
    const [settingsSource, setSettingsSource] = useState(null)

    const settingsRef = useRef(null)

    const currentTodo = todos.find(todo => todo.open)
    const tasksLength = currentTodo?.tasks.length
    const completedTaskCount = currentTodo?.tasks.filter(task => task.checked).length

    useEffect(() => (
        localStorage.setItem("todos", JSON.stringify(todos))
    ), [todos])

    function openTodo(id) {
        setTodos(prevTodos => prevTodos.map(todo => (
            { ...todo, open: id === todo.id }
        )))
    }

    function showSettings(source) {
        setSettingsSource(source)
        settingsRef.current.showModal()
        setSettingsOpen(true)
    }

    function closeSettings() {
        settingsRef.current.close()
        setSettingsOpen(false)
    }

    function addTask(formData) {
        const task = formData.get("taskInput")
        if (task.trim().length === 0) return
        setTodos(prevTodos => prevTodos.map(todo => (
            todo.open ? { ...todo, tasks: [...todo.tasks, { id: nanoid(), value: task, checked: false }] } : todo
        )))
    }

    function checkTask(id) {
        setTodos(prevTodos => prevTodos.map(todo => (
            {
                ...todo,
                tasks: todo.tasks.map(task => id === task.id ? { ...task, checked: !task.checked } : task)
            }
        )))
    }

    function removeTask(id) {
        setTodos(prevTodos => prevTodos.map(todo => (
            {
                ...todo,
                tasks: todo.tasks.filter(task => id === task.id ? !task : task)
            }
        )))
    }

    function handleConfirmation() {
        setConfirmation(true)
        setTimeout(() => (
            setConfirmation(false)
        ), 2000)
        if (confirmation) {
            setTodos(prevTodos => prevTodos.map(todo => (todo.open ? { ...todo, tasks: [] } : todo)))
            setConfirmation(false)
        }
    }

    const taskElements = todos.map(todo => todo.open ? todo.tasks.map(task => (
        <Task
            key={task.id}
            value={task.value}
            checked={task.checked}
            checkTask={() => checkTask(task.id)}
            removeTask={() => removeTask(task.id)}
        />
    )) : null)

    return (
        <>
            <div className="flex h-screen">
                <Menu
                    showSettings={() => showSettings("menu")}
                    openTodo={openTodo}
                    setTodos={setTodos}
                    todos={todos}
                    currentTodo={currentTodo}
                />
                {todos.length === 0 ? <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <h1 className="text-4xl">You haven't created a to-do list yet!</h1>
                    <h2>Click create new to make one</h2>
                </div> : null}
                {todos.length > 0 ? <main className="flex flex-col flex-1 items-center p-6 text-lg">
                    <div className={`${tasksLength > 0 ? "gap-15" : ""} flex flex-col min-h-0 w-full mx-auto my-auto md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-6xl`}>
                        <section className="flex flex-col gap-4 min-h-0">
                            <div className="flex justify-between wrap-anywhere">
                                <div>
                                    <h1 className="font-bold text-6xl">{currentTodo ? currentTodo.title : null}</h1>
                                    <p className="text-slate-500">{currentTodo ? currentTodo.desc : null}</p>
                                </div>
                                <button
                                    onClick={() => showSettings("rename")}
                                    className="grid place-items-center gap-2 w-12 h-12 font-semibold top-4 rounded-sm p-2 bg-slate-800"
                                ><FaCog />
                                </button>
                            </div>
                            <form action={addTask} className="flex gap-2 w-full">
                                <button className="grid place-items-center w-12 rounded-sm bg-slate-800"><FaPlus /></button>
                                <div className="relative flex-1">
                                    <input
                                        className="peer select-none w-full flex-1 outline-none p-2 rounded-sm border-2 border-slate-800 focus:border-yellow-50"
                                        name="taskInput"
                                        type="text"
                                        required
                                        maxLength={100}
                                    ></input>
                                    <label className="floating-label bg-slate-950">Enter task here...</label>
                                </div>
                            </form>
                            {tasksLength > 0 ? <div className="flex flex-col gap-4 min-h-0">
                                <div className="flex items-center gap-2">
                                    <meter className="flex-1 h-5" min={0} max={tasksLength} value={completedTaskCount}></meter>
                                    <p className={`${completedTaskCount === tasksLength ? "text-emerald-600" : "text-slate-500"} font-semibold`}>{completedTaskCount}/{currentTodo.tasks.length} complete</p>
                                </div>
                                <ul className="scrollbar grid gap-2 w-full overflow-y-auto pr-2">{taskElements}</ul>
                                <button onClick={handleConfirmation} className="p-2 rounded-sm font-semibold bg-slate-800">{confirmation ? <p>Are you sure? <span className="italic">(click to confirm)</span></p> : "Clear all"}</button>
                            </div> : null}
                        </section>
                    </div>
                </main> : null}
            </div>
            <Settings
                settingsRef={settingsRef}
                settingsOpen={settingsOpen}
                closeSettings={closeSettings}
                settingsSource={settingsSource}
                setTodos={setTodos}
                todos={todos}
                currentTodo={currentTodo}
            />
        </>
    )
}