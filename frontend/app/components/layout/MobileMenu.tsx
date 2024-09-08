"use client";

import MobileFooter from "./MobileFooter";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { menuList } from "@/app/data/menu";

export default function MobileMenu({
                                       setActiveMobileMenu,
                                       activeMobileMenu,
                                   }: any) {
    const [showMenu, setShowMenu] = useState(false);
    const [menuNesting, setMenuNesting] = useState([]);
    const [menuItem, setMenuItem] = useState("");
    const [submenu, setSubmenu] = useState("");

    useEffect(() => {
        menuList.forEach((elm) => {
            elm?.links?.forEach((elm2: any) => {
                if (elm2.href?.split("/")[1] == pathname?.split("/")[1]) {
                    setMenuItem(elm.title);
                } else {
                    elm2?.links?.map((elm3: any) => {
                        if (
                            elm3.href?.split("/")[1] == pathname?.split("/")[1]
                        ) {
                            setMenuItem(elm.title);
                            setSubmenu(elm2.title);
                        }
                    });
                }
            });
        });
    }, []);
    useEffect(() => {
        setShowMenu(true);
    }, []);
    const pathname = usePathname();
    return (
        <div
            className={`header-menu js-mobile-menu-toggle ${
                activeMobileMenu ? "-is-el-visible" : ""
            }`}
        >
            <div className="header-menu__content">
                <div className="mobile-bg js-mobile-bg"></div>

                <div className="d-none xl:d-flex items-center px-20 py-20 border-bottom-light">
                    <Link
                        href="/login"
                        className={`text-dark-1 ${
                            pathname == "/login" ? "activeMenu" : "inActiveMenu"
                        } `}
                    >
                        Log in
                    </Link>
                    <Link
                        href="/signup"
                        className={`text-dark-1 ml-30 ${
                            pathname == "/signup"
                                ? "activeMenu"
                                : "inActiveMenu"
                        } `}
                    >
                        Sign Up
                    </Link>
                </div>

                {showMenu && activeMobileMenu && (
                    <div className="mobileMenu text-dark-1">
                        {menuList.map((elm, i) => {
                            if (elm.title) {
                                return (
                                    <div key={i} className="submenuOne">
                                        <div
                                            className="title"
                                            onClick={() =>
                                                setMenuNesting((pre): any => {
                                                    return pre[0] == elm.title
                                                        ? []
                                                        : [elm.title];
                                                })
                                            }
                                        >
                                            <span
                                                className={
                                                    elm.title == menuItem
                                                        ? "activeMenu"
                                                        : "inActiveMenu"
                                                }
                                            >
                                                {elm.title}
                                            </span>
                                            <i
                                                className={
                                                    menuNesting[0] == elm.title
                                                        ? "icon-chevron-right text-13 ml-10 active"
                                                        : "icon-chevron-right text-13 ml-10"
                                                }
                                            ></i>
                                        </div>

                                        {elm.links &&
                                            elm.links.map((itm: any, index) => (
                                                <div
                                                    key={index}
                                                    className={
                                                        menuNesting[0] ==
                                                        elm.title
                                                            ? "toggle active"
                                                            : "toggle"
                                                    }
                                                >
                                                    {itm.href && (
                                                        <Link
                                                            key={i}
                                                            className={
                                                                pathname?.split(
                                                                    "/"
                                                                )[1] ==
                                                                itm.href?.split(
                                                                    "/"
                                                                )[1]
                                                                    ? "activeMenu link"
                                                                    : "link inActiveMenu"
                                                            }
                                                            href={itm.href}
                                                        >
                                                            {itm.label}
                                                        </Link>
                                                    )}

                                                    {itm.links && (
                                                        <div className="submenuTwo">
                                                            <div
                                                                className="title"
                                                                onClick={() =>
                                                                    setMenuNesting(
                                                                        (
                                                                            pre
                                                                        ): any => {
                                                                            return pre[1] ==
                                                                            itm.title
                                                                                ? [
                                                                                    pre[0],
                                                                                ]
                                                                                : [
                                                                                    pre[0],
                                                                                    itm.title,
                                                                                ];
                                                                        }
                                                                    )
                                                                }
                                                            >
                                                                <span
                                                                    className={
                                                                        itm.title ==
                                                                        submenu
                                                                            ? "activeMenu"
                                                                            : "inActiveMenu"
                                                                    }
                                                                >
                                                                    {itm.title &&
                                                                        itm.title}
                                                                </span>
                                                                <i
                                                                    className={
                                                                        menuNesting[1] ==
                                                                        itm.title
                                                                            ? "icon-chevron-right text-13 ml-10 active"
                                                                            : "icon-chevron-right text-13 ml-10"
                                                                    }
                                                                ></i>
                                                            </div>
                                                            <div
                                                                className={
                                                                    menuNesting[1] ==
                                                                    itm.title
                                                                        ? "toggle active"
                                                                        : "toggle"
                                                                }
                                                            >
                                                                {itm.links &&
                                                                    itm.links.map(
                                                                        (
                                                                            itm2: any,
                                                                            index3: any
                                                                        ) => (
                                                                            <Link
                                                                                key={
                                                                                    index3
                                                                                }
                                                                                className={
                                                                                    pathname?.split(
                                                                                        "/"
                                                                                    )[1] ==
                                                                                    itm2.href?.split(
                                                                                        "/"
                                                                                    )[1]
                                                                                        ? "activeMenu link"
                                                                                        : "link inActiveMenu"
                                                                                }
                                                                                href={
                                                                                    itm2.href
                                                                                }
                                                                            >
                                                                                {
                                                                                    itm2.label
                                                                                }
                                                                            </Link>
                                                                        )
                                                                    )}
                                                            </div>
                                                        </div>
                                                    )}
                                                </div>
                                            ))}
                                    </div>
                                );
                            }
                        })}
                    </div>
                )}

                {/* mobile footer start */}
                <MobileFooter/>
                {/* mobile footer end */}
            </div>

            <div
                className="header-menu-close"
                onClick={() => {
                    setActiveMobileMenu(false);
                }}
                data-el-toggle=".js-mobile-menu-toggle"
            >
                <div className="size-40 d-flex items-center justify-center rounded-full bg-white">
                    <div className="icon-close text-dark-1 text-16"></div>
                </div>
            </div>

            <div
                className="header-menu-bg"
                onClick={() => setActiveMobileMenu(false)}
            ></div>
        </div>
    );
}
