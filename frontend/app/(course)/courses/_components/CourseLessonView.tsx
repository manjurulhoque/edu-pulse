"use client";

import { Lesson } from "@/app/models/lesson.interface";
import { Card, Container, Row, Col } from "react-bootstrap";
import styles from "./CourseLessonView.module.css";
import ReactPlayer from 'react-player';

interface CourseLessonViewProps {
    lesson: Lesson;
}

const CourseLessonView = ({ lesson }: CourseLessonViewProps) => {
    return (
        <Container fluid className={styles.container}>
            <Row>
                <Col className={styles.content}>
                    <Card className={styles.videoCard}>
                        <div className={styles.videoWrapper}>
                            <ReactPlayer
                                className={styles.videoPlayer}
                                controls={true}
                                url={lesson.content}
                            />
                        </div>
                    </Card>
                    <Card className={styles.lessonInfo}>
                        <Card.Body>
                            <h2 className={styles.title}>{lesson.title}</h2>
                            <p className={styles.description}>{lesson.title}</p>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default CourseLessonView;
