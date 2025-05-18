"use client";

import { useGetReviewsForCourseQuery } from "@/app/store/reducers/reviews/api";
import Star from "../common/Star";
import { Course } from "@/app/models/course.interface";

const CourseReviews = ({ course }: { course: Course }) => {
    const { data: reviewResponse, isLoading, error } = useGetReviewsForCourseQuery({ courseId: course.id });
    if (isLoading) return <div>Loading...</div>;
    if (!reviewResponse || reviewResponse.data?.length === 0) {
        return (
            <div id="reviews" className="pt-60 lg:pt-40">
                <div className="blogPost -comments">
                    <div className="blogPost__content">
                        <h2 className="text-20 fw-500">Student feedback</h2>
                        <div className="text-center py-50">
                            <div className="text-16 text-light-1 mb-20">No reviews yet. Check back later.</div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div id="reviews" className="pt-60 lg:pt-40">
            <div className="blogPost -comments">
                <div className="blogPost__content">
                    <h2 className="text-20 fw-500">Student feedback</h2>
                    <div className="row x-gap-10 y-gap-10 pt-30">
                        <div className="col-md-4">
                            <div className="d-flex items-center justify-center flex-column py-50 text-center bg-light-6 rounded-8">
                                <div className="text-60 lh-11 text-dark-1 fw-500">4.8</div>
                                <div className="d-flex x-gap-5 mt-10">
                                    <Star star={5} textSize={"text-11"} />
                                </div>
                                <div className="mt-10">Course Rating</div>
                            </div>
                        </div>

                        <div className="col-md-8">
                            <div className="py-20 px-30 bg-light-6 rounded-8">
                                <div className="row y-gap-15">
                                    <div className="col-12">
                                        <div className="d-flex items-center">
                                            <div className="progress-bar w-1/1 mr-15">
                                                <div className="progress-bar__bg bg-light-12"></div>
                                                <div className="progress-bar__bar bg-purple-1 w-1/1"></div>
                                            </div>
                                            <div className="d-flex x-gap-5 pr-15">
                                                <Star star={5} />
                                            </div>
                                            <div className="text-dark-1">70%</div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="d-flex items-center">
                                            <div className="progress-bar w-1/1 mr-15">
                                                <div className="progress-bar__bg bg-light-12"></div>
                                                <div className="progress-bar__bar bg-purple-1 w-1/2"></div>
                                            </div>
                                            <div className="d-flex x-gap-5 pr-15">
                                                <Star star={5} />
                                            </div>
                                            <div className="text-dark-1">15%</div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="d-flex items-center">
                                            <div className="progress-bar w-1/1 mr-15">
                                                <div className="progress-bar__bg bg-light-12"></div>
                                                <div className="progress-bar__bar bg-purple-1 w-1/3"></div>
                                            </div>
                                            <div className="d-flex x-gap-5 pr-15">
                                                <Star star={5} />
                                            </div>
                                            <div className="text-dark-1">20%</div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="d-flex items-center">
                                            <div className="progress-bar w-1/1 mr-15">
                                                <div className="progress-bar__bg bg-light-12"></div>
                                                <div className="progress-bar__bar bg-purple-1 w-1/5"></div>
                                            </div>
                                            <div className="d-flex x-gap-5 pr-15">
                                                <Star star={5} />
                                            </div>
                                            <div className="text-dark-1">3%</div>
                                        </div>
                                    </div>

                                    <div className="col-12">
                                        <div className="d-flex items-center">
                                            <div className="progress-bar w-1/1 mr-15">
                                                <div className="progress-bar__bg bg-light-12"></div>
                                                <div className="progress-bar__bar bg-purple-1 w-1/7"></div>
                                            </div>
                                            <div className="d-flex x-gap-5 pr-15">
                                                <Star star={5} />
                                            </div>
                                            <div className="text-dark-1">2%</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-20 fw-500 mt-60 lg:mt-40">Reviews</h2>
                    <ul className="comments__list mt-30">
                        {reviewResponse.data?.slice(0, 2).map((elm, i) => (
                            <li key={i} className="comments__item">
                                <div className="comments__item-inner md:direction-column">
                                    <div className="comments__img mr-20">
                                        <div
                                            className="bg-image rounded-full js-lazy"
                                            style={{ backgroundImage: `url(${elm.user.avatar})` }}
                                        ></div>
                                    </div>

                                    <div className="comments__body md:mt-15">
                                        <div className="comments__header">
                                            <h4 className="text-17 fw-500 lh-15">
                                                {elm.user.name}
                                                <span className="text-13 text-light-1 fw-400">3 Days ago</span>
                                            </h4>

                                            <div className="stars"></div>
                                        </div>

                                        <h5 className="text-15 fw-500 mt-15">{elm.comment}</h5>
                                        <div className="comments__text mt-10">
                                            <p>{elm.comment}</p>
                                        </div>

                                        <div className="comments__helpful mt-20">
                                            <span className="text-13 text-purple-1">Was this review helpful?</span>
                                            <button className="button text-13 -sm -purple-1 text-white">Yes</button>
                                            <button className="button text-13 -sm -light-7 text-purple-1">No</button>
                                        </div>
                                    </div>
                                </div>
                            </li>
                        ))}

                        <li className="comments__item">
                            <div className="d-flex justify-center">
                                <button className="text-purple-1 lh-12 underline fw-500">View All Reviews</button>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            <div className="respondForm pt-60">
                <h3 className="text-20 fw-500">Write a Review</h3>

                <div className="mt-30">
                    <h4 className="text-16 fw-500">What is it like to Course?</h4>
                    <div className="d-flex x-gap-10 pt-10">
                        <Star star={5} textSize={"text-14"} />
                    </div>
                </div>

                <form className="contact-form respondForm__form row y-gap-30 pt-30" onSubmit={() => {}}>
                    <div className="col-12">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Review Title</label>
                        <input required type="text" name="title" placeholder="Great Courses" />
                    </div>
                    <div className="col-12">
                        <label className="text-16 lh-1 fw-500 text-dark-1 mb-10">Review Content</label>
                        <textarea required name="comment" placeholder="Message" rows={8}></textarea>
                    </div>
                    <div className="col-12">
                        <button type="submit" name="submit" id="submit" className="button -md -purple-1 text-white">
                            Submit Review
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CourseReviews;
