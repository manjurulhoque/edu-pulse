"use client";

import {
    useGetAverageRatingForCourseQuery,
    useGetRatingDistributionForCourseQuery,
    useGetReviewsForCourseQuery,
} from "@/app/store/reducers/reviews/api";
import { Course } from "@/app/models/course.interface";
import { getUserImagePath } from "@/app/utils/image-path";
import StarRating from "../common/StarRating";

const CourseReviews = ({ course }: { course: Course }) => {
    const {
        data: reviewResponse,
        isLoading: isReviewsLoading,
        error,
    } = useGetReviewsForCourseQuery({ courseId: course.id });
    const { data: averageRatingResponse, isLoading: isAverageRatingLoading } = useGetAverageRatingForCourseQuery({
        courseId: course.id,
    });
    const { data: ratingDistributionResponse, isLoading: isRatingDistributionLoading } =
        useGetRatingDistributionForCourseQuery({
            courseId: course.id,
        });
    const averageRating = averageRatingResponse?.data || 0;
    const ratingDistribution = ratingDistributionResponse?.data || {
        distribution: {
            "1_star": 0,
            "2_star": 0,
            "3_star": 0,
            "4_star": 0,
            "5_star": 0,
        },
        total_reviews: 0,
    };
    if (isReviewsLoading || isAverageRatingLoading || isRatingDistributionLoading)
        return (
            <div className="row justify-center pt-60 lg:pt-40">
                <div className="col-auto">
                    <div className="spinner-border" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            </div>
        );

    return (
        <div id="reviews" className="pt-60 lg:pt-40">
            <div className="blogPost -comments">
                <div className="blogPost__content">
                    <h2 className="text-20 fw-500">Student feedback</h2>
                    <div className="row x-gap-10 y-gap-10 pt-30">
                        {isAverageRatingLoading && (
                            <div className="row justify-center pt-60 lg:pt-40">
                                <div className="col-auto">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!isAverageRatingLoading && (
                            <div className="col-md-4">
                                <div className="d-flex items-center justify-center flex-column py-50 text-center bg-light-6 rounded-8">
                                    <div className="text-60 lh-11 text-dark-1 fw-500">{averageRating}</div>
                                    <div className="d-flex x-gap-5 mt-10">
                                        <StarRating star={5} filledStar={5} size={20} />
                                    </div>
                                    <div className="mt-10">Course Rating</div>
                                    <div className="mt-10">
                                        {ratingDistribution.total_reviews > 0
                                            ? `${ratingDistribution.total_reviews} reviews`
                                            : `${ratingDistribution.total_reviews} review`}
                                    </div>
                                </div>
                            </div>
                        )}

                        {isRatingDistributionLoading && (
                            <div className="row justify-center pt-60 lg:pt-40">
                                <div className="col-auto">
                                    <div className="spinner-border" role="status">
                                        <span className="visually-hidden">Loading...</span>
                                    </div>
                                </div>
                            </div>
                        )}
                        {!isRatingDistributionLoading && (
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
                                                    <StarRating star={5} filledStar={5} />
                                                </div>
                                                <div className="text-dark-1">
                                                    {ratingDistribution.distribution["5_star"]}%
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="d-flex items-center">
                                                <div className="progress-bar w-1/1 mr-15">
                                                    <div className="progress-bar__bg bg-light-12"></div>
                                                    <div className="progress-bar__bar bg-purple-1 w-1/2"></div>
                                                </div>
                                                <div className="d-flex x-gap-5 pr-15">
                                                    <StarRating star={5} filledStar={4} />
                                                </div>
                                                <div className="text-dark-1">
                                                    {ratingDistribution.distribution["4_star"]}%
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="d-flex items-center">
                                                <div className="progress-bar w-1/1 mr-15">
                                                    <div className="progress-bar__bg bg-light-12"></div>
                                                    <div className="progress-bar__bar bg-purple-1 w-1/3"></div>
                                                </div>
                                                <div className="d-flex x-gap-5 pr-15">
                                                    <StarRating star={5} filledStar={3} />
                                                </div>
                                                <div className="text-dark-1">
                                                    {ratingDistribution.distribution["3_star"]}%
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="d-flex items-center">
                                                <div className="progress-bar w-1/1 mr-15">
                                                    <div className="progress-bar__bg bg-light-12"></div>
                                                    <div className="progress-bar__bar bg-purple-1 w-1/5"></div>
                                                </div>
                                                <div className="d-flex x-gap-5 pr-15">
                                                    <StarRating star={5} filledStar={2} />
                                                </div>
                                                <div className="text-dark-1">
                                                    {ratingDistribution.distribution["2_star"]}%
                                                </div>
                                            </div>
                                        </div>

                                        <div className="col-12">
                                            <div className="d-flex items-center">
                                                <div className="progress-bar w-1/1 mr-15">
                                                    <div className="progress-bar__bg bg-light-12"></div>
                                                    <div className="progress-bar__bar bg-purple-1 w-1/7"></div>
                                                </div>
                                                <div className="d-flex x-gap-5 pr-15">
                                                    <StarRating star={5} filledStar={1} />
                                                </div>
                                                <div className="text-dark-1">
                                                    {ratingDistribution.distribution["1_star"]}%
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    <h2 className="text-20 fw-500 mt-60 lg:mt-40">Reviews</h2>
                    {isReviewsLoading && (
                        <div className="row justify-center pt-60 lg:pt-40">
                            <div className="col-auto">
                                <div className="spinner-border" role="status">
                                    <span className="visually-hidden">Loading...</span>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isReviewsLoading && (!reviewResponse || reviewResponse.data?.length === 0) && (
                        <div id="reviews" className="pt-60 lg:pt-40">
                            <div className="blogPost -comments">
                                <div className="blogPost__content">
                                    <h2 className="text-20 fw-500">Student feedback</h2>
                                    <div className="text-center py-50">
                                        <div className="text-16 text-light-1 mb-20">
                                            No reviews yet. Check back later.
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    {!isReviewsLoading && (
                        <ul className="comments__list mt-30">
                            {reviewResponse?.data?.slice(0, 2).map((review, i) => (
                                <li key={i} className="comments__item">
                                    <div className="comments__item-inner md:direction-column">
                                        <div className="comments__img mr-20">
                                            <div
                                                className="bg-image rounded-full js-lazy"
                                                style={{ backgroundImage: `url(${getUserImagePath(review.user)})` }}
                                            ></div>
                                        </div>

                                        <div className="comments__body md:mt-15">
                                            <div className="comments__header">
                                                <h4 className="text-17 fw-500 lh-15">
                                                    {review.user.name}{" "}
                                                    <span className="text-13 text-light-1 fw-400">
                                                        {new Date(review.created_at).toLocaleDateString("en-US", {
                                                            year: "numeric",
                                                            month: "long",
                                                            day: "numeric",
                                                        })}
                                                    </span>
                                                </h4>

                                                <div className="stars"></div>
                                            </div>

                                            {/* <h5 className="text-15 fw-500 mt-15">{elm.comment}</h5> */}
                                            <div className="comments__text mt-10">
                                                <p>{review.comment || "No comment"}</p>
                                            </div>

                                            <div className="comments__helpful mt-20">
                                                <span className="text-13 text-purple-1">Was this review helpful?</span>
                                                <button className="button text-13 -sm -purple-1 text-white">Yes</button>
                                                <button className="button text-13 -sm -light-7 text-purple-1">
                                                    No
                                                </button>
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
                    )}
                </div>
            </div>

            {/* <div className="respondForm pt-60">
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
            </div> */}
        </div>
    );
};

export default CourseReviews;
