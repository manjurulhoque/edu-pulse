import { Metadata } from "next";
import { Scroll, Shield, FileText, AlertCircle } from "lucide-react";

export const metadata: Metadata = {
    title: "Terms of Service | EduPulse",
    description: "Terms and conditions for using EduPulse platform",
};

const sections = [
    {
        title: "1. Acceptance of Terms",
        content: `By accessing and using EduPulse, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform. These terms constitute a legally binding agreement between you and EduPulse.`,
    },
    {
        title: "2. User Accounts",
        content: `To access certain features of the platform, you must create an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You must be at least 13 years old to create an account.`,
    },
    {
        title: "3. Course Content",
        content: `All course content provided on EduPulse is for educational purposes only. While we strive to ensure the accuracy of our content, we make no guarantees about the completeness, reliability, or accuracy of this information. Users are responsible for verifying any information before relying on it.`,
    },
    {
        title: "4. Payment Terms",
        content: `Course fees are clearly displayed before purchase. All payments are processed securely through our payment partners. Refunds are available within 30 days of purchase if you're not satisfied with your course. Some courses may be eligible for installment payments.`,
    },
    {
        title: "5. Intellectual Property",
        content: `All content on EduPulse, including but not limited to text, graphics, logos, and software, is the property of EduPulse or its content creators and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without explicit permission.`,
    },
    {
        title: "6. User Conduct",
        content: `Users must not engage in any activity that disrupts or interferes with the proper functioning of the platform. This includes but is not limited to: unauthorized access, distribution of malware, harassment of other users, or violation of intellectual property rights.`,
    },
    {
        title: "7. Privacy Policy",
        content: `Your privacy is important to us. Our Privacy Policy explains how we collect, use, and protect your personal information. By using EduPulse, you agree to our Privacy Policy. We may update our privacy practices from time to time, and we will notify you of any material changes.`,
    },
    {
        title: "8. Termination",
        content: `We reserve the right to terminate or suspend access to our platform for violations of these terms or for any other reason at our sole discretion. Upon termination, your right to use the platform will immediately cease.`,
    },
    {
        title: "9. Disclaimer of Warranties",
        content: `EduPulse is provided "as is" without any warranties, expressed or implied. We do not guarantee that the platform will be uninterrupted, secure, or error-free. We are not responsible for any loss or damage resulting from your use of our platform.`,
    },
    {
        title: "10. Limitation of Liability",
        content: `To the maximum extent permitted by law, EduPulse shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your use or inability to use the platform.`,
    },
];

const importantNotes = [
    {
        icon: Scroll,
        title: "Last Updated",
        content: "These terms were last updated on March 15, 2024",
    },
    {
        icon: Shield,
        title: "Legal Compliance",
        content:
            "Our terms comply with international data protection regulations",
    },
    {
        icon: FileText,
        title: "Documentation",
        content: "Keep a copy of these terms for your records",
    },
    {
        icon: AlertCircle,
        title: "Changes",
        content:
            "We may update these terms periodically. Continued use of the platform constitutes acceptance of any changes.",
    },
];

export default function TermsPage() {
    return (
        <div className="min-vh-100 bg-light">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="text-center mb-5">
                            <h1 className="display-4 fw-bold mb-4 text-primary">
                                Terms of Service
                            </h1>
                            <p className="lead text-muted">
                                Please read these terms carefully before using
                                EduPulse
                            </p>
                        </div>

                        {/* Important Notes */}
                        <div className="row g-4 mb-5">
                            {importantNotes.map((note) => (
                                <div
                                    key={note.title}
                                    className="col-md-6 col-lg-3"
                                >
                                    <div className="card h-100 shadow-sm">
                                        <div className="card-body">
                                            <div className="d-flex align-items-center mb-3">
                                                <div className="bg-primary bg-opacity-10 p-2 rounded-3 me-3">
                                                    <note.icon
                                                        className="text-primary"
                                                        size={24}
                                                    />
                                                </div>
                                                <h3 className="h5 mb-0">
                                                    {note.title}
                                                </h3>
                                            </div>
                                            <p className="card-text small text-muted mb-0">
                                                {note.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Terms Sections */}
                        <div className="accordion" id="termsAccordion">
                            {sections.map((section, index) => (
                                <div
                                    key={section.title}
                                    className="accordion-item border mb-3"
                                >
                                    <h2 className="accordion-header">
                                        <button
                                            className="accordion-button collapsed"
                                            type="button"
                                            data-bs-toggle="collapse"
                                            data-bs-target={`#collapse${index}`}
                                            aria-expanded="false"
                                            aria-controls={`collapse${index}`}
                                        >
                                            {section.title}
                                        </button>
                                    </h2>
                                    <div
                                        id={`collapse${index}`}
                                        className="accordion-collapse collapse"
                                        data-bs-parent="#termsAccordion"
                                    >
                                        <div className="accordion-body">
                                            <p className="mb-0">
                                                {section.content}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Contact Information */}
                        <div className="text-center mt-5">
                            <p className="text-muted">
                                If you have any questions about these Terms of
                                Service, please contact us at{" "}
                                <a
                                    href="mailto:legal@edupulse.com"
                                    className="text-primary text-decoration-none"
                                >
                                    legal@edupulse.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
