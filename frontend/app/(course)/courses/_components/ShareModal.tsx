"use client";

import { useRef, useState } from "react";
import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { Facebook, Mail, X, Copy, Share2 } from "lucide-react";

interface ShareModalProps {
    show: boolean;
    onHide: () => void;
    shareUrl: string;
}

export default function ShareModal({ show, onHide, shareUrl }: ShareModalProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (inputRef.current) {
            inputRef.current.select();
            document.execCommand("copy");
            setCopied(true);
            setTimeout(() => setCopied(false), 1500);
        }
    };

    const handleSocialClick = (type: "facebook" | "x" | "email") => {
        let url = "";
        if (type === "facebook") {
            url = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`;
        } else if (type === "x") {
            url = `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`;
        } else if (type === "email") {
            url = `mailto:?subject=Check%20out%20this%20course&body=${encodeURIComponent(shareUrl)}`;
        }
        window.open(url, "_blank");
    };

    return (
        <Modal show={show} onHide={onHide} centered>
            <Modal.Header closeButton>
                <Modal.Title>Share this course</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <InputGroup className="mb-3">
                    <FormControl
                        ref={inputRef}
                        value={shareUrl}
                        readOnly
                        aria-label="Share URL"
                        style={{ fontSize: "1rem" }}
                        onFocus={(e) => e.target.select()}
                    />
                    <Button variant="outline-primary" onClick={handleCopy} style={{ minWidth: 70 }}>
                        {copied ? "Copied!" : "Copy"}
                    </Button>
                </InputGroup>
                <div className="d-flex justify-content-center gap-4 mt-4">
                    <Button
                        variant="outline-light"
                        style={{
                            border: "2px solid #a78bfa",
                            color: "#a78bfa",
                            borderRadius: "50%",
                            width: 48,
                            height: 48,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={() => handleSocialClick("facebook")}
                    >
                        <Facebook size={24} />
                    </Button>
                    <Button
                        variant="outline-light"
                        style={{
                            border: "2px solid #a78bfa",
                            color: "#a78bfa",
                            borderRadius: "50%",
                            width: 48,
                            height: 48,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={() => handleSocialClick("x")}
                    >
                        <X size={24} />
                    </Button>
                    <Button
                        variant="outline-light"
                        style={{
                            border: "2px solid #a78bfa",
                            color: "#a78bfa",
                            borderRadius: "50%",
                            width: 48,
                            height: 48,
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                        onClick={() => handleSocialClick("email")}
                    >
                        <Mail size={24} />
                    </Button>
                </div>
            </Modal.Body>
        </Modal>
    );
}
