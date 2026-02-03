import React, { useState } from "react";
import { Link } from "react-router-dom";
// import envelope from "../assets/email.png"; 
// import phone from "../assets/phone-call.png";

export default function HelpPage() {
    const [activeFaq, setActiveFaq] = useState(null);

    const toggleFaq = (index) => {
        setActiveFaq(activeFaq === index ? null : index);
    };

    const faqs = [
        {
            question: "How can I return a product?",
            answer: "You can request a return from the 'My Orders' page -> View Details -> Return/Replace.",
        },
        {
            question: "When will I receive my refund?",
            answer: "Refunds are processed within 3-5 business days after your returned product passes inspection.",
        },
        {
            question: "How do I track my order?",
            answer: "Visit 'My Orders' and click on 'Track Order' to view shipment status.",
        },
        {
            question: "What if I received a damaged item?",
            answer: "Please use the Return/Replace option and upload photos of the damaged product for faster resolution.",
        },
        {
            question: "How do I contact customer support?",
            answer: "Use the form below or email us at support@greenmart.com.",
        },
    ];

    return (
        <div className="w-full bg-white font-[poppins] text-gray-800">

            {/* Breadcrumb area - generic placeholder style matching app */}
            <div className="bg-gray-50 py-4 px-6 md:px-24 mb-8">
                <p className="text-gray-500 text-sm">
                    <Link to="/" className="hover:text-green-600">Home</Link> &gt; <span className="text-black">Help & Support</span>
                </p>
            </div>

            <div className="max-w-6xl mx-auto px-6 mb-20">

                {/* HEADER & SEARCH */}
                <div className="mb-12">
                    <h1 className="text-3xl font-bold mb-4 text-green-700">? Help & Support</h1>
                    <p className="text-gray-500 mb-8">We're here to help! Browse FAQs or contact our support team.</p>

                    <div className="flex gap-4 max-w-2xl">
                        <input
                            type="text"
                            placeholder="Search help topics (e.g., Refunds, Orders, Delivery)..."
                            className="flex-1 border p-3 rounded-md focus:outline-none focus:border-green-500 bg-gray-50"
                        />
                        <button className="bg-green-700 text-white px-8 py-3 rounded-md font-medium hover:bg-green-800 transition">
                            Search
                        </button>
                    </div>
                </div>

                {/* FAQs */}
                <div className="border border-blue-200 rounded-lg p-8 mb-12 shadow-sm">
                    <h2 className="text-lg font-semibold text-green-800 mb-6 flex items-center gap-2">
                        📚 Frequently Asked Questions
                    </h2>

                    <div className="space-y-4">
                        {faqs.map((faq, index) => (
                            <div key={index} className="">
                                <button
                                    onClick={() => toggleFaq(index)}
                                    className="flex items-center gap-2 font-medium text-gray-700 hover:text-green-700 w-full text-left"
                                >
                                    <span className="text-gray-400">📄</span>
                                    {faq.question}
                                </button>
                                <div
                                    className={`grid transition-[grid-template-rows] duration-300 ease-in-out ${activeFaq === index ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        }`}
                                >
                                    <div className="overflow-hidden">
                                        <div className="ml-7 mt-2 text-sm text-gray-500 leading-relaxed bg-gray-50 p-3 rounded">
                                            {faq.answer}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CONTACT FORM */}
                <div className="border border-gray-200 rounded-lg p-8 mb-12 shadow-sm">
                    <h2 className="text-lg font-semibold text-green-800 mb-6 flex items-center gap-2">
                        📬 Contact Our Support Team
                    </h2>
                    <p className="text-sm text-gray-500 mb-6">Please fill in your details and describe your issue.</p>

                    <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-400 uppercase">Full Name</label>
                            <input type="text" className="w-full border p-3 rounded focus:outline-none focus:border-green-500" />
                        </div>

                        <div className="space-y-1">
                            <label className="text-xs font-medium text-gray-400 uppercase">Email Address</label>
                            <input type="email" className="w-full border p-3 rounded focus:outline-none focus:border-green-500" />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-medium text-gray-400 uppercase">Order ID (Optional)</label>
                            <input type="text" className="w-full border p-3 rounded focus:outline-none focus:border-green-500" />
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-medium text-gray-400 uppercase">Select Issue Type</label>
                            <select className="w-full border p-3 rounded focus:outline-none focus:border-green-500 bg-white">
                                <option>Select an issue...</option>
                                <option>Where is my order?</option>
                                <option>Product Damaged/Incorrect</option>
                                <option>Refund/Return Request</option>
                                <option>Payment Issue</option>
                                <option>Other</option>
                            </select>
                        </div>

                        <div className="space-y-1 md:col-span-2">
                            <label className="text-xs font-medium text-gray-400 uppercase">Message</label>
                            <textarea
                                rows="5"
                                placeholder="Describe your issue..."
                                className="w-full border p-3 rounded focus:outline-none focus:border-green-500"
                            ></textarea>
                        </div>

                        <div className="md:col-span-2">
                            <button className="bg-green-700 text-white px-8 py-3 rounded font-medium hover:bg-green-800 transition">
                                Submit Request
                            </button>
                        </div>
                    </form>
                </div>

                {/* OTHER WAYS TO REACH US */}
                <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
                    <h3 className="text-md font-semibold mb-4 text-green-800">💬 Other Ways to Reach Us</h3>
                    <div className="space-y-3 text-sm text-gray-600">
                        <div className="flex items-center gap-3">
                            <span className="bg-white p-1 rounded shadow-sm text-xs border">✉️</span>
                            <span>Email: support@greenmart.com</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-white p-1 rounded shadow-sm text-xs border">📞</span>
                            <span>Customer Care: +91-99999-88888</span>
                        </div>
                        <div className="flex items-center gap-3">
                            <span className="bg-white p-1 rounded shadow-sm text-xs border">🕒</span>
                            <span>Support Hours: Mon-Sat, 9 AM – 7 PM</span>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    );
}
