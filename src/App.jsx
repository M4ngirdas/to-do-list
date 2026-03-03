
import { useState, useEffect } from "react"
import { FaPlus } from "react-icons/fa"

import List from "./components/List.jsx"
import Menu from "./components/Menu.jsx"
import Settings from "./components/Settings.jsx"
import Confirmation from "./components/Confirmation.jsx"
import logo from "./assets/images/logo.png"

export default function App() {
    const [lists, setLists] = useState(() => {
        const savedLists = localStorage.getItem("lists")
        return savedLists ? JSON.parse(savedLists) : []
    })
    const [confirmation, setConfirmation] = useState({ isOpen: false, source: null })
    const [settings, setSettings] = useState({ isOpen: false, source: null })
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [selectedListId, setSelectedListId] = useState(null)
    const [selectedList, setSelectedList] = useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const currentList = lists.find(list => list.isOpen)
    const tasksLength = currentList?.tasks.length
    const completedTaskCount = currentList?.tasks.filter(task => task.checked).length

    useEffect(() => (
        localStorage.setItem("lists", JSON.stringify(lists))
    ), [lists])

    function openList(id) {
        setLists(prev => prev.map(list => ({
            ...list,
            isOpen: id === list.id
        })))
    }

    function toggleListPinned(id) {
        setLists(prev => prev.map(list => (
            id === list.id ? { ...list, isPinned: !list.isPinned } : list
        )))
    }

    function showSettings(source) {
        setSettings({ isOpen: true, source: source })
    }

    function showConfirmation(source, id) {
        if (id) setSelectedListId(id)
        setConfirmation({ isOpen: true, source: source })
    }

    function removeList(id) {
        if (lists.length === 1) setIsMobileMenuOpen(false)
        const remainingLists = lists.filter(list => id !== list.id)
        const removedListIndex = lists.findIndex(list => id === list.id)
        const nextListIndex = removedListIndex === 0 ? 0 : removedListIndex - 1
        setLists(remainingLists)
        openList(remainingLists[nextListIndex]?.id)
    }

    return (
        <>
            <div className="flex h-screen">
                {lists.length > 0 ? (
                    <div className="flex fixed h-full z-30 md:relative">
                        <Menu
                            showSettings={showSettings}
                            openList={openList}
                            setLists={setLists}
                            lists={lists}
                            currentList={currentList}
                            setSelectedList={setSelectedList}
                            toggleListPinned={toggleListPinned}
                            showConfirmation={showConfirmation}
                            setIsMobileMenuOpen={setIsMobileMenuOpen}
                            isMobileMenuOpen={isMobileMenuOpen}
                        />
                    </div>
                ) : null}

                {lists.length === 0 ? (
                    <div className="flex justify-center items-center w-full">
                        <div className="absolute inset-0 w-80 h-fit p-6">
                            <img onClick={() => window.location.reload()} src={logo} className="w-full h-24 object-cover cursor-pointer" alt="Tasked to-do list app logo" />
                        </div>
                        <div className="grid gap-8 rounded-md z-10">
                            <div className="grid gap-2">
                                <h1 className="font-bold text-4xl md:text-5xl">It's empty here...</h1>
                                <p className="text-lg text-slate-500">Create a list to get started!</p>
                            </div>
                            <button onClick={() => showSettings("create")} className="flex items-center font-semibold h-11 md:h-12 p-2 gap-2 rounded-sm w-full transition-transform duration-200 active:scale-95 border border-slate-700/50 bg-slate-800/60 hover:bg-slate-700/50">
                                <span className="px-2"><FaPlus /></span>Create new list
                            </button>
                        </div>
                        <p className="absolute bottom-0 p-6 text-slate-500">Created by <br /><a className="underline text-slate-400" target="_blank" href="https://github.com/M4ngirdas">M4ngirdas</a></p>
                    </div>
                ) : null}

                {lists.length > 0 ? (
                    <main className="flex flex-col gap-8 p-4 md:p-8 w-full overflow-hidden bg-slate-950">
                        <List
                            currentList={currentList}
                            tasksLength={tasksLength}
                            completedTaskCount={completedTaskCount}
                            toggleListPinned={toggleListPinned}
                            showSettings={showSettings}
                            lists={lists}
                            setLists={setLists}
                            confirmation={confirmation}
                            showConfirmation={showConfirmation}
                            isDropdownOpen={isDropdownOpen}
                            setIsDropdownOpen={setIsDropdownOpen}
                        />
                    </main>
                ) : null}
            </div>

            {settings.isOpen ? (
                <Settings
                    settings={settings}
                    setSettings={setSettings}
                    setLists={setLists}
                    lists={lists}
                    openList={openList}
                    currentList={currentList}
                    selectedList={selectedList}
                    setIsDropdownOpen={setIsDropdownOpen}
                />
            ) : null}

            {confirmation.isOpen ? (
                <Confirmation
                    confirmation={confirmation}
                    setConfirmation={setConfirmation}
                    setLists={setLists}
                    currentList={currentList}
                    selectedListId={selectedListId}
                    removeList={removeList}
                    setIsDropdownOpen={setIsDropdownOpen}
                />
            ) : null}
        </>
    )
}