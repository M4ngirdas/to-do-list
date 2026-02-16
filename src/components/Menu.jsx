
import { useState, useRef, useEffect } from "react"
import { FaAngleLeft, FaAngleRight, FaAngleUp, FaBars, FaPlus, FaTimes } from "react-icons/fa"

export default function Menu(props) {

    const [isScrollbarVisible, setIsScrollbarVisible] = useState(false)
    const [isMenuOpen, setIsMenuOpen] = useState(true)

    const listContainerRef = useRef(null)

    useEffect(() => (
        setIsScrollbarVisible(listContainerRef.current?.scrollHeight > listContainerRef.current?.clientHeight)
    ), [props.lists.length])

    const listElements = props.lists.map(list => (
        <li key={list.id} className={`${props.currentList?.id === list.id ? "bg-slate-800/50" : ""} group flex items-center p-2 w-full h-11 md:h-12 rounded-sm overflow-hidden border border-slate-700/50 hover:bg-slate-800/30`}>
            <div onClick={() => { props.openList(list.id); props.setIsMobileMenuOpen(false) }} className="flex gap-2 w-full cursor-pointer overflow-hidden">
                <p className="truncate">{list.title}</p>
            </div>
            <div className="grid place-items-center">
                <button onClick={() => props.showConfirmation("list", list.id)} className="grid md:opacity-0 place-items-center h-7 w-7 duration-200 rounded-sm hover:bg-rose-700 group-hover:opacity-100"><FaTimes /></button>
            </div>
        </li>
    ))

    return (
        <>
            {/* for width more or equal to 768px */}
            <>
                <nav className={`${isMenuOpen ? "hidden md:grid" : "hidden"} transition-transform duration-200 content-start gap-4 relative p-6 w-80 rounded-md`} >
                    <button onClick={props.showSettings} className="flex items-center w-full h-11 md:h-12 p-2 gap-2 font-semibold rounded-sm border border-slate-700/50 bg-slate-800/60 hover:bg-slate-700/50"><span className="px-2"><FaPlus /></span>Create new list</button>
                    <div className="flex flex-col gap-2 h-full overflow-hidden">
                        <p className="font-medium text-slate-500">MY LISTS</p>
                        <ul ref={listContainerRef} className={`${isScrollbarVisible ? "pr-2" : ""} grid gap-2 overflow-y-auto scrollbar`}>{listElements}</ul>
                    </div>
                </nav>
                <div className={`${isMenuOpen ? "hidden md:block p-0" : "p-4"} border-r border-slate-700/50`}>
                    <button onClick={() => setIsMenuOpen(prev => !prev)} className="absolute -right-4 bottom-8 p-2 rounded-full border border-slate-700/50 bg-slate-950 text-slate-400 hover:bg-slate-900">{isMenuOpen ? <FaAngleLeft /> : <FaAngleRight />}</button>
                </div>
            </>

            {/* for width below 768px */}
            <nav className={`${props.isMobileMenuOpen ? "translate-y-0 p-4" : "-translate-y-[96%] p-0"} flex md:hidden flex-col gap-4 fixed inset-4 transition-all duration-200 rounded-sm border border-slate-700/50 bg-gray-950`}>
                <button onClick={props.showSettings} className="flex items-center gap-2 p-2 h-11 md:h-12 font-semibold rounded-sm border border-slate-700/50 bg-slate-800/60"><span className="px-2"><FaPlus /></span>Create new list</button>
                <p className="font-medium text-slate-500">MY LISTS</p>
                <ul ref={listContainerRef} className={`${isScrollbarVisible ? "pr-2" : ""} grid content-start gap-2 flex-1 overflow-y-auto scrollbar`}>{listElements}</ul>
                <div className="flex justify-center w-full">
                    <button onClick={() => props.setIsMobileMenuOpen(prev => !prev)} className="flex rounded-sm justify-center items-center h-11 md:h-12 w-full hover:bg-slate-700/30">{props.isMobileMenuOpen ? <FaAngleUp /> : <span className="flex items-center gap-2"><FaBars /> Menu</span>}</button>
                </div>
            </nav>
        </>
    )
}