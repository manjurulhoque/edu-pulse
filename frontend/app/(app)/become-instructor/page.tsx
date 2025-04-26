import React from "react";
import Image from "next/image";
import Link from "next/link";

export const metadata = {
    title: "Become an Instructor | Edu Pulse",
    description:
        "Join our community of expert instructors and share your knowledge with students worldwide.",
};

export default async function BecomeInstructorPage() {
    return (
        <div className="main-content">
            <div className="content-wrapper js-content-wrapper overflow-hidden">
                {/* Hero Section */}
                <section
                    className="page-header -type-1"
                    style={{ marginTop: "5%" }}
                >
                    <div className="container">
                        <div className="row y-gap-30 justify-between items-center">
                            <div className="col-lg-6">
                                <div className="composition -type-8">
                                    <div className="-el-1">
                                        <Image
                                            className="w-1/1"
                                            src="/assets/img/become-instructor/instructor-illustration.svg"
                                            width={600}
                                            height={400}
                                            alt="Become an instructor"
                                            priority
                                        />
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-5">
                                <div className="composition -type-8">
                                    <h1 className="text-60 lg:text-40 md:text-30 mb-15">
                                        Share Your Knowledge, Inspire Others
                                    </h1>
                                    <p className="text-18 mb-30">
                                        Join our community of expert instructors
                                        and help students achieve their learning
                                        goals.
                                    </p>
                                    <div className="d-flex x-gap-10 items-center">
                                        <Link
                                            href="/signup?type=instructor"
                                            className="button -md -dark-1 text-white"
                                        >
                                            Get Started
                                        </Link>
                                        <Link
                                            href="#requirements"
                                            className="button -md -outline-blue-1 text-blue-1"
                                        >
                                            Learn More
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Benefits Section */}
                <section className="layout-pt-md layout-pb-lg">
                    <div className="container">
                        <div className="row y-gap-30 justify-between">
                            <div className="col-lg-5">
                                <h2 className="text-30 fw-500">
                                    Why Become an Instructor?
                                </h2>
                                <p className="mt-10">
                                    Teaching on Edu Pulse offers numerous
                                    benefits for professionals looking to share
                                    their expertise.
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <div className="row y-gap-30">
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    Reach Global Students
                                                </h4>
                                                <p className="mt-10">
                                                    Connect with learners from
                                                    around the world who are
                                                    eager to learn from your
                                                    expertise.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    Earn Income
                                                </h4>
                                                <p className="mt-10">
                                                    Generate revenue through
                                                    course sales and build a
                                                    sustainable income stream.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    Flexible Schedule
                                                </h4>
                                                <p className="mt-10">
                                                    Create courses at your own
                                                    pace and teach from anywhere
                                                    in the world.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    Build Your Brand
                                                </h4>
                                                <p className="mt-10">
                                                    Establish yourself as an
                                                    authority in your field and
                                                    grow your professional
                                                    network.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Requirements Section */}
                <section
                    id="requirements"
                    className="layout-pt-md layout-pb-lg bg-light-2"
                >
                    <div className="container">
                        <div className="row y-gap-30 justify-between">
                            <div className="col-lg-5">
                                <h2 className="text-30 fw-500">
                                    Requirements to Become an Instructor
                                </h2>
                                <p className="mt-10">
                                    We want to ensure our platform maintains
                                    high-quality educational content for our
                                    students.
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <div className="row y-gap-30">
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    Expertise
                                                </h4>
                                                <p className="mt-10">
                                                    Demonstrate knowledge and
                                                    experience in your subject
                                                    area.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    Communication Skills
                                                </h4>
                                                <p className="mt-10">
                                                    Ability to explain complex
                                                    topics in a clear and
                                                    engaging manner.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    Commitment
                                                </h4>
                                                <p className="mt-10">
                                                    Dedication to creating
                                                    high-quality educational
                                                    content and supporting
                                                    students.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    Technical Skills
                                                </h4>
                                                <p className="mt-10">
                                                    Basic knowledge of video
                                                    recording and course
                                                    creation tools.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Process Section */}
                <section className="layout-pt-md layout-pb-lg">
                    <div className="container">
                        <div className="row y-gap-30 justify-between">
                            <div className="col-lg-5">
                                <h2 className="text-30 fw-500">How It Works</h2>
                                <p className="mt-10">
                                    Becoming an instructor on Edu Pulse is a
                                    straightforward process.
                                </p>
                            </div>
                            <div className="col-lg-6">
                                <div className="row y-gap-30">
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    1. Sign Up
                                                </h4>
                                                <p className="mt-10">
                                                    Create an instructor account
                                                    and complete your profile.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    2. Create Your Course
                                                </h4>
                                                <p className="mt-10">
                                                    Design your curriculum,
                                                    record videos, and prepare
                                                    materials.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    3. Submit for Review
                                                </h4>
                                                <p className="mt-10">
                                                    Our team will review your
                                                    course to ensure it meets
                                                    our quality standards.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="d-flex items-start">
                                            <div className="icon-play text-24 fw-500 text-blue-1 mr-15"></div>
                                            <div>
                                                <h4 className="text-18 fw-500">
                                                    4. Launch & Earn
                                                </h4>
                                                <p className="mt-10">
                                                    Once approved, your course
                                                    goes live and you start
                                                    earning from student
                                                    enrollments.
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* CTA Section */}
                <section className="layout-pt-md layout-pb-lg bg-blue-1">
                    <div className="container">
                        <div className="row y-gap-30 justify-between items-center">
                            <div className="col-lg-6">
                                <h2 className="text-30 fw-500 text-white">
                                    Ready to Start Teaching?
                                </h2>
                                <p className="mt-10 text-white">
                                    Join thousands of instructors who are
                                    already making a difference in students'
                                    lives.
                                </p>
                            </div>
                            <div className="col-lg-5">
                                <div className="d-flex x-gap-10 items-center">
                                    <Link
                                        href="/signup?type=instructor"
                                        className="button -md -outline-white text-white"
                                    >
                                        Become an Instructor
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}
