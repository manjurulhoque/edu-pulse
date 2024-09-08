"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { sidebarItems } from "@/app/data/dashBoardSidebar";

export default function Sidebar() {
    const pathname = usePathname();
    return (
        <div className="sidebar -dashboard">
            {sidebarItems.map((elm, i) => (
                <div
                    key={i}
                    className={`sidebar__item   ${
                        pathname == elm.href ? "-is-active" : ""
                    } `}
                >
                    <Link
                        key={i}
                        href={elm.href}
                        className="d-flex items-center text-17 lh-1 fw-500 "
                    >
                        <i className={`${elm.iconClass} mr-15`}></i>
                        {elm.text}
                    </Link>
                </div>
            ))}
        </div>
    );
}
