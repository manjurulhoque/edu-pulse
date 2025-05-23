import { Course } from "./course.interface";
import { User } from "./user.interface";

export interface Wishlist {
    id: number;
    user_id: number;
    course_id: number;
    user: User;
    course: Course;
    created_at: Date;
    updated_at: Date;
}
