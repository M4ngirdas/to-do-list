
import { FaTimes } from "react-icons/fa"

export function Settings(props) {

    // change title and description
    function changeDetails(formData){
        const title = formData.get("titleInput")
        const desc = formData.get("descInput")
        props.setTitle(title)
        props.setDesc(desc)
        props.closeSettings()
        props.handleTaskInputFocus()
    }

    return (
        <dialog ref={props.settingsRef} className={`${props.settingsOpen ? "grid" : "hidden"} gap-4 text-lg rounded-md p-4 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-yellow-50 bg-slate-900`}>
            <section className="flex justify-between">
                <div>
                    <h1 className="font-bold text-5xl">Settings</h1>
                    <p>Rename your to-do list.</p>
                </div>
                <button onClick={props.closeSettings} className="grid place-items-center w-7 h-7 rounded-sm p-1 bg-red-500"><FaTimes /></button>
            </section>
            <form action={changeDetails} className="grid gap-4">
                <section className="flex gap-2">
                    <div className="relative">
                        <input
                            className="peer h-12 outline-none p-2 rounded-sm border-2 border-slate-800 focus:border-yellow-50"
                            id="titleInput"
                            name="titleInput"
                            type="text"
                            required
                            placeholder=" "
                        ></input>
                        <label htmlFor="titleInput" className="floating-label">Title</label>
                    </div>
                    <div className="relative">
                        <input
                            className="peer h-12 outline-none p-2 rounded-sm border-2 border-slate-800 focus:border-yellow-50"
                            id="descInput"
                            name="descInput"
                            type="text"
                            required
                            placeholder=" "
                        ></input>
                        <label htmlFor="descInput" className="floating-label">Description</label>
                    </div>
                </section>
                <div className="flex gap-2 font-semibold">
                    <button className="rounded-sm flex-1 p-2 bg-slate-800">Save changes</button>
                    <button onClick={props.closeSettings} type="button" className="rounded-sm px-4 bg-red-500">Cancel</button>
                </div>
            </form>
        </dialog>
    )
}