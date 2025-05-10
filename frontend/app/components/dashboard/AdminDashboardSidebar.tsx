"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { adminSidebarItems } from "@/app/data/dashBoardSidebar";

export default function AdminDashboardSidebar() {
    const pathname = usePathname();

    return (
        <div className="sidebar -dashboard">
            {adminSidebarItems.map((elm, i) => (
                <div key={i} className={`sidebar__item ${pathname === elm.href ? "-is-active" : ""}`}>
                    <Link href={elm.href} className="d-flex items-center text-17 lh-1 fw-500">
                        <elm.icon className="w-5 h-5 mr-15" />
                        {elm.text}
                    </Link>
                </div>
            ))}
        </div>
    );
}
