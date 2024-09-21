import Header from "@/app/components/layout/Header";
import PageLinks from "@/app/components/common/PageLinks";
import {Metadata} from "next";
import Link from "next/link";
import Image from "next/image";

export const metadata: Metadata = {
    title: "About page",
    description: "About page",
};

const AboutPage = () => {
    return (
        <div className="main-content">
            <Header/>

            <div className="content-wrapper  js-content-wrapper overflow-hidden">
                <section className="page-header -type-1" style={{
                    marginTop: "150px",
                }}>
                    <div className="container">
                        <div className="page-header__content">
                            <div className="row justify-center text-center">
                                <div className="col-auto">
                                    <div>
                                        <h1 className="page-header__title">Get to know us</h1>
                                    </div>

                                    <div>
                                        <p className="page-header__text">
                                            We are on a mission to deliver engaging and coordinated training courses
                                            affordable price.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="layout-pt-md layout-pb-lg">
                    <div className="container">
                        <div className="row y-gap-50 justify-between items-center">
                            <div className="col-lg-6 pr-50 sm:pr-15">
                                <div className="composition -type-8">
                                    <div className="-el-1">
                                        <Image
                                            width={300}
                                            height={400}
                                            src="https://plus.unsplash.com/premium_vector-1719858611039-66c134efa74d"
                                            alt="image"
                                        />
                                    </div>
                                    <div className="-el-2">
                                        <Image
                                            width={200}
                                            height={200}
                                            src="https://plus.unsplash.com/premium_vector-1721131162397-943dc390c744"
                                            alt="image"
                                        />
                                    </div>
                                    <div className="-el-3">
                                        <Image
                                            width={255}
                                            height={250}
                                            src="https://plus.unsplash.com/premium_vector-1719858610584-14eae64834af"
                                            alt="image"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-5">
                                <h2 className="text-30 lh-16">
                                    Who are we?
                                </h2>
                                <p className="text-dark-1 mt-30">
                                    We are a team of passionate educators, developers, and designers who are
                                    dedicated to creating the best online learning platform for you.
                                </p>
                                <div className="d-inline-block">
                                    <Link
                                        href="/signup"
                                        className="button -md -purple-1 text-white mt-30"
                                    >
                                        Start learning now
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default AboutPage;