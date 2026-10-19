import { Typography } from '@mui/material'
import { useWatchlist } from '../context/WatchlistContext'
import MovieGrid from '../components/MovieGrid'

export default function Watchlist() {
    const { list } = useWatchlist()

    return (
        <>
            <Typography variant="h5" fontWeight={700} gutterBottom>
                My Watchlist
            </Typography>
            {list.length === 0 ? (
                <Typography>Your watchlist is empty. Open a movie and press "Add to Watchlist".</Typography>
            ) : (
                <MovieGrid items={list} />
            )}
        </>
    )
}