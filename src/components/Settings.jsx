
import { useState, useRef } from "react"
import { nanoid } from "nanoid"
import { FaExclamationCircle, FaTimes } from "react-icons/fa"

import Input from "./Input.jsx"

export default function Settings(props) {

    const [titleInput, setTitleInput] = useState({ value: null, status: "normal" })
    const [descInput, setDescInput] = useState({ value: null, status: "normal" })

    const titleInputRef = useRef(null)

    function handleSettings(ev) {
        const formData = new FormData(ev.currentTarget)
        const title = formData.get("titleInput")
        const desc = formData.get("descInput")

        ev.preventDefault()

        if (!title) {
            setTitleInput(prev => ({ ...prev, status: "error" }))
            titleInputRef.current?.focus()
            return
        }
        if (props.settings.source === "create") {
            props.setLists(prev =>
                [...prev,
                {
                    id: nanoid(),
                    title: title,
                    desc: desc,
                    tasks: [],
                    open: props.lists.length === 0
                }]
            )
        }
        else {
            props.setLists(prev => prev.map(list => (
                list.open ? { ...list, title: title, desc: desc } : list
            )))
        }
        props.setSettings(prev => ({...prev, open: false}))
        props.setIsDropdownOpen(false)
    }

    return (
        <>
            <div onClick={() => props.setSettings(prev => ({...prev, open: false}))} className="fixed inset-0 z-49 flex items-center justify-center p-4 bg-black/65"></div>
            <div className="flex flex-col gap-4 fixed inset-x-4 mx-auto top-1/2 -translate-y-1/2 text-base z-50 p-4 rounded-md h-7/12 sm:w-lg md:text-lg border border-slate-700/20 bg-slate-950 text-white">
                <div className="grid gap-2">
                    <h1 className="font-bold text-3xl md:text-4xl">{props.settings.source === "create" ? "Create new list" : "Edit list"}</h1>
                    <p className="text-slate-500">{props.settings.source === "create" ? "Set up your new list info below." : "Change your list info below."}</p>
                </div>
                <div className="absolute right-4 top-4">
                    <button onClick={() => props.setSettings(prev => ({...prev, open: false}))} className="p-2 grid place-items-center rounded-sm hover:bg-slate-700/50"><FaTimes /></button>
                </div>
                <form onSubmit={handleSettings} className="flex flex-col content-between gap-4 h-full">
                    <section className="flex flex-col gap-4 h-full flex-1">
                        <div className="relative w-full">
                            <Input
                                labelText="Title"
                                name="titleInput"
                                input={titleInput}
                                setInput={setTitleInput}
                                ref={titleInputRef}
                                maxLength={50}
                                defaultValue={props.settings.source === "edit" ? props.currentList.title : ""}
                                error={titleInput.error}
                            />
                        </div>
                        <div className={`${titleInput.status !== "normal" ? "mt-4" : "mt-0"} ${descInput.status === "warning" ? "mb-4" : "mb-0"} transition-all duration-200 flex flex-1 relative`}>
                            <textarea
                                className={`${descInput.status !== "normal" ? "outline-amber-400" : "outline-slate-700/50 focus:outline-white"} peer resize-none select-none w-full px-2 py-3 rounded-sm outline scrollbar`}
                                name="descInput"
                                placeholder=" "
                                maxLength={200}
                                defaultValue={props.settings.source === "edit" ? props.currentList.desc : null}
                                onChange={ev => (
                                    setDescInput(prev => ({ ...prev, value: ev.target.value, status: ev.target.value.length >= 190 ? "warning" : "normal" }))
                                )}
                            ></textarea>
                            <label className={`${descInput.status === "error" ? "text-red-400" : ""} ${descInput.status === "warning" ? "text-amber-400" : ""} top-6 peer-focus:top-0 peer-not-placeholder-shown:top-0 floating-label bg-slate-950`}>Description</label>
                            {descInput.status !== "normal" ? <span className={`${descInput.status === "warning" ? "text-amber-400" : ""} flex items-center gap-2 italic absolute left-0 -bottom-6 text-sm`}><FaExclamationCircle /> Character limit: {descInput.value.length}/200</span> : null}
                        </div>
                    </section>
                    <div className="grid gap-2 font-semibold">
                        <button type="submit" className="rounded-sm h-11 md:h-12 border border-slate-700/50 bg-slate-800/60">{props.settings.source === "create" ? "Create new list" : "Save changes"}</button>
                    </div>
                </form>
            </div >
        </>
    )
}