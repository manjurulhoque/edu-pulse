"use client";

import React from "react";
import { Star } from "lucide-react";

const StarRating: React.FC<{
    star?: number;
    filledStar?: number;
    size?: number;
    color?: string;
    fill?: string;
}> = ({ star = 5, filledStar = 5, size = 16, color = "#E59819", fill = "#E59819" }) => {
    return (
        <>
            {Array.from({ length: star }).map((_, index) => (
                <Star key={index} size={size} color={color} fill={filledStar >= index + 1 ? fill : "none"} />
            ))}
        </>
    );
};

export default StarRating;
