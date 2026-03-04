
import { useState, useRef, useEffect } from "react"
import { FaAngleDown, FaAngleLeft, FaAngleRight, FaAngleUp, FaBars, FaEdit, FaPlus, FaThumbtack, FaTimes, FaTrashAlt } from "react-icons/fa"
import { FaThumbtackSlash } from "react-icons/fa6"

import logo from "../assets/images/logo.png"

export default function Menu(props) {

    const [isScrollbarVisible, setIsScrollbarVisible] = useState({ all: false, pinned: false, mobileAll: false, mobilePinned: false })
    const [contextMenu, setContextMenu] = useState({ id: null, x: 0, y: 0 })
    const [activeList, setActiveList] = useState("all")
    const [isListsCollapsed, setIsListsCollapsed] = useState(() => {
        const saved = localStorage.getItem("isListsCollapsed")
        return saved ? JSON.parse(saved) : {}
    })
    const [isMenuOpen, setIsMenuOpen] = useState(() => {
        const saved = localStorage.getItem("isMenuOpen")
        return saved ? saved === "true" : true
    })

    const listContainerRef = useRef(null)
    const pinnedListContainerRef = useRef(null)
    const mobileListContainerRef = useRef(null)
    const mobilePinnedListContainerRef = useRef(null)

    const pinnedLists = props.lists.filter(list => list.isPinned)

    console.log(isScrollbarVisible)

    useEffect(() => (
        localStorage.setItem("isMenuOpen", isMenuOpen)
    ), [isMenuOpen])

    useEffect(() => (
        localStorage.setItem("isListsCollapsed", JSON.stringify(isListsCollapsed))
    ), [isListsCollapsed])

    useEffect(() => {
        function update() {
            setIsScrollbarVisible(() => ({
                all: listContainerRef.current?.scrollHeight > listContainerRef.current?.clientHeight,
                pinned: pinnedListContainerRef.current?.scrollHeight > pinnedListContainerRef.current?.clientHeight,
                mobileAll: mobileListContainerRef.current?.scrollHeight > mobileListContainerRef.current?.clientHeight,
                mobilePinned: mobilePinnedListContainerRef.current?.scrollHeight > mobilePinnedListContainerRef.current?.clientHeight
            }))
        }
        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [props.lists, activeList, isListsCollapsed])

    function handleContextMenu(id, x, y) {
        const clampedX = x + 160 > window.innerWidth ? x - 160 : x
        const clampedY = y + 144 > window.innerHeight ? y - 144 : y
        setContextMenu({ id, x: clampedX, y: clampedY })
    }

    const pinnedListElements = pinnedLists.map(pinnedList => (
        <div key={pinnedList.id} className="flex items-center w-full h-11 md:h-12 overflow-hidden">
            <li
                onClick={() => { props.openList(pinnedList.id); props.setIsMobileMenuOpen(false); }}
                tabIndex={0}
                onKeyDown={ev => {
                    if (ev.key === "Enter") props.openList(pinnedList.id)
                }}
                onContextMenu={ev => {
                    ev.preventDefault()
                    handleContextMenu(pinnedList.id, ev.pageX, ev.pageY)
                }}
                title="Unpin list"
                className={`${props.currentList?.id === pinnedList.id ? "bg-slate-800/50" : ""} group flex items-center w-full h-11 md:h-12 p-2 cursor-pointer rounded-sm transition-transform duration-200 active:scale-95 focus:outline-white border border-slate-700/50 hover:bg-slate-800/30`}>
                <div className="flex gap-2 w-full overflow-hidden">
                    <p className="truncate">{pinnedList.title}</p>
                </div>
                <div>
                    <button
                        onClick={(ev) => {
                            ev.stopPropagation()
                            props.toggleListPinned(pinnedList.id)
                            if (pinnedLists.length === 1) setIsListsCollapsed(prev => ({ ...prev, all: false }))
                        }}
                        className="grid md:opacity-0 place-items-center w-7 h-7 rounded-sm transition-opacity duration-200 hover:bg-slate-700/50 group-hover:opacity-100"><FaThumbtackSlash />
                    </button>
                </div>
            </li>
            {contextMenu.id === pinnedList.id ? <div onClick={() => setContextMenu({ id: null, x: 0, y: 0 })} className="fixed inset-0 z-39"></div> : null}
            {contextMenu.id === pinnedList.id ? <ul style={{ left: contextMenu.x, top: contextMenu.y }} className="z-40 overflow-hidden transition-all duration-200 origin-top-right w-40 absolute right-0 rounded-md border border-slate-700/50 bg-slate-900">
                <li
                    onClick={() => {
                        props.showSettings("editFromMenu")
                        setContextMenu({ id: null, x: 0, y: 0 })
                    }}
                    className="flex items-center gap-2 cursor-pointer h-11 md:h-12 p-4 bg-slate-900 hover:bg-slate-700/50"> <span className="px-2"><FaEdit /></span> Edit list
                </li>
                <li
                    onClick={() => {
                        props.toggleListPinned(pinnedList.id)
                        setContextMenu({ id: null, x: 0, y: 0 })
                        if (pinnedLists.length === 1) setIsListsCollapsed(prev => ({ ...prev, all: false }))
                    }}
                    className="flex items-center gap-2 cursor-pointer h-11 md:h-12 p-4 bg-slate-900 hover:bg-slate-700/50"><span className="px-2"><FaThumbtackSlash /></span> Unpin list
                </li>
                <li onClick={() => { props.showConfirmation("list", pinnedList.id); setContextMenu({ id: null, x: 0, y: 0 }) }} className="flex items-center gap-2 cursor-pointer h-11 md:h-12 p-4 text-rose-400 hover:bg-rose-700/20"> <span className="px-2"><FaTrashAlt /></span> Delete list</li>
            </ul> : null}
        </div>
    ))

    const listElements = props.lists.map(list => (
        <div key={list.id} className="flex items-center h-11 md:h-12 overflow-hidden">
            <li
                onClick={() => { props.openList(list.id); props.setIsMobileMenuOpen(false); }}
                tabIndex={0}
                onKeyDown={ev => {
                    if (ev.key === "Enter") props.openList(list.id)
                }}
                onContextMenu={ev => {
                    ev.preventDefault()
                    handleContextMenu(list.id, ev.pageX, ev.pageY)
                }}
                className={`${props.currentList?.id === list.id ? "bg-slate-800/50" : ""} group flex items-center w-full h-11 md:h-12 p-2 cursor-pointer rounded-sm transition-transform duration-200 active:scale-95 focus:outline-white border border-slate-700/50 hover:bg-slate-800/30`}>
                <div className="flex gap-2 w-full overflow-hidden">
                    <p className="truncate select-none">{list.title}</p>
                </div>
                <div>
                    <button onClick={(ev) => { ev.stopPropagation(); props.showConfirmation("list", list.id) }} className="grid md:opacity-0 place-items-center w-7 h-7 rounded-sm transition-opacity duration-200 hover:bg-rose-700 group-hover:opacity-100"><FaTimes /></button>
                </div>
            </li>
            {contextMenu.id === list.id ? <div onClick={() => setContextMenu({ id: null, x: 0, y: 0 })} className="fixed inset-0 z-39"></div> : null}
            {contextMenu.id === list.id ? <ul style={{ left: contextMenu.x, top: contextMenu.y }} className="z-40 overflow-hidden transition-all duration-200 origin-top-right w-40 absolute right-0 rounded-md border border-slate-700/50 bg-slate-900">
                <li
                    onClick={() => {
                        props.showSettings("editFromMenu")
                        props.setSelectedList({ title: list.title, desc: list.desc })
                        setContextMenu({ id: null, x: 0, y: 0 })
                    }}
                    className="flex items-center gap-2 cursor-pointer h-11 md:h-12 p-4 bg-slate-900 hover:bg-slate-700/50"> <span className="px-2"><FaEdit /></span> Edit list
                </li>
                <li onClick={() => { props.toggleListPinned(list.id); setContextMenu({ id: null, x: 0, y: 0 }) }} className="flex items-center gap-2 cursor-pointer h-11 md:h-12 p-4 bg-slate-900 hover:bg-slate-700/50"><span className="px-2">{list.isPinned ? <FaThumbtackSlash /> : <FaThumbtack />}</span> {list.isPinned ? "Unpin" : "Pin"} list</li>
                <li onClick={() => { props.showConfirmation("list", list.id); setContextMenu({ id: null, x: 0, y: 0 }) }} className="flex items-center gap-2 cursor-pointer h-11 md:h-12 p-4 text-rose-400 hover:bg-rose-700/20"> <span className="px-2"><FaTrashAlt /></span> Delete list</li>
            </ul> : null}
        </div>
    ))

    return (
        <>
            {/* for width more or equal to 768px */}
            <nav className={`${isMenuOpen ? "hidden md:grid" : "hidden"} transition-transform duration-200 content-start gap-6 relative p-6 w-80 rounded-md`} >
                <img onClick={() => window.location.reload()} className="w-full h-24 object-cover cursor-pointer" src={logo} alt="Tasked to-do list app logo" />
                <button onClick={() => props.showSettings("create")} className="flex items-center w-full h-11 md:h-12 p-2 gap-2 font-semibold rounded-sm transition-transform duration-200 active:scale-95 border border-slate-700/50 bg-slate-800/60 hover:bg-slate-700/50"><span className="px-2"><FaPlus /></span>Create new list</button>
                {pinnedLists.length > 0 ? <div className="flex flex-col gap-2 h-full overflow-hidden">
                    <p onClick={() => setIsListsCollapsed(prev => ({ ...prev, pinned: !prev.pinned }))} className="flex items-center gap-2 w-fit cursor-pointer font-medium text-slate-500"><span>{isListsCollapsed.pinned ? <FaAngleDown /> : <FaAngleUp />}</span>PINNED LISTS</p>
                    <ul ref={pinnedListContainerRef} className={`${isScrollbarVisible.pinned ? "pr-2" : ""} ${isListsCollapsed.pinned ? "hidden" : "grid"} gap-2 overflow-y-auto scrollbar`}>{pinnedListElements}</ul>
                </div> : null}
                <div className="flex flex-col gap-2 h-full overflow-y-auto">
                    <p onClick={() => pinnedLists.length > 0 ? setIsListsCollapsed(prev => ({ ...prev, all: !prev.all })) : null} className={`${pinnedLists.length > 0 ? "cursor-pointer" : "cursor-default"} flex items-center gap-2 w-fit font-medium text-slate-500`}>{pinnedLists.length > 0 ? <span>{isListsCollapsed.all ? <FaAngleDown /> : <FaAngleUp />}</span> : null}ALL LISTS</p>
                    <ul ref={listContainerRef} className={`${isScrollbarVisible.all ? "pr-2" : ""} ${isListsCollapsed.all ? "hidden" : "grid"} gap-2 overflow-y-auto scrollbar`}>{listElements}</ul>
                </div>
            </nav>
            <div className={`${isMenuOpen ? "hidden md:block p-0" : "p-4 hidden md:block"} border-r border-slate-700/50`}>
                <button onClick={() => setIsMenuOpen(prev => !prev)} className="absolute -right-4 bottom-8 p-2 rounded-full border border-slate-700/50 bg-slate-950 text-slate-400 hover:bg-slate-900">{isMenuOpen ? <FaAngleLeft /> : <FaAngleRight />}</button>
            </div>

            {/* for width below 768px */}
            <nav className={`${props.isMobileMenuOpen ? "translate-y-0 p-4" : "-translate-y-[96%] p-0"} flex md:hidden flex-col gap-4 fixed inset-4 transition-all duration-200 rounded-sm border border-slate-700/50 bg-gray-950`}>
                <img className="w-full h-22 object-contain select-none scale-325 -z-1" src={logo} alt="Tasked to-do list app logo" />
                <button onClick={() => props.showSettings("create")} className="flex items-center gap-2 p-2 h-11 md:h-12 font-semibold rounded-sm border border-slate-700/50 bg-slate-800/60 hover:bg-slate-700/50"><span className="px-2"><FaPlus /></span>Create new list</button>
                <div className="flex justify-center w-full">
                    <div className="relative font-medium rounded-full border border-slate-700/50">
                        <button onClick={() => setActiveList("all")} className="w-24 h-11 rounded-l-full">All</button>
                        <button onClick={() => setActiveList("pinned")} className="w-24 h-11 rounded-r-full">Pinned</button>
                        <span className={`${activeList === "all" ? "translate-x-0" : "translate-x-full"} absolute left-0 h-11 w-24 -z-1 rounded-full transition-transform duration-200 bg-slate-700/50`}></span>
                    </div>
                </div>
                {activeList === "all" ? <ul ref={mobileListContainerRef} className={`${isScrollbarVisible.mobileAll ? "pr-2" : ""} grid content-start gap-2 flex-1 overflow-y-auto scrollbar`}>{listElements}</ul> : null}
                {activeList === "pinned" ? <ul ref={mobilePinnedListContainerRef} className={`${isScrollbarVisible.mobilePinned ? "pr-2" : ""} grid content-start gap-2 flex-1 overflow-y-auto scrollbar`}>
                    {pinnedListElements}
                    {pinnedLists.length === 0 ? <div className="flex flex-col justify-center items-center gap-2 h-full">
                        <h1 className="font-bold text-4xl md:text-5xl">It's empty here...</h1>
                        <p className="text-lg text-slate-500">Hold or right click on a list to pin it.</p>
                    </div> : null}
                </ul> : null}
                <div className="flex justify-center w-full">
                    <button onClick={() => props.setIsMobileMenuOpen(prev => !prev)} className="flex rounded-sm justify-center items-center h-11 md:h-12 w-full hover:bg-slate-800/30">{props.isMobileMenuOpen ? <FaAngleUp /> : <span className="flex items-center gap-2"><FaBars /> Menu</span>}</button>
                </div>
            </nav>
        </>
    )
}