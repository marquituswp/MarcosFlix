
export default function handleUploadMoviePoster(imageFile, token, movieId){
    try{
        // Crea un objeto FormData con la imagen y los textos
        const formData = new FormData();
        formData.append("image", imageFile);
        fetch(`http://localhost:3000/movie/${movieId}`, {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: formData,
        })
        .catch((error) => {
            console.log(error)
        });

    }catch(error){
        console.log(error)
    }

}