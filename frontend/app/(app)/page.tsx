import React from "react";
import { Metadata } from "next";
import HomeHero from "@/app/components/HomeHero";
import HomeCourses from "@/app/components/courses/HomeCourses";
import Preloader from "@/app/components/Preloader";

export const metadata: Metadata = {
    title: "Home",
    description: "Home page",
};

const Home = () => {
    return (
        <div className="main-content overflow-hidden">
            <Preloader/>
            <HomeHero/>
            <HomeCourses/>
        </div>
    );
};

export default Home;
