import React from "react";

const TermsContent = () => {
    return (
        <div className="space-y-6">
            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">1. Introduction</h3>
                <p>
                    Welcome to Ecobazar. These Terms and Conditions govern your use of our website and services.
                    By accessing or using our platform, you agree to be bound by these terms. If you do not agree
                    with any part of these terms, please do not use our services.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">2. Definitions</h3>
                <ul className="list-disc pl-5 space-y-1">
                    <li><strong>"Ecobazar"</strong> refers to our e-commerce platform and all related services.</li>
                    <li><strong>"User"</strong> refers to any individual accessing or using our platform.</li>
                    <li><strong>"Products"</strong> refers to all items available for purchase on our platform.</li>
                    <li><strong>"Vendor"</strong> refers to third-party sellers offering products through our platform.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">3. Account Registration</h3>
                <p>
                    To access certain features of our platform, you may need to create an account. You agree to:
                </p>
                <ul className="list-disc pl-5 space-y-1 mt-2">
                    <li>Provide accurate and complete information during registration.</li>
                    <li>Maintain the security and confidentiality of your account credentials.</li>
                    <li>Notify us immediately of any unauthorized access to your account.</li>
                    <li>Accept responsibility for all activities that occur under your account.</li>
                </ul>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">4. Orders and Payments</h3>
                <p>
                    When placing an order, you agree to provide accurate billing and shipping information.
                    All prices are displayed in the local currency and include applicable taxes unless otherwise stated.
                    We reserve the right to refuse or cancel orders for any reason, including product availability or pricing errors.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">5. Shipping and Delivery</h3>
                <p>
                    Delivery times are estimates and may vary based on location and product availability.
                    We are not responsible for delays caused by shipping carriers, customs, or circumstances beyond our control.
                    Risk of loss transfers to you upon delivery of the products.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">6. Returns and Refunds</h3>
                <p>
                    We accept returns within 30 days of delivery for most products in their original condition.
                    Certain items such as perishables, personalized products, and intimate goods may not be eligible for return.
                    Refunds will be processed within 7-10 business days after we receive and inspect the returned item.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">7. Intellectual Property</h3>
                <p>
                    All content on our platform, including logos, images, text, and software, is the property of Ecobazar
                    or its licensors and is protected by intellectual property laws. You may not reproduce, distribute,
                    or create derivative works without our express written consent.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">8. Limitation of Liability</h3>
                <p>
                    To the maximum extent permitted by law, Ecobazar shall not be liable for any indirect, incidental,
                    special, or consequential damages arising from your use of our platform or products purchased through it.
                    Our total liability shall not exceed the amount you paid for the relevant product or service.
                </p>
            </section>

            <section>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">9. Contact Information</h3>
                <p>
                    If you have any questions about these Terms and Conditions, please contact us at:
                </p>
                <p className="mt-2">
                    <strong>Email:</strong> legal@ecobazar.com<br />
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

export default TermsContent;
