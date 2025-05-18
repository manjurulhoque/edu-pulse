"use client";

import { useGetReviewsForCourseQuery } from "@/app/store/reducers/reviews/api";
import { CourseReview } from "@/app/models/review.interface";

const CourseReviews = ({ courseId }: { courseId: number }) => {
    const { data: reviewResponse, isLoading, error } = useGetReviewsForCourseQuery({ courseId });
    if (isLoading) return <div>Loading...</div>;
    if (!reviewResponse) return <div>No reviews found</div>;
    return (
        <div className="reviews-list" id="reviews">
            {reviewResponse.data?.map((review: CourseReview) => (
                <div key={review.id}>{review.comment}</div>
            ))}
        </div>
    );
};

export default CourseReviews;
