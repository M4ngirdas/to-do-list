
import { useState } from "react"
import { nanoid } from "nanoid"
import { FaPlus } from "react-icons/fa"

import { Task } from "./components/Task.jsx"

export function App() {

    const [tasks, setTasks] = useState([])

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
        if (!task) return
        setTasks(prevTasks =>
            [...prevTasks, { id: nanoid(), value: task, checked: false }]
        )
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

    return (
        <main className="flex justify-center items-center h-screen text-lg font-display text-yellow-50 bg-slate-950">
            <div className="grid gap-4">
                <div>
                    <h1 className="font-black text-7xl">List title</h1>
                    <p className="text-lg">List description</p>
                </div>
                <form action={addTask} className="flex gap-2">
                    <button className="grid place-items-center w-12 rounded-sm bg-slate-800"><FaPlus /></button>
                    <input className="h-12 outline-none p-2 rounded-sm border-2 border-slate-700 placeholder:text-slate-700" name="taskInput" type="text" placeholder="Enter task here..." />
                </form>
                {tasks.length > 0 ? <section className="grid gap-4">
                    <div className="grid gap-2">{taskElements}</div>
                    <button onClick={() => setTasks([])} className="p-2 rounded-sm font-semibold bg-slate-800">Clear all</button>
                </section> : null}
            </div>
        </main>
    )
}