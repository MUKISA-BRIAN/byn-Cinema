import { useEffect, useState } from 'react'
import { Typography, Chip, Box, Pagination, CircularProgress, Alert } from '@mui/material'
import { getGenres, getBrowse } from '../api/tmdb'
import MovieGrid from '../components/MovieGrid'

export default function Browse({ type }) {
    const [genres, setGenres] = useState([])
    const [genre, setGenre] = useState(null)
    const [page, setPage] = useState(1)
    const [items, setItems] = useState([])
    const [totalPages, setTotalPages] = useState(1)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    // load genre chips once
    useEffect(() => {
        getGenres(type).then(setGenres).catch(() => { })
    }, [type])

    // load results whenever genre or page changes
    useEffect(() => {
        let cancelled = false
        setLoading(true)
        setError('')
        getBrowse(type, genre, page)
            .then((data) => {
                if (cancelled) return
                setItems(data.items)
                setTotalPages(data.totalPages)
            })
            .catch((e) => !cancelled && setError(e.message))
            .finally(() => !cancelled && setLoading(false))
        return () => { cancelled = true }
    }, [type, genre, page])

    const pickGenre = (id) => {
        setGenre(id === genre ? null : id) // click again to clear
        setPage(1)
    }

    return (
        <>
            <Typography variant="h5" fontWeight={700} gutterBottom>
                {type === 'movie' ? 'Movies' : 'TV Shows'}
            </Typography>

            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
                <Chip label="All" color={genre === null ? 'primary' : 'default'} onClick={() => pickGenre(null)} />
                {genres.map((g) => (
                    <Chip
                        key={g.id}
                        label={g.name}
                        color={genre === g.id ? 'primary' : 'default'}
                        onClick={() => pickGenre(g.id)}
                    />
                ))}
            </Box>

            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {!loading && !error && items.length === 0 && <Typography>Nothing found.</Typography>}
            {!loading && !error && <MovieGrid items={items} />}

            {!loading && totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={(e, value) => { setPage(value); window.scrollTo(0, 0) }}
                        color="primary"
                    />
                </Box>
            )}
        </>
    )
}