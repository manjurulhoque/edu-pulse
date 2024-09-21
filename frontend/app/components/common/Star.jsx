"use client";

import React from "react";
import { useState, useEffect } from "react";

export default function Star({star, textSize, textColor}) {
    const [rating, setRating] = useState([]);

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
