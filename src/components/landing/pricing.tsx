import Link from "next/link";
import { Card } from "../ui/card";

export default function Pricing() {
    return (
        <section
            id="pricing"
            className="py-16 lg:py-24 px-6 lg:px-24 xl:px-48 bg-gray-50"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                        Choose Your <span className="text-amber-500">Plan</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Start your learning journey with a plan that fits your
                        needs and budget. Upgrade or downgrade anytime.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                    <Card className="p-8 border-2 border-gray-200 hover:border-amber-300 transition-colors duration-300">
                        <div className="text-center flex flex-col justify-between h-full">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">
                                    Plan A
                                </h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">
                                        $9
                                    </span>
                                    <span className="text-gray-600">
                                        /month
                                    </span>
                                </div>
                                <ul className="text-left space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-3">
                                            ✓
                                        </span>
                                        Access to max 5 articles
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-3">
                                            ✓
                                        </span>
                                        Access to max 5 videos
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/register"
                                className="w-full inline-block text-center px-6 py-3 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white rounded-full font-semibold transition-all duration-200"
                            >
                                Get Started
                            </Link>
                        </div>
                    </Card>

                    <Card className="p-8 border-2 border-amber-500 relative transform scale-105 shadow-xl">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                            <span className="bg-amber-500 text-white px-4 py-1 rounded-full text-sm font-semibold">
                                Most Popular
                            </span>
                        </div>
                        <div className="text-center flex flex-col justify-between h-full">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">
                                    Plan B
                                </h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">
                                        $29
                                    </span>
                                    <span className="text-gray-600">
                                        /month
                                    </span>
                                </div>
                                <ul className="text-left space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-3">
                                            ✓
                                        </span>
                                        Access to max 10 articles
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-3">
                                            ✓
                                        </span>
                                        Access to max 10 videos
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/register"
                                className="w-full inline-block text-center px-6 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-full font-semibold transition-all duration-200 shadow-lg"
                            >
                                Start Pro Trial
                            </Link>
                        </div>
                    </Card>

                    <Card className="p-8 border-2 border-gray-200 hover:border-amber-300 transition-colors duration-300">
                        <div className="text-center flex flex-col justify-between h-full">
                            <div>
                                <h3 className="text-2xl font-bold mb-4">
                                    Plan C
                                </h3>
                                <div className="mb-6">
                                    <span className="text-4xl font-bold">
                                        $99
                                    </span>
                                    <span className="text-gray-600">
                                        /month
                                    </span>
                                </div>
                                <ul className="text-left space-y-3 mb-8">
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-3">
                                            ✓
                                        </span>
                                        Unlimited access to all articles
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-3">
                                            ✓
                                        </span>
                                        Unlimited access to all videos
                                    </li>
                                    <li className="flex items-center">
                                        <span className="text-green-500 mr-3">
                                            ✓
                                        </span>
                                        All content access
                                    </li>
                                </ul>
                            </div>
                            <Link
                                href="/register"
                                className="w-full inline-block text-center px-6 py-3 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white rounded-full font-semibold transition-all duration-200"
                            >
                                Get Premium
                            </Link>
                        </div>
                    </Card>
                </div>
            </div>
        </section>
    );
}
