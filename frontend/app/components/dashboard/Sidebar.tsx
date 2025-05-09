"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { instructorSidebarItems, adminSidebarItems, userSidebarItems } from "@/app/data/dashBoardSidebar";
import { useSession } from "next-auth/react";

export default function Sidebar() {
    const pathname = usePathname();
    const session = useSession();

    const user = session.data?.user;
    let { is_admin, is_instructor } = user || {};

    return (
        <div className="sidebar -dashboard">
            {is_admin
                ? adminSidebarItems.map((elm, i) => (
                      <div key={i} className={`sidebar__item ${pathname === elm.href ? "-is-active" : ""}`}>
                          <Link href={elm.href} className="d-flex items-center text-17 lh-1 fw-500">
                              <elm.icon className="w-5 h-5 mr-15" />
                              {elm.text}
                          </Link>
                      </div>
                  ))
                : is_instructor
                ? instructorSidebarItems.map((elm, i) => (
                      <div key={i} className={`sidebar__item ${pathname === elm.href ? "-is-active" : ""}`}>
                          <Link href={elm.href} className="d-flex items-center text-17 lh-1 fw-500">
                              <elm.icon className="w-5 h-5 mr-15" />
                              {elm.text}
                          </Link>
                      </div>
                  ))
                : userSidebarItems.map((elm, i) => (
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
