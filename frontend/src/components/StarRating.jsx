"use client";
import { useState } from "react";

export default function StarRating({ value = 0, onChange }) {
    const [hoverValue, setHoverValue] = useState(null);
    const totalStars = 5;

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const offsetX = e.clientX - rect.left;
        const percentage = (offsetX / rect.width) * totalStars;
        setHoverValue(percentage);
    };

    const handleMouseLeave = () => {
        setHoverValue(null);
    };

    const handleClick = () => {
        const finalValue = hoverValue !== null ? hoverValue : value;
        onChange(Math.round(finalValue * 2) / 2); // Redondea al múltiplo de 0.5
    };

    const getFillPercentage = () => {
        const currentValue = hoverValue !== null ? hoverValue : value;
        return `${(currentValue / totalStars) * 100}%`;
    };

    return (
        <div
            className="stars-outer relative inline-block text-gray-300 text-2xl"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
        >
            {/* Estrellas vacías */}
            <div className="stars-inner absolute top-0 left-0 overflow-hidden whitespace-nowrap" style={{ width: getFillPercentage() }}></div>
        </div>
    );
}
