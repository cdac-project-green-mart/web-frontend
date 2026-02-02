import React from "react";

const PrivacyContent = () => {
    return (
        <div className="space-y-6">
            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Introduction</h3>
                <p>
                    At Ecobazar, we are committed to protecting your privacy. This Privacy Policy explains how we collect,
                    use, disclose, and safeguard your information when you visit our website or make a purchase.
                    Please read this policy carefully to understand our practices regarding your personal data.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Information We Collect</h3>
                <p>We may collect the following types of information:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong>Personal Information:</strong> Name, email address, phone number, shipping address, and billing information.</li>
                    <li><strong>Account Data:</strong> Username, password (encrypted), and account preferences.</li>
                    <li><strong>Transaction Data:</strong> Purchase history, payment details, and order information.</li>
                    <li><strong>Technical Data:</strong> IP address, browser type, device information, and cookies.</li>
                    <li><strong>Usage Data:</strong> Pages visited, time spent on site, and navigation patterns.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3. How We Use Your Information</h3>
                <p>We use your information to:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Process and fulfill your orders and transactions.</li>
                    <li>Communicate with you about orders, accounts, and promotions.</li>
                    <li>Improve our website, products, and customer service.</li>
                    <li>Personalize your shopping experience and recommendations.</li>
                    <li>Detect and prevent fraud and unauthorized activities.</li>
                    <li>Comply with legal obligations and enforce our terms.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">4. Information Sharing</h3>
                <p>
                    We do not sell your personal information to third parties. We may share your information with:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li><strong>Service Providers:</strong> Companies that help us with shipping, payments, and analytics.</li>
                    <li><strong>Vendors:</strong> Third-party sellers to fulfill your orders.</li>
                    <li><strong>Legal Authorities:</strong> When required by law or to protect our rights.</li>
                    <li><strong>Business Partners:</strong> With your consent for joint marketing initiatives.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">5. Cookies and Tracking</h3>
                <p>
                    We use cookies and similar tracking technologies to enhance your browsing experience.
                    You can control cookie preferences through your browser settings. Note that disabling cookies
                    may affect some features of our website.
                </p>
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-3">
                    <p className="text-sm text-green-800">
                        <strong>Cookie Types:</strong> Essential cookies (required for site function), Analytics cookies
                        (help us understand usage), and Marketing cookies (personalize ads and content).
                    </p>
                </div>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">6. Data Security</h3>
                <p>
                    We implement industry-standard security measures to protect your information, including:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>SSL encryption for all data transmissions.</li>
                    <li>Secure payment processing through trusted providers.</li>
                    <li>Regular security audits and vulnerability assessments.</li>
                    <li>Access controls and employee training on data protection.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">7. Your Rights</h3>
                <p>Depending on your location, you may have the right to:</p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Access and obtain a copy of your personal data.</li>
                    <li>Correct inaccurate or incomplete information.</li>
                    <li>Request deletion of your personal data.</li>
                    <li>Object to or restrict certain processing activities.</li>
                    <li>Withdraw consent where processing is based on consent.</li>
                    <li>Data portability to another service provider.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">8. Data Retention</h3>
                <p>
                    We retain your personal data only as long as necessary to fulfill the purposes for which it was collected,
                    including legal, accounting, or reporting requirements. When data is no longer needed, we securely delete
                    or anonymize it.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">9. Children's Privacy</h3>
                <p>
                    Our services are not intended for individuals under the age of 16. We do not knowingly collect
                    personal information from children. If we become aware that we have collected data from a child,
                    we will take steps to delete it promptly.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">10. Contact Us</h3>
                <p>
                    If you have questions about this Privacy Policy or wish to exercise your rights, please contact us:
                </p>
                <p className="mt-2">
                    <strong>Email:</strong> privacy@ecobazar.com<br />
                    <strong>Phone:</strong> (219) 555-0114<br />
                    <strong>Address:</strong> 123 Green Street, Eco City, EC 12345
                </p>
            </section>

            <p className="text-sm text-gray-500 pt-4 border-t">
                Last updated: February 2026
            </p>
        </div>
    );
};

export default PrivacyContent;
