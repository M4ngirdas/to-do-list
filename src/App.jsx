
import { useState, useEffect, useRef } from "react"
import { nanoid } from "nanoid"
import { FaBars, FaPlus, FaTimes } from "react-icons/fa"

import Todo from "./components/Todo.jsx"
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
    const [menuOpen, setMenuOpen] = useState(false)

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
                <div>
                    <div className="block md:hidden">
                        {todos.length === 0 ? <div className="p-6">
                            <button onClick={() => showSettings("menu")} className="flex justify-between items-center w-60 font-semibold ml-1 gap-2 p-2 rounded-sm bg-slate-800">Create new <FaPlus /></button>
                        </div> : null}
                        <div className={`${menuOpen ? "flex" : "hidden"} justify-between gap-4 w-full sm:w-fit p-6 fixed z-48 h-full bg-gray-950`}>
                            <Menu
                                showSettings={() => showSettings("menu")}
                                openTodo={openTodo}
                                setTodos={setTodos}
                                todos={todos}
                                currentTodo={currentTodo}
                                forSmallerScreens={true}
                                setMenuOpen={setMenuOpen}
                            />
                            <div>
                                <button onClick={() => setMenuOpen(false)} className="grid place-items-center h-7 w-7 rounded-sm p-1 bg-red-500"><FaTimes /></button>
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:flex">
                        <Menu
                            showSettings={() => showSettings("menu")}
                            openTodo={openTodo}
                            setTodos={setTodos}
                            todos={todos}
                            currentTodo={currentTodo}
                            forSmallerScreens={false}
                            setMenuOpen={setMenuOpen}
                        />
                    </div>
                </div>
                {todos.length === 0 ? <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                    <h1 className="text-4xl">You haven't created a to-do list yet!</h1>
                    <h2>Click create new to make one</h2>
                </div> : null}
                {todos.length > 0 ? <main className="flex flex-col items-center flex-1 gap-4 p-6 text-base md:text-lg">
                    {todos.length > 0 ? <button onClick={() => setMenuOpen(true)} className="flex justify-center items-center gap-2 w-full p-2 rounded-sm md:hidden outline outline-slate-800 bg-slate-900"><FaBars />Menu</button> : null}
                    <Todo
                        currentTodo={currentTodo}
                        tasksLength={tasksLength}
                        completedTaskCount={completedTaskCount}
                        confirmation={confirmation}
                        handleConfirmation={handleConfirmation}
                        addTask={addTask}
                        taskElements={taskElements}
                        showSettings={showSettings}
                        todos={todos}
                    />
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