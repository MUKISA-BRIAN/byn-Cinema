import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Typography, CircularProgress, Alert } from '@mui/material'
import { searchMulti } from '../api/tmdb'
import MovieGrid from '../components/MovieGrid'

export default function Search() {
    const [params] = useSearchParams()
    const q = params.get('q') || ''
    const [results, setResults] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState('')

    useEffect(() => {
        if (!q) return
        let cancelled = false
        setLoading(true)
        setError('')
        searchMulti(q)
            .then((data) => !cancelled && setResults(data))
            .catch((e) => !cancelled && setError(e.message))
            .finally(() => !cancelled && setLoading(false))
        return () => { cancelled = true }
    }, [q])

    if (!q) return <Typography>Type something in the search box above.</Typography>

    return (
        <>
            <Typography variant="h5" fontWeight={700} gutterBottom>
                Results for "{q}"
            </Typography>
            {loading && <CircularProgress />}
            {error && <Alert severity="error">{error}</Alert>}
            {!loading && !error && results.length === 0 && (
                <Typography>No results found. Try another title.</Typography>
            )}
            {!loading && !error && <MovieGrid items={results} />}
        </>
    )
}