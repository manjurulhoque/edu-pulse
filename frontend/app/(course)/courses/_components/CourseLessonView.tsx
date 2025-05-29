"use client";

import { Lesson } from "@/app/models/lesson.interface";
import ReactPlayer from "react-player";
import { useState, useEffect } from "react";
import { Nav, Tab, Dropdown } from "react-bootstrap";
import {
    FileText,
    MessageSquare,
    Link as LinkIcon,
    MoreVertical,
    Download,
    Bookmark,
    Share2,
    Flag,
    ArrowLeft,
} from "lucide-react";
import styles from "./CourseLessonView.module.css";
import ShareModal from "./ShareModal";

interface CourseLessonViewProps {
    lesson: Lesson;
}

const getShareUrl = () => {
    if (typeof window !== "undefined") {
        return window.location.href;
    }
    return "";
};

const CourseLessonView = ({ lesson }: CourseLessonViewProps) => {
    const [isMounted, setIsMounted] = useState(false);
    const [key, setKey] = useState("overview");
    const [showShare, setShowShare] = useState(false);
    const [shareUrl, setShareUrl] = useState("");

    useEffect(() => {
        setIsMounted(true);
        if (typeof window !== "undefined") {
            setShareUrl(window.location.href);
        }
    }, []);

    if (!isMounted) {
        return null;
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <h4 className={styles.title}>{lesson.title}</h4>
                <div className={styles.headerActions}>
                    <button className={`${styles.actionButton} ${styles.primary}`}>
                        <ArrowLeft size={18} />
                        Back to Course
                    </button>
                    <button className={styles.actionButton} onClick={() => setShowShare(true)}>
                        <Share2 size={20} />
                        Share
                    </button>
                    <Dropdown>
                        <Dropdown.Toggle as="div" className={styles.actionButton}>
                            <MoreVertical size={20} />
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropdownMenu}>
                            <Dropdown.Item className={styles.dropdownItem}>
                                <Download size={16} />
                                Download Resources
                            </Dropdown.Item>
                            <Dropdown.Item className={styles.dropdownItem}>
                                <Bookmark size={16} />
                                Bookmark Lesson
                            </Dropdown.Item>
                            <Dropdown.Item className={styles.dropdownItem}>
                                <Share2 size={16} />
                                Share Lesson
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item className={styles.dropdownItem}>
                                <Flag size={16} />
                                Report Issue
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <ShareModal show={showShare} onHide={() => setShowShare(false)} shareUrl={shareUrl} />

            <div className={styles.videoContainer}>
                <div className="ratio ratio-16x9">
                    <ReactPlayer
                        controls={true}
                        url={lesson.content}
                        width="100%"
                        height="100%"
                        style={{ position: "absolute", top: 0, left: 0 }}
                    />
                </div>
            </div>

            <div className={styles.contentCard}>
                <Tab.Container activeKey={key} onSelect={(k) => setKey(k || "overview")}>
                    <Nav variant="tabs" className="border-0">
                        <Nav.Item>
                            <Nav.Link eventKey="overview" className="d-flex align-items-center gap-2">
                                <FileText size={18} />
                                Overview
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="qa" className="d-flex align-items-center gap-2">
                                <MessageSquare size={18} />
                                Q&A
                            </Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link eventKey="resources" className="d-flex align-items-center gap-2">
                                <LinkIcon size={18} />
                                Resources
                            </Nav.Link>
                        </Nav.Item>
                    </Nav>

                    <Tab.Content className={styles.tabContent}>
                        <Tab.Pane eventKey="overview">
                            <p className="text-secondary">{lesson.description || lesson.content}</p>
                        </Tab.Pane>
                        <Tab.Pane eventKey="qa">
                            <div className="text-center text-muted py-5">
                                <h5>No questions yet</h5>
                                <p>Be the first to ask a question about this lesson</p>
                            </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="resources">
                            {lesson.resources && lesson.resources.length > 0 ? (
                                <ul className="list-group">
                                    {lesson.resources.map((resource, index) => (
                                        <li key={index} className="list-group-item">
                                            <a
                                                href={resource}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="d-flex align-items-center gap-2"
                                            >
                                                <LinkIcon size={18} />
                                                Resource {index + 1}
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            ) : (
                                <div className="text-center text-muted py-5">
                                    <h5>No resources available</h5>
                                    <p>Check back later for additional materials</p>
                                </div>
                            )}
                        </Tab.Pane>
                    </Tab.Content>
                </Tab.Container>
            </div>
        </div>
    );
};

export default CourseLessonView;
