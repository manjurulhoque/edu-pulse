"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";

const HomeHero = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleSubmit = (e: any) => {
        e.preventDefault();
    };

    return (
        <section className="masthead -type-2">
            <div className="masthead__bg">
                <div
                    style={{backgroundImage: "url(https://images.unsplash.com/photo-1494059980473-813e73ee784b)"}}
                    className="bg-image js-lazy"
                    data-bg="https://images.unsplash.com/photo-1494059980473-813e73ee784b"
                ></div>
            </div>

            <div className="container">
                <div className="row y-gap-50 justify-center items-center">
                    <div
                        className="col-xl-6 col-lg-11"
                        data-aos="fade-up"
                        data-aos-delay="500"
                    >
                        <div className="masthead__content">
                            <div className="masthead__subtitle fw-500 text-green-1 text-17 lh-15">
                                Start learning for free
                            </div>
                            <h1 className="masthead__title text-white mt-10">
                                Explore your creativity with thousands of online classes.
                            </h1>
                            <div className="masthead__button mt-20">
                                <Link
                                    href="/"
                                    className="button -md -white text-dark-1"
                                >
                                    Find Courses
                                </Link>
                            </div>
                        </div>
                    </div>

                    <div
                        className="col-xl-5 col-lg-11"
                        data-aos="fade-up"
                        data-aos-delay="750"
                    >
                        <div className="masthead-form">
                            <h4 className="masthead-form__title text-center text-20 lh-15 fw-500 mb-30">
                                Create Your <span className="text-purple-1">Free Account</span>
                            </h4>

                            <form onSubmit={handleSubmit}>
                                <div className="masthead-form__group">
                                    <label>Email Address</label>
                                    <input required type="text" placeholder="Your Email"/>
                                </div>

                                <div className="masthead-form__group">
                                    <label>Password</label>
                                    <input required type="text" placeholder="Your Password"/>
                                </div>

                                <div className="masthead-form__group">
                                    <button
                                        type="submit"
                                        className="button -md -purple-1 text-white"
                                    >
                                        Start Learning For Free
                                    </button>
                                </div>

                                <div className="masthead-form__desc">
                                    By continuing, you accept our Terms of Use, our Privacy Policy
                                    and that your data is stored in the USA. You confirm you are
                                    at least 16 years old (13 if you are an authorized Classrooms
                                    user).
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default HomeHero;
