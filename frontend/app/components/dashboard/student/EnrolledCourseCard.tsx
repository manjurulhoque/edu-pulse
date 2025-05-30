import { getCourseImagePath } from "@/app/utils/image-path";
import { Card, ProgressBar } from "react-bootstrap";

import { Col } from "react-bootstrap";
import Image from "next/image";
import Link from "next/link";
import { Course } from "@/app/models/course.interface";
import { useGetCourseProgressQuery } from "@/app/store/reducers/courses/api";

interface EnrolledCourseCardProps {
    course: Course;
}

const EnrolledCourseCard = ({ course }: EnrolledCourseCardProps) => {
    const { data: courseProgressResponse, isLoading: isCourseProgressLoading } = useGetCourseProgressQuery({ course_id: course.id });
    const courseProgress = courseProgressResponse?.data || 0;
    return (
        <Col md={4} key={course.id}>
            <Card className="h-100">
                <div className="position-relative" style={{ height: "200px" }}>
                    <Image src={getCourseImagePath(course)} alt={course.title} fill style={{ objectFit: "cover" }} />
                </div>
                <Card.Body>
                    <h6 className="card-title">{course.title}</h6>
                    <p className="text-muted small mb-2">Instructor: {course.user.name}</p>
                    <div className="mb-2">
                        <small className="text-muted">Progress</small>
                        <ProgressBar now={parseInt(courseProgress.toString())} label={`${parseInt(courseProgress.toString())}%`} variant="success" />
                    </div>
                    {/* <small className="text-muted">Last accessed: {course.lastAccessed}</small> */}
                </Card.Body>
                <Card.Footer className="bg-white">
                    <Link href={`/courses/${course.slug}/learn`} className="btn btn-primary text-white btn-sm w-100">
                        Continue Learning
                    </Link>
                </Card.Footer>
            </Card>
        </Col>
    );
};

export default EnrolledCourseCard;
