export default async function handler(req, res) {
    const { path = '', ...rest } = req.query
    const params = new URLSearchParams(rest)
    params.set('api_key', process.env.TMDB_API_KEY)

    const response = await fetch(
        `https://api.themoviedb.org/3/${path}?${params}`
    )
    const data = await response.json()
    res.status(response.status).json(data)
}