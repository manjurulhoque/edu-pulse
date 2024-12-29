import React from "react";
import Link from "next/link";

interface FooterLinksProps {
    links: {
        title: string;
        links: {
            href: string;
            label: string;
        }[];
    }[];
    allClasses?: string;
    parentClass?: string;
}

export default function FooterLinks({
    links,
    allClasses,
    parentClass,
}: FooterLinksProps) {
    return (
        <>
            {links.map((elm, i) => (
                <div
                    key={i}
                    className={parentClass || "col-xl-3 col-lg-3 col-md-6"}
                >
                    <div className={`${allClasses || ""} mb-3 text-white`}>
                        {elm.title}
                    </div>
                    <div className="d-flex y-gap-10 flex-column">
                        {elm.links.map((itm, index) => (
                            <Link
                                key={index}
                                href={itm.href}
                                className="text-black opacity-80 hover:opacity-100"
                            >
                                {itm.label}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </>
    );
}
