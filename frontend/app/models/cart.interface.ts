export interface CartItem {
    id: number;
    course_id: number;
    cart_id: number;
    created_at: string;
    course: {
        id: number;
        title: string;
        preview_image: string;
        actual_price: number;
        discounted_price: number;
        is_free: boolean;
    };
}

export interface Cart {
    id: number;
    user_id: number;
    items: CartItem[];
    created_at: string;
    updated_at: string;
}