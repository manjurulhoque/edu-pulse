"use client";

import { useState } from "react";
import { useAdminRedirect } from "@/app/hooks/useAdminRedirect";

const AdminDashboardHome = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeTab, setActiveTab] = useState("users");
    const { session, status } = useAdminRedirect();

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-50 mb-10">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">Admin Dashboard</h1>
                        <div className="mt-10">Track your admin activities and manage the platform</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardHome;
