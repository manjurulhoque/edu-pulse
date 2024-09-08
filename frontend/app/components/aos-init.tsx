"use client";

import { useEffect } from "react";

import AOS from "aos";
import "aos/dist/aos.css";

export const AOSInit = () => {
    useEffect(() => {
        AOS.init({
            duration: 700,
            offset: 120,
            easing: "ease-out",
            once: true,
        });
    }, []);

    return null;
};
