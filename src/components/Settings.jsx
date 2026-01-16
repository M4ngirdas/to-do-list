
import { nanoid } from "nanoid"
import { FaTimes } from "react-icons/fa"

export default function Settings(props) {

    function handleSettings(formData) {
        const title = formData.get("titleInput")
        const desc = formData.get("descInput")

        if (title.trim().length === 0 && desc.trim().length === 0) return

        if (props.settingsSource === "menu") {
            props.setTodos(prevTodos =>
                [...prevTodos, { id: nanoid(), title: title, desc: desc, tasks: [], open: props.todos.length + 1 === 1 ? true : false }]
            )
        }
        else {
            props.setTodos(prevTodos => prevTodos.map(todo => (
                todo.open ? { ...todo, title: title, desc: desc } : todo
            )))
        }
        props.setSettingsOpen(false)
    }

    return (
        <>
            <div className="fixed z-49 inset-0 bg-black/50"></div>
            <div className="flex justify-center p-6 fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-full">
                <div className="grid text-base w-full sm:max-w-xl md:text-lg 2xl:max-w-2xl gap-4 rounded-md p-4 bg-slate-900 text-yellow-50">
                    <section className="flex justify-between">
                        <div>
                            <h1 className="font-bold text-4xl md:text-5xl">Settings</h1>
                            <p className="text-slate-500">{props.settingsSource === "menu" ? "Create a new" : "Rename your"} to-do list.</p>
                        </div>
                        <button onClick={() => props.setSettingsOpen(false)} className="grid place-items-center w-7 h-7 rounded-sm p-1 bg-red-500"><FaTimes /></button>
                    </section>
                    <form action={handleSettings} className="grid gap-4">
                        <section className="grid gap-4 w-full md:flex md:gap-2">
                            <div className="relative w-full">
                                <input
                                    className="peer w-full h-12 outline-none p-2 rounded-sm border border-slate-800 focus:border-yellow-50"
                                    name="titleInput"
                                    type="text"
                                    required
                                    placeholder=" "
                                    maxLength={50}
                                ></input>
                                <label className="floating-label">Title</label>
                            </div>
                            <div className="relative w-full">
                                <input
                                    className="peer w-full h-12 outline-none p-2 rounded-sm border border-slate-800 focus:border-yellow-50"
                                    name="descInput"
                                    type="text"
                                    required
                                    placeholder=" "
                                    maxLength={100}
                                ></input>
                                <label className="floating-label">Description</label>
                            </div>
                        </section>
                        <div className="flex gap-2 font-semibold">
                            <button className="rounded-sm flex-1 p-2 bg-slate-800">{props.settingsSource === "menu" ? "Create new" : "Save changes"}</button>
                            <button onClick={() => props.setSettingsOpen(false)} type="button" className="rounded-sm px-4 bg-red-500">Cancel</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}