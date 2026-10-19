import { useEffect, useState } from 'react'
import { Box, Typography, CircularProgress, Alert } from '@mui/material'
import { getList } from '../api/tmdb'
import MovieCard from './MovieCard'

export default function MovieRow({ title, path, type }) {
    const [items, setItems] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        let cancelled = false
        getList(path, type)
            .then((data) => !cancelled && setItems(data))
            .catch((e) => !cancelled && setError(e.message))
            .finally(() => !cancelled && setLoading(false))
        return () => { cancelled = true }
    }, [path, type])

    return (
        <Box sx={{ mb: 4 }}>
            <Typography variant="h6" fontWeight={700} gutterBottom>{title}</Typography>
            {loading && <CircularProgress size={28} />}
            {error && <Alert severity="error">{error}</Alert>}
            {!loading && !error && (
                <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
                    {items.map((item) => <MovieCard key={item.id} item={item} />)}
                </Box>
            )}
        </Box>
    )
}