import { createContext, useContext, useEffect, useState } from 'react'

const WatchlistContext = createContext(null)

export function WatchlistProvider({ children }) {
    // read saved list once, when the app starts
    const [list, setList] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem('watchlist')) || []
        } catch {
            return []
        }
    })

    // save every time the list changes
    useEffect(() => {
        localStorage.setItem('watchlist', JSON.stringify(list))
    }, [list])

    const isSaved = (type, id) => list.some((i) => i.type === type && i.id === id)

    const toggle = (item) => {
        setList((prev) =>
            isSaved(item.type, item.id)
                ? prev.filter((i) => !(i.type === item.type && i.id === item.id))
                : [...prev, item]
        )
    }

    return (
        <WatchlistContext.Provider value={{ list, isSaved, toggle }}>
            {children}
        </WatchlistContext.Provider>
    )
}

export const useWatchlist = () => useContext(WatchlistContext)