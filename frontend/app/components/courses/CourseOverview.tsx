"use client";

import {faCheck} from "@fortawesome/free-solid-svg-icons";
import React, {useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function CourseOverview({course}: { course: Course }) {
    const [showMore, setShowMore] = useState(false);

    return (
        <div id="overview" className="pt-60 lg:pt-40 to-over">
            <h4 className="text-18 fw-500">Description</h4>

            <div
                className={`show-more  mt-30 js-show-more ${
                    showMore ? "is-active" : ""
                } `}
            >
                <div
                    className="show-more__content "
                    style={showMore ? {maxHeight: "370px"} : {}}
                    dangerouslySetInnerHTML={{__html: course.description}}
                >
                </div>

                <button
                    onClick={() => setShowMore((pre) => !pre)}
                    className="show-more__button text-purple-1 fw-500 underline mt-30"
                >
                    Show more
                </button>
            </div>

            <div className="mt-60">
                <h4 className="text-20 mb-30">What you will learn</h4>
                <div className="row x-gap-100 justfiy-between">
                    <div className="col-md-10">
                        <div className="y-gap-20">
                            <div className="d-flex items-center will-learn" dangerouslySetInnerHTML={{__html: course.student_will_learn}}></div>
                        </div>
                    </div>

                    <div className="col-md-6">
                        <div className="y-gap-20">
                            {/*{course.description.slice(6).map((elm, i) => (*/}
                            {/*    <div key={i} className="d-flex items-center">*/}
                            {/*        <div*/}
                            {/*            className="d-flex justify-center items-center border-light rounded-full size-20 mr-10">*/}
                            {/*            <FontAwesomeIcon*/}
                            {/*                icon={faCheck}*/}
                            {/*                style={{transform: "scale(0.7)", opacity: "0.7"}}*/}
                            {/*            />*/}
                            {/*        </div>*/}
                            {/*        <p>{elm}</p>*/}
                            {/*    </div>*/}
                            {/*))}*/}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-60">
                <h4 className="text-20 mb-2">Requirements</h4>
                <div className="requirements" dangerouslySetInnerHTML={{__html: course.requirements}}></div>
            </div>
        </div>
    );
}
