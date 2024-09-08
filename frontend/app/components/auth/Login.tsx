"use client";

import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { permanentRedirect } from "next/navigation";
import { toast } from "react-toastify";

const Login = () => {
    const [isMounted, setIsMounted] = useState(false);

    // const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }


    const handleSubmit = async (e: any) => {
        e.preventDefault();
        setErrorMessage("");
        setIsClicked(true);
        const result = await signIn("credentials", {
            email: email,
            password: password,
            redirect: false,
        });

        if (result?.status === 401) {
            // If there is an error, update the state to display the error message
            setErrorMessage("Invalid credentials");
            setIsClicked(false);
        } else {
            toast.success("Logged in successfully");
            setTimeout(() => {
                window.location.reload();
            }, 500);
        }
    };

    return (
        <div className="main-content">
            <div className="content-wrapper js-content-wrapper overflow-hidden">
                <section className="form-page js-mouse-move-container" style={
                    {
                        backgroundImage: `url("https://images.unsplash.com/photo-1462536943532-57a629f6cc60")`,
                        backgroundPosition: "center"
                    }
                }>
                    <div className="form-page__content lg:py-50">
                        <div className="container">
                            <div className="row justify-center items-center">
                                <div className="col-xl-6 col-lg-8">
                                    <div className="px-50 py-50 md:px-25 md:py-25 bg-white shadow-1 rounded-16">
                                        <h3 className="text-30 lh-13">Login</h3>
                                        <p className="mt-10">
                                            {"Don't"} have an account yet?{" "}
                                            <Link
                                                href="/signup"
                                                className="text-purple-1"
                                            >
                                                Sign up for free
                                            </Link>
                                        </p>

                                        {errorMessage && <p className="alert alert-warning">{errorMessage}</p>}
                                        <form
                                            className="contact-form respondForm__form row y-gap-20 pt-30"
                                            onSubmit={handleSubmit}
                                        >
                                            <div className="col-12">
                                                <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">
                                                    Email
                                                </label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="title"
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
                                                    name="title"
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
                                                    Login
                                                </button>
                                            </div>
                                        </form>

                                        <div className="lh-12 text-dark-1 fw-500 text-center mt-20">
                                            Or sign in using
                                        </div>

                                        <div className="d-flex x-gap-20 items-center justify-between pt-20">
                                            <div>
                                                <button
                                                    className="button -sm px-24 py-20 -outline-blue-3 text-blue-3 text-14">
                                                    Log In via Facebook
                                                </button>
                                            </div>
                                            <div>
                                                <button
                                                    className="button -sm px-24 py-20 -outline-red-3 text-red-3 text-14">
                                                    Log In via Github
                                                </button>
                                            </div>
                                        </div>
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

export default Login;
