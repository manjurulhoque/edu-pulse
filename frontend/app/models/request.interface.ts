interface PaginationArgs {
    page: number;
    page_size: number;
    search?: string | null;
}


interface PaginatedResponse<T> {
    total: number;
    page_size: number;
    page: number;
    total_pages: number;
    next_page: string;
    previous_page: string;
    results: T[];
}