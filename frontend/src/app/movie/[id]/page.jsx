import MovieDetails from "@/components/Movies/MovieDetails";

export default async function MovieDetail({params}) {
    const {id} = await params;
    return (
        <div className="flex justify-center m-12">
            <MovieDetails movieId={id}/>
        </div>
    );
}