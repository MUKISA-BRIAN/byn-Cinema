import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, Typography, Chip, Button, CircularProgress, Alert } from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import StarIcon from '@mui/icons-material/Star'
import MovieIcon from '@mui/icons-material/Movie'
import { getDetails, posterUrl } from '../api/tmdb'
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd'
import BookmarkAddedIcon from '@mui/icons-material/BookmarkAdded'
import { useWatchlist } from '../context/WatchlistContext'


export default function Details() {
    const { type, id } = useParams()
    const navigate = useNavigate()
    const { isSaved, toggle } = useWatchlist()
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState('')

    useEffect(() => {
        if (type !== 'movie' && type !== 'tv') {
            setError('Page not found')
            setLoading(false)
            return
        }
        let cancelled = false
        setLoading(true)
        setError('')
        getDetails(type, id)
            .then((data) => !cancelled && setItem(data))
            .catch((e) => !cancelled && setError(e.message))
            .finally(() => !cancelled && setLoading(false))
        return () => { cancelled = true }
    }, [type, id])

    if (loading) return <CircularProgress />
    if (error) return <Alert severity="error">{error}</Alert>
    if (!item) return null

    const img = posterUrl(item.poster, 'w500')
    const year = item.date ? item.date.slice(0, 4) : 'N/A'

    return (
        <>
            <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>
                Back
            </Button>
            <Box sx={{ display: 'flex', gap: 4, flexWrap: 'wrap' }}>
                <Box sx={{
                    width: 280, maxWidth: '100%', aspectRatio: '2/3', borderRadius: 3,
                    overflow: 'hidden', bgcolor: 'background.paper', display: 'grid', placeItems: 'center'
                }}>
                    {img ? (
                        <img src={img} alt={item.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                    ) : (
                        <MovieIcon sx={{ fontSize: 80, opacity: 0.3 }} />
                    )}
                </Box>

                <Box sx={{ flex: 1, minWidth: 260 }}>
                    <Typography variant="h4" fontWeight={700}>{item.title}</Typography>
                    {item.tagline && (
                        <Typography sx={{ opacity: 0.6, fontStyle: 'italic' }}>{item.tagline}</Typography>
                    )}
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, my: 2 }}>
                        <StarIcon sx={{ color: '#f5c518' }} />
                        <Typography>{item.rating ? item.rating.toFixed(1) : 'N/A'} / 10</Typography>
                        <Typography sx={{ opacity: 0.6 }}>· {year} · {item.type === 'tv' ? 'TV Show' : 'Movie'}</Typography>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
                        {item.genres.length > 0
                            ? item.genres.map((g) => <Chip key={g} label={g} />)
                            : <Typography sx={{ opacity: 0.6 }}>No genres listed</Typography>}
                    </Box>
                    <Button
                        variant={isSaved(item.type, item.id) ? 'outlined' : 'contained'}
                        startIcon={isSaved(item.type, item.id) ? <BookmarkAddedIcon /> : <BookmarkAddIcon />}
                        onClick={() => toggle({
                            id: item.id, type: item.type, title: item.title, date: item.date,
                            rating: item.rating, poster: item.poster, overview: item.overview,
                        })}
                        sx={{ mb: 3 }}
                    >
                        {isSaved(item.type, item.id) ? 'In Watchlist' : 'Add to Watchlist'}
                    </Button>
                    <Typography variant="h6" gutterBottom>Overview</Typography>
                    <Typography sx={{ opacity: 0.85 }}>
                        {item.overview || 'No overview available.'}
                    </Typography>
                </Box>
            </Box>
        </>
    )
}