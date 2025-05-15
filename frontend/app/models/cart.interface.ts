import { Course } from "./course.interface";

export interface CartItem {
    id: number;
    course_id: number;
    cart_id: number;
    created_at: string;
    course: Course
}

export interface Cart {
    id: number;
    user_id: number;
    items: CartItem[];
    created_at: string;
    updated_at: string;
}
