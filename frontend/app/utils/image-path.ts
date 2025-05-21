import { Course } from "../models/course.interface";
import { User } from "../models/user.interface";

export const getCourseImagePath = (course: Course) => {
    return `${process.env.BACKEND_DOCKER_BASE_URL}/${course.preview_image}`;
};

export const getCourseAuthorImagePath = (course: Course) => {
    if (!course.user.avatar) {
        return "/assets/img/avatars/anonymous_user.webp";
    }
    return `${process.env.BACKEND_DOCKER_BASE_URL}/${course.user.avatar}`;
};

export const getUserImagePath = (user: User) => {
    if (!user.avatar) {
        return "/assets/img/avatars/anonymous_user.webp";
    }
    return `${process.env.BACKEND_DOCKER_BASE_URL}/${user.avatar}`;
};
