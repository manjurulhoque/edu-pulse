import { Course } from "./course.interface";
import { User } from "./user.interface";

export interface CourseReview {
    id: number;
    course_id: number;
    course: Course;
    user_id: number;
    user: User;
    rating: number;
    comment: string;
    created_at: string;
    updated_at: string;
}
