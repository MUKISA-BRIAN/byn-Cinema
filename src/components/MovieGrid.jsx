import { Box } from '@mui/material'
import MovieCard from './MovieCard'

export default function MovieGrid({ items }) {
    return (
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2 }}>
            {items.map((item) => (
                <MovieCard key={item.type + item.id} item={item} />
            ))}
        </Box>
    )
}