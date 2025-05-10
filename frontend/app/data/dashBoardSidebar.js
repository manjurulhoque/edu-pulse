import { LayoutDashboard, PlayCircle, List, Users } from 'lucide-react';

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
        href: "/admin/courses",
        icon: PlayCircle,
        text: "All Courses",
    },
    {
        id: 3,
        href: "/admin/users",
        icon: Users,
        text: "All Users",
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
];
