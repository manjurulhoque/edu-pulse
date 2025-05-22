import { LayoutDashboard, PlayCircle, List, Users, DollarSign, Heart } from "lucide-react";

export const instructorSidebarItems = [
    {
        id: 1,
        href: "/instructor/dashboard",
        icon: LayoutDashboard,
        text: "Dashboard",
    },
    {
        id: 3,
        href: "/instructor/dashboard/my-created-courses",
        icon: PlayCircle,
        text: "Created Courses",
    },
    {
        id: 4,
        href: "/instructor/dashboard/create-course",
        icon: List,
        text: "Create Course",
    },
];

export const adminSidebarItems = [
    {
        id: 1,
        href: "/admin",
        icon: LayoutDashboard,
        text: "Dashboard",
    },
    {
        id: 2,
        href: "/admin/sales",
        icon: DollarSign,
        text: "Sales",
    },
    {
        id: 3,
        href: "/admin/courses",
        icon: PlayCircle,
        text: "All Courses",
    },
    {
        id: 4,
        href: "/admin/users",
        icon: Users,
        text: "All Users",
    },
    {
        id: 5,
        href: "/admin/categories",
        icon: List,
        text: "All Categories",
    },
];

export const userSidebarItems = [
    {
        id: 1,
        href: "/student/dashboard",
        icon: LayoutDashboard,
        text: "Dashboard",
    },
    {
        id: 2,
        href: "/student/dashboard/my-courses",
        icon: PlayCircle,
        text: "My Learning",
    },
    {
        id: 3,
        href: "/student/dashboard/wishlist",
        icon: Heart,
        text: "Wishlist",
    },
];
