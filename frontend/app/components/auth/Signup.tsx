"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const Signup = () => {
    const [isMounted, setIsMounted] = useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isClicked, setIsClicked] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }

    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrorMessage("");
        setIsLoading(true);
        setIsClicked(true);

        try {
            const response = await fetch("/api/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ name, username, email, password }),
            });

            if (!response.ok) {
                const data = await response.json();
                setErrorMessage(data.message || "Something went wrong");
                setIsClicked(false);
            } else {
                const data = await response.json();
                setErrorMessage("");
                toast.success("Signup was successful");
                setTimeout(() => {
                    window.location.reload();
                }, 500);
            }
        } catch (error) {
            console.error(error);
            setIsClicked(false);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="main-content">
            <div className="content-wrapper js-content-wrapper overflow-hidden">
                <section
                    className="form-page js-mouse-move-container"
                    style={{
                        backgroundImage: `url("https://images.unsplash.com/photo-1462536943532-57a629f6cc60")`,
                        backgroundPosition: "center",
                    }}
                >
                    <div className="form-page__content lg:py-50">
                        <div className="container">
                            <div className="row justify-center items-center">
                                <div className="col-xl-6 col-lg-8">
                                    <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
                                        <h3 className="text-30 lh-13">
                                            Sign Up
                                        </h3>
                                        <p className="mt-10">
                                            Already have an account?
                                            <Link
                                                href="/login"
                                                className="text-purple-1"
                                            >
                                                {" "}
                                                Login
                                            </Link>
                                        </p>
                                        {errorMessage && (
                                            <p className="alert alert-warning">
                                                {errorMessage}
                                            </p>
                                        )}
                                        <form
                                            className="contact-form respondForm__form row y-gap-20 pt-30"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="col-12">
                                                <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                                    Full name
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="name"
                                                    value={name}
                                                    onChange={(e) =>
                                                        setName(e.target.value)
                                                    }
                                                    placeholder="John Doe"
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                                    Username
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="username"
                                                    value={username}
                                                    onChange={(e) =>
                                                        setUsername(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="john_doe"
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                                    Email
                                                </label>
                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={email}
                                                    onChange={(e) =>
                                                        setEmail(e.target.value)
                                                    }
                                                    placeholder="email@example.com"
                                                />
                                            </div>
                                            <div className="col-12">
                                                <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                                    Password
                                                </label>
                                                <input
                                                    required
                                                    type="password"
                                                    name="password"
                                                    value={password}
                                                    onChange={(e) =>
                                                        setPassword(
                                                            e.target.value
                                                        )
                                                    }
                                                    placeholder="****"
                                                />
                                            </div>
                                            <div className="col-12">
                                                <button
                                                    disabled={isClicked}
                                                    type="submit"
                                                    name="submit"
                                                    id="submit"
                                                    className="button -md -yellow-1 text-dark-1 fw-500 w-1/1"
                                                >
                                                    {isLoading ? (
                                                        <div className="flex items-center justify-center">
                                                            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                                                            <span className="ml-2">
                                                                Registering...
                                                            </span>
                                                        </div>
                                                    ) : (
                                                        "Register"
                                                    )}
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Signup;
