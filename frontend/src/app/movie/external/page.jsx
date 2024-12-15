import MovieListExternalApi from "@/components/MoviesExternal/MovieListExternalApi"
export default function ExternalMoviesApi(){
    const tokenApi = process.env.apiKeyTMDB
    return(
        <MovieListExternalApi tokenExternal={tokenApi}/>
    )
}