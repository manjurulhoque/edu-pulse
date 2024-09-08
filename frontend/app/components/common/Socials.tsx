import { socialMediaLinks } from "../../data/socialLinks";
import React from "react";

const Socials = ({ componentsClass, textSize }: any) => {
    return (
        <>
            {socialMediaLinks.map((link, index) => (
                <a
                    key={index}
                    className={componentsClass ? componentsClass : ""}
                    href={link.href}
                >
                    <i className={`${link.iconClassName} ${textSize}`}></i>
                </a>
            ))}
        </>
    );
};

export default Socials;
