import ReviewMovie from "@/components/Movies/ReviewForm"
export default async function LeaveReviewPage({params}){
    const {id} = await params
    return(
        <ReviewMovie movieId={id}/>
    )
}