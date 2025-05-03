export const getCourseImagePath = (course: Course) => {
    return `${process.env.BACKEND_DOCKER_BASE_URL}/${course.preview_image}`;
};

export const getCourseAuthorImagePath = (course: Course) => {
    return `${process.env.BACKEND_DOCKER_BASE_URL}/${course.user.avatar}`;
};
