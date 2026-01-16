
import { FaTimes } from "react-icons/fa";

export default function Confirmation(props) {

    function handleConfirmation() {
        props.confirmationSource === "todos"
            ? props.removeTodo(props.selectedTodoId)
            : props.setTodos(prevTodos => prevTodos.map(todo => (todo.open ? { ...todo, tasks: [] } : todo)))
        props.setConfirmationOpen(false)
    }

    return (
        <>
            <div className="fixed z-49 inset-0 bg-black/50"></div>
            <div className="flex justify-center p-6 fixed left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 z-50 w-full">
                <div className="text-base gap-4 rounded-md p-4 w-full sm:max-w-xl md:text-lg 2xl:max-w-2xl bg-slate-900 text-yellow-50">
                    <div className="grid gap-4">
                        <div className="flex justify-between">
                            <div>
                                <h1 className="font-bold text-4xl md:text-5xl">Are you sure?</h1>
                                <p className="text-slate-500">You can't undo this action.</p>
                            </div>
                            <button onClick={() => props.setConfirmationOpen(false)} className="grid place-items-center w-7 h-7 rounded-sm p-1 bg-red-500"><FaTimes /></button>
                        </div>
                        <form action={handleConfirmation} className="grid gap-2 font-semibold md:flex md:justify-between">
                            <button className="group relative overflow-hidden flex-1 rounded-sm p-2 outline outline-emerald-600 text-emerald-600">
                                <span className="absolute inset-0 z-0 transition-transform duration-250 translate-y-full group-hover:translate-y-0 bg-emerald-600"></span>
                                <span className="relative z-10 transition-all duration-350 group-hover:text-yellow-50">Yes</span>
                            </button>
                            <button type="button" onClick={() => props.setConfirmationOpen(false)} className="group relative overflow-hidden flex-1 rounded-sm p-2 outline outline-red-500 text-red-500">
                                <span className="absolute inset-0 z-0 transition-transform duration-250 translate-y-full group-hover:translate-y-0 bg-red-500"></span>
                                <span className="relative z-10 transition-all duration-350 group-hover:text-yellow-50">No</span>
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}