import { Routes, Route } from 'react-router-dom'
import { Typography } from '@mui/material'
import Layout from './components/Layout'
import Home from './pages/Home'
import Search from './pages/Search'
import Details from './pages/Details'
import Browse from './pages/Browse'
import Watchlist from './pages/Watchlist'

const Placeholder = ({ title }) => (
  <Typography variant="h5">{title} (coming soon)</Typography>
)

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Browse key="movie" type="movie" />} />
        <Route path="/tv" element={<Browse key="tv" type="tv" />} />
        <Route path="/watchlist" element={<Watchlist />} />
        <Route path="/search" element={<Search />} />
        <Route path="/:type/:id" element={<Details />} />
      </Route>
    </Routes>
  )
}