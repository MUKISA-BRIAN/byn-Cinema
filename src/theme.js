import { createTheme } from '@mui/material/styles'

const theme = createTheme({
    palette: {
        mode: 'dark',
        primary: { main: '#e50914' },
        background: { default: '#0b0b0f', paper: '#14141a' },
    },
    typography: { fontFamily: 'Figtree, sans-serif' },
    shape: { borderRadius: 12 },
})

export default theme
