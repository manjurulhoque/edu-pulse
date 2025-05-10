import AdminDashboardHome from "@/app/components/admin/AdminDashboardHome";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Admin Dashboard",
    description: "Admin Dashboard",
};

export default function AdminDashboardPage() {
    return <AdminDashboardHome />;
}
