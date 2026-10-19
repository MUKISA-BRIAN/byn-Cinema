const IMG = 'https://image.tmdb.org/t/p/'
export const posterUrl = (path, size = 'w342') => (path ? IMG + size + path : null)

// Movies and TV use different field names; make them one shape
function normalize(item, type) {
    return {
        id: item.id,
        type: item.media_type || type, // 'movie' or 'tv'
        title: item.title || item.name,
        date: item.release_date || item.first_air_date || '',
        rating: item.vote_average,
        poster: item.poster_path,
        overview: item.overview,
    }
}

async function get(path) {
    const res = await fetch('/api/tmdb' + path)
    if (!res.ok) throw new Error('Request failed: ' + res.status)
    return res.json()
}

export async function getList(path, type) {
    const data = await get(path)
    return data.results.map((item) => normalize(item, type))
}

export async function searchMulti(query) {
    const data = await get('/search/multi?query=' + encodeURIComponent(query))
    return data.results
        .filter((r) => r.media_type === 'movie' || r.media_type === 'tv') // drop people
        .map((item) => normalize(item, item.media_type))
}

export async function getDetails(type, id) {
    const data = await get(`/${type}/${id}`)
    return {
        ...normalize(data, type),
        genres: (data.genres || []).map((g) => g.name),
        backdrop: data.backdrop_path,
        tagline: data.tagline,
    }
}
export async function getGenres(type) {
    const data = await get(`/genre/${type}/list`)
    return data.genres
}

export async function getBrowse(type, genreId, page) {
    let path = `/discover/${type}?page=${page}`
    if (genreId) path += `&with_genres=${genreId}`
    const data = await get(path)
    return {
        items: data.results.map((item) => normalize(item, type)),
        totalPages: Math.min(data.total_pages, 500), // TMDB only allows 500 pages
    }
}

