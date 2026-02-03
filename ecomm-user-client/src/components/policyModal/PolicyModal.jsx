import React, { useEffect } from "react";

const PolicyModal = ({ isOpen, onClose, title, children }) => {
    // Close modal on Escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            document.addEventListener("keydown", handleEscape);
            document.body.style.overflow = "hidden";
        }
        return () => {
            document.removeEventListener("keydown", handleEscape);
            document.body.style.overflow = "auto";
        };
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm transition-all duration-300"
            onClick={onClose}
        >
            <div
                className="relative bg-white rounded-2xl shadow-2xl w-[90%] max-w-2xl max-h-[85vh] overflow-hidden animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
            >
                {/* Header */}
                <div className="sticky top-0 z-10 bg-gradient-to-r from-green-600 to-green-500 px-6 py-4 flex items-center justify-between">
                    <h2 className="text-xl font-bold text-white">{title}</h2>
                    <button
                        onClick={onClose}
                        className="w-8 h-8 flex items-center justify-center rounded-full bg-white/20 hover:bg-white/30 transition-colors text-white text-xl"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {/* Scrollable Content */}
                <div className="px-6 py-5 overflow-y-auto max-h-[calc(85vh-120px)] text-gray-700 leading-relaxed">
                    {children}
                </div>

                {/* Footer */}
                <div className="sticky bottom-0 bg-gray-50 border-t px-6 py-4 flex justify-end">
                    <button
                        onClick={onClose}
                        className="px-6 py-2.5 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors shadow-md hover:shadow-lg"
                    >
                        I Understand
                    </button>
                </div>
            </div>
        </div>
    );
};

export default PolicyModal;
