import Link from "next/link";
import StriveIcon from "../icons/icon";

export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-12 px-6 lg:px-24 xl:px-48">
            <div className="max-w-6xl mx-auto">
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
                    <div className="lg:col-span-1">
                        <Link href="/" className="flex items-center mb-4">
                            <StriveIcon className="h-8 w-16 stroke-2 text-white" />
                        </Link>
                        <p className="text-gray-400 mb-4">
                            Empowering your journey to success through innovative learning experiences.
                        </p>
                        <div className="flex space-x-4">
                            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                <span className="text-xl">📘</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                <span className="text-xl">🐦</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                <span className="text-xl">💼</span>
                            </a>
                            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                <span className="text-xl">📸</span>
                            </a>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link href="#about" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    About Us
                                </Link>
                            </li>
                            <li>
                                <Link href="#pricing" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    Pricing
                                </Link>
                            </li>
                            <li>
                                <Link href="#contact" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    Contact
                                </Link>
                            </li>
                            <li>
                                <Link href="/login" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    Login
                                </Link>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Support</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    FAQ
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    Community
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    Contact Support
                                </a>
                            </li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4">Legal</h3>
                        <ul className="space-y-2">
                            <li>
                                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    Privacy Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    Terms of Service
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    Cookie Policy
                                </a>
                            </li>
                            <li>
                                <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                    GDPR
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <p className="text-gray-400 mb-4 md:mb-0">
                            © 2025 Strive. All rights reserved.
                        </p>
                        <div className="flex space-x-6">
                            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                Privacy
                            </a>
                            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                Terms
                            </a>
                            <a href="#" className="text-gray-400 hover:text-amber-500 transition-colors">
                                Sitemap
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}
