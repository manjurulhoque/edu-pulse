"use client";

import { User } from "@/app/models/user.interface";
import { getUserImagePath } from "@/app/utils/image-path";
import Image from "next/image";
import { Facebook, Linkedin, Youtube } from "lucide-react";

interface StudentProfileProps {
    user: User;
}

const StudentProfile = ({ user }: StudentProfileProps) => {
    return (
        <div className="container py-5" style={{ marginTop: "100px" }}>
            {/* Header */}
            <div
                className="row align-items-center mb-4"
                style={{
                    backgroundColor: "#f2efff",
                    borderRadius: 24,
                    padding: 24,
                }}
            >
                <div className="col-md-8">
                    <div className="text-uppercase fw-bold text-secondary mb-1" style={{ fontSize: "0.95rem" }}>
                        Learner
                    </div>
                    <h1 className="fw-bold mb-1" style={{ fontSize: "2.5rem" }}>
                        {user.name}
                    </h1>
                    <div className="fw-semibold mb-2" style={{ fontSize: "1.1rem" }}>
                        {user.bio}
                    </div>
                </div>
                <div className="col-md-4 d-flex justify-content-md-end justify-content-center mt-3 mt-md-0">
                    <div
                        className="bg-white text-center shadow-sm"
                        style={{
                            borderRadius: 24,
                            minWidth: 320,
                            padding: "40px 32px 32px 32px",
                            boxShadow: "0 4px 24px 0 rgba(80, 80, 80, 0.08)",
                            border: "none",
                        }}
                    >
                        <Image
                            src={getUserImagePath(user)}
                            alt="Profile"
                            width={120}
                            height={120}
                            className="rounded-circle mx-auto mb-4"
                            style={{ objectFit: "cover", border: "2px solid #e5e5f7" }}
                        />
                        <div className="d-flex justify-content-center gap-4 mb-2">
                            <a
                                href="#"
                                style={{
                                    border: "2px solid #7c3aed",
                                    borderRadius: 12,
                                    width: 48,
                                    height: 48,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#7c3aed",
                                    background: "#fff",
                                    transition: "background 0.2s, color 0.2s",
                                    fontSize: 24,
                                }}
                                className="me-2"
                            >
                                <Facebook size={24} stroke="#7c3aed" />
                            </a>
                            <a
                                href="#"
                                style={{
                                    border: "2px solid #7c3aed",
                                    borderRadius: 12,
                                    width: 48,
                                    height: 48,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#7c3aed",
                                    background: "#fff",
                                    transition: "background 0.2s, color 0.2s",
                                    fontSize: 24,
                                }}
                                className="me-2"
                            >
                                <Linkedin size={24} stroke="#7c3aed" />
                            </a>
                            <a
                                href="#"
                                style={{
                                    border: "2px solid #7c3aed",
                                    borderRadius: 12,
                                    width: 48,
                                    height: 48,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    color: "#7c3aed",
                                    background: "#fff",
                                    transition: "background 0.2s, color 0.2s",
                                    fontSize: 24,
                                }}
                            >
                                <Youtube size={24} stroke="#7c3aed" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudentProfile;
