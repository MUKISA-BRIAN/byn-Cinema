import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import {
    AppBar, Toolbar, Typography, IconButton, InputBase, Box, Drawer,
    List, ListItemButton, ListItemIcon, ListItemText, useMediaQuery,
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import MenuIcon from '@mui/icons-material/Menu'
import SearchIcon from '@mui/icons-material/Search'
import HomeIcon from '@mui/icons-material/Home'
import MovieIcon from '@mui/icons-material/Movie'
import TvIcon from '@mui/icons-material/Tv'
import BookmarkIcon from '@mui/icons-material/Bookmark'

const drawerWidth = 220

const links = [
    { to: '/', label: 'Home', icon: <HomeIcon /> },
    { to: '/movies', label: 'Movies', icon: <MovieIcon /> },
    { to: '/tv', label: 'TV Shows', icon: <TvIcon /> },
    { to: '/watchlist', label: 'Watchlist', icon: <BookmarkIcon /> },
]

export default function Layout() {
    const theme = useTheme()
    const isDesktop = useMediaQuery(theme.breakpoints.up('md'))
    const [open, setOpen] = useState(false)
    const [query, setQuery] = useState('')
    const navigate = useNavigate()

    const handleSearch = (e) => {
        e.preventDefault()
        if (!query.trim()) return
        navigate('/search?q=' + encodeURIComponent(query.trim()))
        setQuery('')
    }

    const drawerContent = (
        <Box sx={{ width: drawerWidth }}>
            <Toolbar />
            <List>
                {links.map((l) => (
                    <ListItemButton
                        key={l.to}
                        component={NavLink}
                        to={l.to}
                        end={l.to === '/'}
                        onClick={() => setOpen(false)}
                        sx={{ '&.active': { bgcolor: 'action.selected', color: 'primary.main' } }}
                    >
                        <ListItemIcon sx={{ color: 'inherit' }}>{l.icon}</ListItemIcon>
                        <ListItemText primary={l.label} />
                    </ListItemButton>
                ))}
            </List>
        </Box>
    )

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar
                position="fixed"
                elevation={0}
                sx={{ zIndex: theme.zIndex.drawer + 1, bgcolor: 'background.paper', backgroundImage: 'none' }}
            >
                <Toolbar sx={{ gap: 2 }}>
                    {!isDesktop && (
                        <IconButton color="inherit" edge="start" onClick={() => setOpen(true)}>
                            <MenuIcon />
                        </IconButton>
                    )}
                    <Typography variant="h6" fontWeight={700} color="primary" sx={{ flexShrink: 0 }}>
                        BYN Cinema
                    </Typography>
                    <Box
                        component="form"
                        onSubmit={handleSearch}
                        sx={{
                            display: 'flex', alignItems: 'center', flexGrow: 1, maxWidth: 480, mx: 'auto',
                            px: 1.5, borderRadius: 5, bgcolor: 'rgba(255,255,255,0.08)',
                        }}
                    >
                        <SearchIcon fontSize="small" />
                        <InputBase
                            placeholder="Search movies and TV..."
                            value={query}
                            onChange={(e) => setQuery(e.target.value)}
                            sx={{ ml: 1, flex: 1 }}
                        />
                    </Box>
                </Toolbar>
            </AppBar>

            <Drawer
                variant={isDesktop ? 'permanent' : 'temporary'}
                open={isDesktop ? true : open}
                onClose={() => setOpen(false)}
                sx={{ '& .MuiDrawer-paper': { width: drawerWidth, boxSizing: 'border-box' } }}
            >
                {drawerContent}
            </Drawer>

            <Box component="main" sx={{ flexGrow: 1, p: 3, ml: { md: `${drawerWidth}px` }, minWidth: 0 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </Box>
    )
}