export default function HandlePoints({ points }) {
    const totalStars = 5;
    const fillPercentage = `${(points / totalStars) * 100}%`;
    
    return (
        <div className="relative inline-block text-gray-300 text-2xl">
            {/* Contenedor de las estrellas vacías */}
            <div className="stars-outer relative">
                {/* Contenedor de las estrellas rellenas */}
                <div
                    className="stars-inner absolute top-0 left-0 overflow-hidden"
                    style={{ width: fillPercentage }}
                ></div>
            </div>
        </div>
    );
}
