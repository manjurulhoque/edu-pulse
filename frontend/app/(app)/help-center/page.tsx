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
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
            <div className="container mx-auto px-4 py-16">
                <div className="max-w-5xl mx-auto">
                    <div className="text-center mb-16">
                        <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-blue-700 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                            How can we help you?
                        </h1>
                        <p className="text-gray-600 text-xl max-w-2xl mx-auto">
                            Find answers to common questions and get support for
                            your learning journey
                        </p>
                    </div>

                    {/* Support Channels */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                        {supportChannels.map((channel) => (
                            <a
                                key={channel.title}
                                href={channel.link}
                                className="group relative p-8 bg-white rounded-2xl border border-gray-100 hover:border-blue-200 hover:shadow-xl transition-all duration-300 overflow-hidden"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                <div className="relative flex flex-col items-center text-center">
                                    <div className="p-4 bg-blue-50 rounded-xl mb-4 group-hover:bg-blue-100 transition-colors">
                                        <channel.icon className="w-8 h-8 text-blue-600" />
                                    </div>
                                    <h3 className="text-xl font-semibold mb-2 text-gray-900">
                                        {channel.title}
                                    </h3>
                                    <p className="text-gray-600 mb-4">
                                        {channel.description}
                                    </p>
                                    <span className="text-blue-600 font-medium group-hover:text-blue-700">
                                        {channel.action}
                                    </span>
                                </div>
                            </a>
                        ))}
                    </div>

                    {/* Resources */}
                    <div className="mb-20">
                        <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center">
                            Helpful Resources
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {resources.map((resource) => (
                                <a
                                    key={resource.title}
                                    href={resource.link}
                                    className="group p-6 bg-white rounded-xl border border-gray-100 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg w-fit mb-4 group-hover:from-blue-100 group-hover:to-indigo-100 transition-colors">
                                        <resource.icon className="w-6 h-6 text-blue-600" />
                                    </div>
                                    <h3 className="text-lg font-semibold mb-2 text-gray-900">
                                        {resource.title}
                                    </h3>
                                    <p className="text-sm text-gray-600">
                                        {resource.description}
                                    </p>
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* FAQs */}
                    <div>
                        <h2 className="text-3xl font-bold mb-10 text-gray-900 text-center">
                            Frequently Asked Questions
                        </h2>
                        <div className="space-y-6">
                            {faqs.map((faq, index) => (
                                <div
                                    key={index}
                                    className="bg-white rounded-xl border border-gray-100 p-8 hover:border-blue-200 hover:shadow-lg transition-all duration-300"
                                >
                                    <h3 className="text-xl font-semibold mb-4 text-gray-900">
                                        {faq.question}
                                    </h3>
                                    <p className="text-gray-600 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
