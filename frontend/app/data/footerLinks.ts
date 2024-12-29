import { store } from "../store";
import { CategoryApi } from "../store/reducers/categories/api";

const staticLinks = [
    {
        title: "ABOUT",
        links: [
            { href: "/about", label: "About Us" },
            { href: "/blog", label: "Learner Stories" },
            { href: "/become-instructor", label: "Careers" },
        ],
    },
    {
        title: "SUPPORT",
        links: [
            { href: "/terms", label: "Documentation" },
            { href: "/help-center", label: "FAQs" },
            { href: "/dashboard", label: "Dashboard" },
            { href: "/contact", label: "Contact" },
        ],
    },
];

export const getFooterLinks = async () => {
    try {
        const result = await store.dispatch(
            CategoryApi.endpoints.categories.initiate(null)
        );

        // Check if the request was successful and data exists
        if (result.isSuccess && result.data) {
            const categorySection = {
                title: "CATEGORIES",
                links: result.data.map((cat: { id: number; name: string }) => ({
                    href: `/courses/category/${cat.id}`,
                    label: cat.name,
                })),
            };

            return [
                ...staticLinks.slice(0, 1),
                categorySection,
                ...staticLinks.slice(1),
            ];
        }

        // If request failed or no data, return static links
        console.error("Failed to fetch categories:", result.error);
        return staticLinks;
    } catch (error) {
        console.error("Error fetching categories:", error);
        return staticLinks;
    }
};
