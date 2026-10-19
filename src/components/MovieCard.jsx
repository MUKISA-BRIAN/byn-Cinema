import { Link } from 'react-router-dom'
import { Box, Typography } from '@mui/material'
import MovieIcon from '@mui/icons-material/Movie'
import StarIcon from '@mui/icons-material/Star'
import { posterUrl } from '../api/tmdb'

export default function MovieCard({ item }) {
    const img = posterUrl(item.poster)
    const year = item.date ? item.date.slice(0, 4) : 'N/A'

    return (
        <Box
            component={Link}
            to={`/${item.type}/${item.id}`}
            sx={{
                width: 160, flexShrink: 0, textDecoration: 'none', color: 'inherit',
                '&:hover img': { transform: 'scale(1.04)' }
            }}
        >
            <Box sx={{
                aspectRatio: '2/3', borderRadius: 2, overflow: 'hidden',
                bgcolor: 'background.paper', display: 'grid', placeItems: 'center'
            }}>
                {img ? (
                    <img src={img} alt={item.title} loading="lazy"
                        style={{ width: '100%', height: '100%', objectFit: 'cover', transition: '0.2s' }} />
                ) : (
                    <MovieIcon sx={{ fontSize: 48, opacity: 0.3 }} />
                )}
            </Box>
            <Typography variant="body2" fontWeight={600} noWrap sx={{ mt: 1 }}>
                {item.title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, opacity: 0.7 }}>
                <StarIcon sx={{ fontSize: 14, color: '#f5c518' }} />
                <Typography variant="caption">
                    {item.rating ? item.rating.toFixed(1) : 'N/A'} · {year}
                </Typography>
            </Box>
        </Box>
    )
}