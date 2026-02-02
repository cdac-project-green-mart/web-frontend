export default function VendorFooter() {
    return (
        <footer className="bg-gray-200 border-t border-gray-200 px-6 py-3">
            <div className="flex items-center justify-between text-sm text-gray-600">
                {/* Left side links */}
                <div className="flex items-center gap-1">
                    <a href="#" className="hover:text-gray-800 hover:underline">Help</a>
                    <span>•</span>
                    <a href="#" className="hover:text-gray-800 hover:underline">Terms</a>
                    <span>•</span>
                    <a href="#" className="hover:text-gray-800 hover:underline">Privacy</a>
                    <span>•</span>
                    <a href="#" className="hover:text-gray-800 hover:underline">Contact</a>
                </div>

                {/* Right side copyright */}
                <div>
                    © 2025 VendorPortal
                </div>
            </div>
        </footer>
    )
}
