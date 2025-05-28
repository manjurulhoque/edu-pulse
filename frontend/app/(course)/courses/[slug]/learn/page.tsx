import { getLastAccessedLesson } from "@/app/actions/lessonInfo";

import { permanentRedirect } from "next/navigation";

const LessonPage = async ({ params }: { params: { slug: string } }) => {
    const lastAccessedLesson = await getLastAccessedLesson(params.slug);
    if (lastAccessedLesson && lastAccessedLesson?.data) {
        permanentRedirect(`/courses/${params.slug}/learn/lesson/${lastAccessedLesson.data.id}`);
    } else {
        permanentRedirect(`/student/dashboard/my-courses`);
    }
};

export default LessonPage;
