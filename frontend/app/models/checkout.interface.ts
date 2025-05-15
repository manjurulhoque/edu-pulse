import { Course } from "./course.interface";
import { User } from "./user.interface";

export interface Checkout {
    id: number;
    full_name: string;
    email: string;
    address: string;
    city: string;
    country: string;
    zip_code: string;
    created_at: string;
    updated_at: string;
    user_id: number;
    items: CheckoutItem[];
    user?: User;
}

export interface CheckoutItem {
    id: number;
    checkout_id: number;
    course_id: number;
    course: Course;
}
