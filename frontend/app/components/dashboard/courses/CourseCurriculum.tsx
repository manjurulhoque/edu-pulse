"use client";

import React, {useState} from "react";
import {useUpdateCurriculumMutation} from "@/app/store/reducers/courses/api";
import {toast} from "react-toastify";

interface CourseCurriculumProps {
    sections: Section[];
    course: Course | null;
}

const CourseCurriculum: React.FC<CourseCurriculumProps> = ({sections, course}) => {
    const [allSections, setAllSections] = useState<Section[]>(sections);
    const [updateCurriculum] = useUpdateCurriculumMutation();
    const addSection = () => {
        const newSection: Section = {
            id: null,
            title: `Untitled section`,
            lessons: [{title: "Untitled lesson", content: ""}]
        };
        setAllSections([...allSections, newSection]);
    };

    const updateSections = (sections: Section[]) => {
        setAllSections(sections);
    };

    const saveChanges = async () => {
        const result: any = await updateCurriculum({id: course?.id, formData: {"sections": allSections}});
        if (result.data) {
            toast.success("Course curriculum updated successfully");
            // window.location.href = "/my-created-courses";
        } else {
            toast.warning(result?.data?.message || "Something went wrong. Please try again later");
        }
    }

    return (
        <div className="dashboard__main">
            <div className="dashboard__content bg-light-4">
                <div className="row pb-10 mb-4">
                    <div className="col-auto">
                        <h1 className="text-30 lh-12 fw-700">{course?.title}</h1>
                        <div className="mt-10">Update your outstanding course!</div>
                    </div>
                </div>
            </div>

            <div className="row y-gap-60">
                <div className="col-12">
                    <div className="rounded-16 bg-white -dark-bg-dark-1 shadow-4 h-100">
                        <div className="d-flex items-center py-20 px-30 border-bottom-light">
                            <h2 className="text-17 lh-1 fw-500">Update course curriculum</h2>
                        </div>

                        <div className="py-30 px-30">
                            <div className="py-30 px-30">
                                {
                                    allSections.length === 0 ?
                                        <h5>No sections found for this course. Add new one!</h5> : ""
                                }
                                {allSections.map((section, index) => (
                                    <SectionCurriculum
                                        key={index}
                                        section={section}
                                        i={index}
                                        updateSections={updateSections}
                                        sections={allSections}
                                    />
                                ))}

                                <div className="row y-gap-20 justify-start pt-30">
                                    <div className="col-auto sm:w-1/1">
                                        <div style={{display: "flex", gap: "10px"}}>
                                            <button
                                                type={"button"}
                                                className="button -md -green-1 text-white sm:w-1/1"
                                                onClick={saveChanges}
                                            >
                                                Save changes
                                            </button>
                                            <button
                                                type={"button"}
                                                className="button -md -purple-1 text-white sm:w-1/1"
                                                onClick={addSection}
                                            >
                                                Add new section
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CourseCurriculum;

const SectionCurriculum: React.FC<{
    section: Section,
    i: number,
    updateSections: (sections: Section[]) => void,
    sections: Section[]
}> = ({section, i, updateSections, sections}) => {
    const [currentOpenItem, setCurrentOpenItem] = useState<string | null>(null);
    const [editLessonIndex, setEditLessonIndex] = useState<number | null>(null);
    const [lessonTitle, setLessonTitle] = useState<string>("Add your section title here...");
    const [editTitle, setEditTitle] = useState<boolean>(false);

    // section.lessons = [{title: "Untitled", content: ""}];

    const handleEditClick = (e: React.MouseEvent, index: number, title: string) => {
        e.preventDefault();
        e.stopPropagation();
        setEditLessonIndex(index);
        setLessonTitle(title);
    };

    const handleLessonTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLessonTitle(e.target.value);
    };

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const updatedSections = sections.map((sec, idx) => {
            if (idx === i) {
                return {
                    ...sec,
                    title: e.target.value
                };
            }
            return sec;
        });

        updateSections(updatedSections);
    }

    const handleLessonTitleBlur = (index: number) => {
        if (section.lessons) {
            section.lessons[index].title = lessonTitle;
        }
        setEditLessonIndex(null);
    };

    const handleLessonTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === "Enter") {
            handleLessonTitleBlur(index);
        }
    };

    const handleTitleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            setEditTitle(false);
        }
    }

    const addLesson = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const newLesson: Lesson = {title: "Untitled lesson", content: "", id: null};
        const updatedSections = sections.map((sec, idx) => {
            if (idx === i) {
                return {
                    ...sec,
                    lessons: [...(sec.lessons ?? []), newLesson]
                };
            }
            return sec;
        });

        updateSections(updatedSections);
    };

    const removeLesson = (index: number) => (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();

        const updatedSections = sections.map((sec, idx) => {
            if (idx === i) {
                return {
                    ...sec,
                    lessons: sec.lessons?.filter((_, i) => i !== index)
                };
            }
            return sec;
        });

        updateSections(updatedSections);
    }

    return (
        <>
            <div className={`row ${i != 0 ? "pt-30" : ""}  `}>
                <div className="col-12">
                    <h4 className="text-16 lh-1 fw-500">
                        {editTitle ? (
                            <input
                                type="text"
                                className={"text-16 lh-14 fw-500 text-dark-1 form-control"}
                                style={{maxWidth: "80%"}}
                                value={section.title}
                                onChange={handleTitleChange}
                                onBlur={() => setEditTitle(false)}
                                onKeyPress={handleTitleKeyPress}
                                autoFocus
                            />
                        ) : (
                            <span className="text-16 lh-14 fw-500 text-dark-1">{section.title}</span>
                        )}
                        <button
                            className="icon icon-edit ml-5"
                            onClick={(e) => setEditTitle(true)}
                        />
                        <button
                            className="icon icon-bin ml-5"
                            onClick={(e) => {
                                const updatedSections = sections.filter((_, idx) => idx !== i);
                                updateSections(updatedSections);
                            }}
                        />
                    </h4>
                </div>

                <div className="col-12">
                    <div className="accordion -block-2 text-left js-accordion">
                        {section.lessons?.map((lesson, index) => (
                            <div
                                key={index}
                                className={`accordion__item -dark-bg-dark-1 mt-10 ${
                                    currentOpenItem == `${i},${index}` ? "is-active" : ""
                                } `}
                            >
                                <div
                                    className="accordion__button py-20 px-30 bg-light-4"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        e.preventDefault();
                                        setCurrentOpenItem((pre): any => pre == `${i},${index}` ? "" : `${i},${index}`);
                                    }}
                                >
                                    <div className="d-flex items-center">
                                        <div className="icon icon-drag mr-10"></div>
                                        {editLessonIndex === index ? (
                                            <input
                                                type="text"
                                                className={"text-16 lh-14 fw-500 text-dark-1 form-control"}
                                                style={{maxWidth: "100%"}}
                                                value={lessonTitle}
                                                onChange={handleLessonTitleChange}
                                                onBlur={() => handleLessonTitleBlur(index)}
                                                onKeyPress={(e) => handleLessonTitleKeyPress(e, index)}
                                                autoFocus
                                            />
                                        ) : (
                                            <span className="text-16 lh-14 fw-500 text-dark-1">{lesson.title}</span>
                                        )}
                                    </div>

                                    <div className="d-flex x-gap-10 items-center">
                                        <button
                                            className="icon icon-edit mr-5"
                                            onClick={(e) => handleEditClick(e, index, lesson.title)}
                                        />
                                        <a href="#" className="icon icon-bin" onClick={removeLesson(index)}></a>
                                        <div className="accordion__icon mr-0">
                                            <div
                                                className="d-flex items-center justify-center icon icon-chevron-down"></div>
                                            <div
                                                className="d-flex items-center justify-center icon icon-chevron-up"></div>
                                        </div>
                                    </div>
                                </div>

                                <div
                                    className="accordion__content"
                                    style={
                                        currentOpenItem == `${i},${index}` ? {maxHeight: `150px`} : {}
                                    }
                                >
                                    <div className="accordion__content__inner px-30 py-30">
                                        <div className="d-flex x-gap-10 y-gap-10 flex-wrap">
                                            <input
                                                type="text"
                                                className={"form-control"}
                                                placeholder={"Enter course URL here..."}
                                                style={{maxWidth: "70%", border: "1px solid #ccc"}}
                                                value={lesson.content}
                                                onChange={(e) => {
                                                    const updatedSections = sections.map((sec, idx) => {
                                                        if (idx === i) {
                                                            return {
                                                                ...sec,
                                                                lessons: sec.lessons?.map((les, lesIdx) => {
                                                                    if (lesIdx === index) {
                                                                        return {
                                                                            ...les,
                                                                            content: e.target.value
                                                                        };
                                                                    }
                                                                    return les;
                                                                })
                                                            };
                                                        }
                                                        return sec;
                                                    });

                                                    updateSections(updatedSections);
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        <button
                            className="button -sm py-15 -purple-3 text-purple-1 fw-500 mt-2 justify-end"
                            onClick={(e) => addLesson(e)}
                        >
                            Add Lesson +
                        </button>
                    </div>
                </div>
            </div>
        </>
    )
}