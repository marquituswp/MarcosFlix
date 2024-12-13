import DeleteMovie from "@/components/Movies/DeleteMovie"
export default async function LeaveReviewPage({params}){
    const {id} = await params
    return(
        <DeleteMovie movieId={id}/>
    )
}