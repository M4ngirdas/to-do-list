
import { useState, useEffect } from "react"
import { FaPlus } from "react-icons/fa"

import List from "./components/List.jsx"
import Menu from "./components/Menu.jsx"
import Settings from "./components/Settings.jsx"
import Confirmation from "./components/Confirmation.jsx"

export default function App() {
    const [lists, setLists] = useState(() => {
        const savedLists = localStorage.getItem("lists")
        return savedLists ? JSON.parse(savedLists) : []
    })

    const [confirmation, setConfirmation] = useState({ open: false, source: null })
    const [settings, setSettings] = useState({ open: false, source: null })
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
    const [selectedListId, setSelectedListId] = useState(null)
    const [isDropdownOpen, setIsDropdownOpen] = useState(false)

    const currentList = lists.find(list => list.open)
    const tasksLength = currentList?.tasks.length
    const completedTaskCount = currentList?.tasks.filter(task => task.checked).length

    useEffect(() => {
        localStorage.setItem("lists", JSON.stringify(lists))
    }, [lists])

    function openList(id) {
        setLists(prev => prev.map(list => ({
            ...list,
            open: id === list.id
        })))
    }

    function showSettings(source) {
        setSettings({ open: true, source: source })
    }

    function showConfirmation(source, id) {
        if (id) setSelectedListId(id)
        setConfirmation({ open: true, source: source })
    }

    function removeList(id) {
        if (lists.length === 1) setIsMobileMenuOpen(false)
        setLists(prev => {
            const filtered = prev.filter(list => id !== list.id)
            if (filtered.length > 0) openList(filtered[0].id)
            return filtered
        })
    }

    return (
        <>
            <div className="flex h-screen">
                {lists.length > 0 ? (
                    <div className={`${isMobileMenuOpen ? "w-full" : ""} flex fixed h-full z-30 md:relative`}>
                        <Menu
                            showSettings={() => showSettings("create")}
                            openList={openList}
                            setLists={setLists}
                            lists={lists}
                            currentList={currentList}
                            showConfirmation={showConfirmation}
                            setIsMobileMenuOpen={setIsMobileMenuOpen}
                            isMobileMenuOpen={isMobileMenuOpen}
                        />
                    </div>
                ) : null}

                {lists.length === 0 ? (
                    <div className="flex justify-center items-center w-full">
                        <div className="grid gap-8 rounded-md">
                            <div className="grid gap-2">
                                <h1 className="font-bold text-4xl md:text-5xl">It's empty here...</h1>
                                <p className="text-lg text-slate-500">Create a list to get started!</p>
                            </div>
                            <button onClick={() => showSettings("create")} className="flex items-center font-semibold h-11 md:h-12 p-2 gap-2 rounded-sm w-full border border-slate-700/50 bg-slate-800/60 hover:bg-slate-700/50">
                                <span className="px-2"><FaPlus /></span>Create new list
                            </button>
                        </div>
                    </div>
                ) : null}

                {lists.length > 0 ? (
                    <main className="flex flex-col gap-8 p-4 md:p-8 w-full overflow-hidden bg-slate-950">
                        <List
                            currentList={currentList}
                            tasksLength={tasksLength}
                            completedTaskCount={completedTaskCount}
                            showSettings={() => showSettings("edit")}
                            setLists={setLists}
                            confirmation={confirmation}
                            showConfirmation={showConfirmation}
                            isDropdownOpen={isDropdownOpen}
                            setIsDropdownOpen={setIsDropdownOpen}
                        />
                    </main>
                ) : null}
            </div>

            {settings.open ? (
                <Settings
                    settings={settings}
                    setSettings={setSettings}
                    setLists={setLists}
                    lists={lists}
                    currentList={currentList}
                    setIsDropdownOpen={setIsDropdownOpen}
                />
            ) : null}

            {confirmation.open ? (
                <Confirmation
                    confirmation={confirmation}
                    setConfirmation={setConfirmation}
                    setLists={setLists}
                    selectedListId={selectedListId}
                    removeList={removeList}
                    setIsDropdownOpen={setIsDropdownOpen}
                />
            ) : null}
        </>
    )
}