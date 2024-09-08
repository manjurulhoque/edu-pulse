import React from "react";
import Link from "next/link";

export default function MobileFooter() {
    return (
        <>
            <div className="mobile-footer px-20 py-20 border-top-light js-mobile-footer">
                <div className="mobile-footer__number">
                    <div className="text-17 fw-500 text-dark-1">Call us</div>
                    <div className="text-17 fw-500 text-purple-1">12121212</div>
                </div>

                <div className="lh-2 mt-10">
                    <div>
                        123, ABCED,
                        <br /> ASAWQ.
                    </div>
                    <div>hi@example.com</div>
                </div>

                <div className="mobile-socials mt-10">
                    <Link
                        href="#"
                        className="d-flex items-center justify-center rounded-full size-40"
                    >
                        <i className="fa fa-facebook"></i>
                    </Link>

                    <Link
                        href="#"
                        className="d-flex items-center justify-center rounded-full size-40"
                    >
                        <i className="fa fa-twitter"></i>
                    </Link>

                    <Link
                        href="#"
                        className="d-flex items-center justify-center rounded-full size-40"
                    >
                        <i className="fa fa-instagram"></i>
                    </Link>

                    <Link
                        href="#"
                        className="d-flex items-center justify-center rounded-full size-40"
                    >
                        <i className="fa fa-linkedin"></i>
                    </Link>
                </div>
            </div>
        </>
    );
}
