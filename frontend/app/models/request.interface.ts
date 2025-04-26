export interface PaginationArgs {
    page: number;
    page_size: number;
    search?: string | null;
}

export interface PaginatedResponse<T> {
    total: number;
    page_size: number;
    page: number;
    total_pages: number;
    next_page: string;
    previous_page: string;
    results: T[];
}

export interface Response<T> {
    data: T;
    message: string;
}
