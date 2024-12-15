// Pagina de carga
export default function Loading(){
    return(
        <div className="flex justify-center items-center h-screen">
            <div className="flex justify-center items-center">
                <div className="w-10 h-10 bg-yellow-500 rounded-full animate-bounce mx-1"></div>
                <div className="w-10 h-10 bg-yellow-500 rounded-full animate-bounce mx-1"></div>
                <div className="w-10 h-10 bg-yellow-500 rounded-full animate-bounce mx-1"></div>
            </div>
        </div>
    )
}