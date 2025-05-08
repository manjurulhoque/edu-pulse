"use client";

import React from "react";

const NotFound: React.FC = () => {
    return (
        <div id="root">
            <div className="container">
                <div className="grid-background">
                    <div className="grid"></div>
                    <div className="overlay"></div>
                </div>

                <div className="content">
                    <div className="error-section">
                        <div className="error-text">404</div>
                    </div>

                    <div className="text-section">
                        <div>
                            <p className="message">The page you're looking for has wandered off, but don't worry!</p>
                            <p className="message">Let's get you back on track.</p>
                        </div>

                        <a href="/" className="home-button text-white">
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                                <polyline points="9 22 9 12 15 12 15 22"></polyline>
                            </svg>
                            TAKE ME HOME
                        </a>
                    </div>
                </div>
            </div>

            <style jsx>{`
                body,
                html {
                    margin: 0;
                    padding: 0;
                    height: 100%;
                    width: 100%;
                    font-family: "Courier New", monospace;
                    background-color: white;
                    color: #222222;
                    overflow: hidden;
                }

                .container {
                    position: relative;
                    width: 100%;
                    height: 100vh;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    overflow: hidden;
                }

                .grid-background {
                    position: absolute;
                    inset: 0;
                    overflow: hidden;
                    z-index: 0;
                }

                .grid {
                    height: 100%;
                    width: 100%;
                    background-image: linear-gradient(to right, rgba(200, 200, 200, 0.2) 1px, transparent 1px),
                        linear-gradient(to bottom, rgba(200, 200, 200, 0.2) 1px, transparent 1px);
                    background-size: 60px 60px;
                    transform: perspective(500px) rotateX(60deg) scale(2, 2);
                    transform-origin: center center;
                }

                .overlay {
                    position: absolute;
                    inset: 0;
                    background-color: rgba(255, 255, 255, 0.6);
                }

                .content {
                    position: relative;
                    z-index: 10;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    gap: 32px;
                    padding: 0 16px;
                    max-width: 1200px;
                    margin: 0 auto;
                }

                @media (min-width: 768px) {
                    .content {
                        flex-direction: row;
                    }
                }

                .error-section {
                    width: 100%;
                    display: flex;
                    justify-content: center;
                }

                @media (min-width: 768px) {
                    .error-section {
                        width: 50%;
                    }
                }

                .text-section {
                    width: 100%;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 16px;
                    text-align: center;
                }

                @media (min-width: 768px) {
                    .text-section {
                        width: 50%;
                        align-items: flex-start;
                        text-align: left;
                    }
                }

                .error-text {
                    font-size: 144px;
                    font-weight: bold;
                    text-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
                    animation: pulse 4s ease-in-out infinite;
                    color: #333333;
                }

                .message {
                    font-size: 18px;
                    line-height: 1.5;
                    color: #555555;
                }

                @media (min-width: 768px) {
                    .message {
                        font-size: 20px;
                    }
                }

                .home-button {
                    margin-top: 16px;
                    padding: 12px 24px;
                    font-family: "Courier New", monospace;
                    display: inline-flex;
                    gap: 8px;
                    align-items: center;
                    font-size: 16px;
                    background-color: #333333;
                    color: white;
                    border: none;
                    border-radius: 4px;
                    cursor: pointer;
                    transition: background-color 0.3s;
                    text-decoration: none;
                }

                .home-button:hover {
                    background-color: #555555;
                }

                @keyframes pulse {
                    0%,
                    100% {
                        opacity: 1;
                    }
                    50% {
                        opacity: 0.7;
                    }
                }
            `}</style>
        </div>
    );
};

export default NotFound;
