"use client";

import React from "react";
import {useState, useEffect} from "react";

export default function Star({star, textSize, textColor}) {
    const [rating, setRating] = useState([]);
    useEffect(() => {
        for (let i = Math.round(star); i >= 1; i--) {
            setRating((pre) => [...pre, "star"]);
        }
    }, []);
    return (
        <>
            {rating.map((itm, i) => (
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
