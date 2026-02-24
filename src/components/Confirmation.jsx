
import { FaTimes } from "react-icons/fa";

export default function Confirmation(props) {

    function handleConfirmation() {
        props.confirmation.source === "list"
            ? props.removeList(props.selectedListId)
            : props.setLists(prev => prev.map(list => (list.open ? { ...list, tasks: [] } : list)))
        props.setConfirmation(prev => ({ ...prev, open: false }))
        props.setIsDropdownOpen(false)
    }

    return (
        <>
            <div onClick={() => props.setConfirmation(prev => ({ ...prev, open: false }))} className="fixed z-49 inset-0 bg-black/60"></div>
            <div className="fixed inset-x-4 mx-auto top-1/2 -translate-y-1/2 rounded-md p-4 z-50 text-base sm:w-lg md:text-lg 2xl:max-w-2xl border border-slate-700/20 bg-slate-950 text-white">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <h1 className="font-bold text-3xl md:text-4xl">Are you sure?</h1>
                        <p className="text-slate-500">You can't undo this action.</p>
                    </div>
                    <div className="absolute right-4 top-4">
                        <button onClick={() => props.setConfirmation(prev => ({ ...prev, open: false }))} className="p-2 grid place-items-center rounded-sm hover:bg-slate-700/50"><FaTimes /></button>
                    </div>
                    <form action={handleConfirmation} className="flex gap-2 font-semibold">
                        <button type="submit" className="group relative flex-1 overflow-hidden rounded-sm p-2 border border-rose-400 text-rose-400 hover:border-transparent hover:bg-rose-700 hover:text-white">Confirm</button>
                    </form>
                </div>
            </div>
        </>
    )
}