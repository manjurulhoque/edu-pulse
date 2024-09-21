"use client";

import React, {useState} from "react";
import {faChevronDown, faChevronUp} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const CourseContent: React.FC<{ course: Course }> = ({course}) => {
    const [activeItemId, setActiveItemId] = useState(0);
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div id="course-content" className="pt-60 lg:pt-40">
            <h2 className="text-20 fw-500">Course Contents</h2>

            <div className="d-flex justify-between items-center mt-30">
                <div className="">Sections</div>
                <a href="#" className="underline text-purple-1">
                    Expand All Sections
                </a>
            </div>

            <div className="mt-10">
                {
                    course?.sections.map((section, i) => (
                        <div key={i} className="accordion -block-1 text-left js-accordion mb-5">
                            <div
                                key={i}
                                className={`accordion__item ${
                                    activeItemId == section.id ? "is-active" : ""
                                }`}
                            >
                                <div
                                    onClick={() =>
                                        setActiveItemId((pre) => (pre == section.id ? 0 : Number(section.id)))
                                    }
                                    className="accordion__button py-20 px-30 bg-light-4"
                                >
                                    <div className="d-flex items-center">
                                        <div className="accordion__icon ml-10">
                                            <div className="icon">
                                                <FontAwesomeIcon icon={faChevronDown}/>
                                            </div>
                                            <div className="icon">
                                                <FontAwesomeIcon icon={faChevronUp}/>
                                            </div>
                                        </div>
                                        <span className="text-17 fw-500 text-dark-1 ml-3">
                                          {section.title}
                                        </span>
                                    </div>
                                    <div>
                                        {section.lessons?.length} lectures
                                    </div>
                                </div>

                                <div className="accordion__content" style={activeItemId == section.id ? { maxHeight: "700px" } : {}}>
                                    <div className="accordion__content__inner px-30 py-30">
                                        <div className="y-gap-20">
                                            {section.lessons?.map((lesson, index) => (
                                                <div key={index} className="d-flex justify-between">
                                                    <div className="d-flex items-center">
                                                        <div
                                                            className="d-flex justify-center items-center size-30 rounded-full bg-purple-3 mr-10">
                                                            <div className="icon-play text-9"></div>
                                                        </div>
                                                        <div>{lesson.title}</div>
                                                    </div>
                                                    <div className="d-flex x-gap-20 items-center">
                                                        <span
                                                            onClick={() => setIsOpen(true)}
                                                            className="text-14 lh-1 text-purple-1 underline cursor "
                                                        >
                                                          Preview
                                                        </span>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default CourseContent;