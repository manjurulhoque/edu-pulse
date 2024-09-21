"use client";

import React from "react";
import {useState, useEffect} from "react";

const Star: React.FC<{
    star: number;
    textSize?: string;
    textColor?: string;
}> = ({star, textSize, textColor}) => {
    const [rating, setRating] = useState<string[]>([]);

    useEffect(() => {
        const starsArray = Array(Math.round(star)).fill("star");
        setRating(starsArray);
    }, [star]);

    return (
        <>
            {rating.map((_, i) => (
                <div
                    key={i}
                    className={`icon-star ${textSize ? textSize : "text-9"} ${
                        textColor ? textColor : "text-yellow-1"
                    } `}
                ></div>
            ))}
        </>
    );
}

export default Star;