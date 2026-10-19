import MovieRow from '../components/MovieRow'

export default function Home() {
    return (
        <>
            <MovieRow title="Trending This Week" path="/trending/all/week" type="movie" />
            <MovieRow title="Popular Movies" path="/movie/popular" type="movie" />
            <MovieRow title="Action Movies" path="/discover/movie?with_genres=28" type="movie" />
            <MovieRow title="Popular TV Shows" path="/tv/popular" type="tv" />
        </>
    )
}