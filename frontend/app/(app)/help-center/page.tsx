import { Metadata } from "next";
import {
    Mail,
    Phone,
    MessageCircle,
    BookOpen,
    CreditCard,
    Shield,
    Clock,
} from "lucide-react";

export const metadata: Metadata = {
    title: "Help Center | EduPulse",
    description:
        "Get support and find answers to your questions about EduPulse",
};

const faqs = [
    {
        question: "How do I enroll in a course?",
        answer: "To enroll in a course, simply browse our course catalog, select a course you're interested in, and click the \"Enroll Now\" button. You'll be guided through the payment process, and once completed, you'll have immediate access to the course content.",
    },
    {
        question: "What payment methods do you accept?",
        answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various local payment methods depending on your region. All payments are processed securely through our payment partners.",
    },
    {
        question: "Can I get a refund if I'm not satisfied with a course?",
        answer: "Yes, we offer a 30-day money-back guarantee for all courses. If you're not satisfied with your purchase, you can request a refund within 30 days of your enrollment date.",
    },
    {
        question: "How do I access my course after purchase?",
        answer: 'After purchasing a course, you can access it immediately through your dashboard. Simply log in to your account, go to "My Courses," and click on the course you want to start learning.',
    },
    {
        question: "Do you offer certificates upon completion?",
        answer: "Yes, all our courses come with a certificate of completion that you can download and share on your LinkedIn profile or resume once you finish the course requirements.",
    },
    {
        question: "How can I become an instructor on EduPulse?",
        answer: 'We welcome experienced professionals to share their knowledge. Visit our "Become an Instructor" page to learn about the requirements and application process. You\'ll need to submit your credentials and course proposal for review.',
    },
];

const supportChannels = [
    {
        title: "Email Support",
        description: "Get in touch with our support team via email",
        icon: Mail,
        action: "support@edupulse.com",
        link: "mailto:support@edupulse.com",
    },
    {
        title: "Phone Support",
        description: "Speak directly with our support representatives",
        icon: Phone,
        action: "+1 (555) 123-4567",
        link: "tel:+15551234567",
    },
    {
        title: "Live Chat",
        description: "Chat with our support team in real-time",
        icon: MessageCircle,
        action: "Start Chat",
        link: "#",
    },
];

const resources = [
    {
        title: "Student Guide",
        description: "Learn how to make the most of your learning experience",
        icon: BookOpen,
        link: "#",
    },
    {
        title: "Payment Guide",
        description: "Understanding payment methods and refunds",
        icon: CreditCard,
        link: "#",
    },
    {
        title: "Trust & Safety",
        description: "Learn about our security measures and policies",
        icon: Shield,
        link: "#",
    },
    {
        title: "Course Completion",
        description:
            "Guidelines for completing courses and earning certificates",
        icon: Clock,
        link: "#",
    },
];

export default function HelpCenterPage() {
    return (
        <div className="min-vh-100 bg-light">
            <div className="container py-5">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <div className="text-center mb-5">
                            <h1 className="display-4 fw-bold mb-4 text-primary">
                                How can we help you?
                            </h1>
                            <p className="lead text-muted">
                                Find answers to common questions and get support
                                for your learning journey
                            </p>
                        </div>

                        {/* Support Channels */}
                        <div className="row g-4 mb-5">
                            {supportChannels.map((channel) => (
                                <div key={channel.title} className="col-md-4">
                                    <a
                                        href={channel.link}
                                        className="card h-100 text-decoration-none shadow-sm hover-shadow transition"
                                    >
                                        <div className="card-body text-center">
                                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-block mb-3">
                                                <channel.icon
                                                    className="text-primary"
                                                    size={24}
                                                />
                                            </div>
                                            <h3 className="h5 mb-3 text-dark">
                                                {channel.title}
                                            </h3>
                                            <p className="text-muted mb-3">
                                                {channel.description}
                                            </p>
                                            <span className="text-primary fw-medium">
                                                {channel.action}
                                            </span>
                                        </div>
                                    </a>
                                </div>
                            ))}
                        </div>

                        {/* Resources */}
                        <div className="mb-5">
                            <h2 className="h3 text-center mb-4">
                                Helpful Resources
                            </h2>
                            <div className="row g-4">
                                {resources.map((resource) => (
                                    <div
                                        key={resource.title}
                                        className="col-md-6 col-lg-3"
                                    >
                                        <a
                                            href={resource.link}
                                            className="card h-100 text-decoration-none shadow-sm hover-shadow transition"
                                        >
                                            <div className="card-body">
                                                <div className="bg-primary bg-opacity-10 p-2 rounded-3 w-fit mb-3">
                                                    <resource.icon
                                                        className="text-primary"
                                                        size={20}
                                                    />
                                                </div>
                                                <h3 className="h6 mb-2 text-dark">
                                                    {resource.title}
                                                </h3>
                                                <p className="small text-muted mb-0">
                                                    {resource.description}
                                                </p>
                                            </div>
                                        </a>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* FAQs */}
                        <div>
                            <h2 className="h3 text-center mb-4">
                                Frequently Asked Questions
                            </h2>
                            <div className="accordion" id="faqAccordion">
                                {faqs.map((faq, index) => (
                                    <div
                                        key={index}
                                        className="accordion-item border mb-3"
                                    >
                                        <h3 className="accordion-header">
                                            <button
                                                className="accordion-button collapsed"
                                                type="button"
                                                data-bs-toggle="collapse"
                                                data-bs-target={`#faq${index}`}
                                                aria-expanded="false"
                                                aria-controls={`faq${index}`}
                                            >
                                                {faq.question}
                                            </button>
                                        </h3>
                                        <div
                                            id={`faq${index}`}
                                            className="accordion-collapse collapse"
                                            data-bs-parent="#faqAccordion"
                                        >
                                            <div className="accordion-body">
                                                <p className="mb-0">
                                                    {faq.answer}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
