import { Card } from "../ui/card";

export default function About() {
    return (
        <section id="about" className="py-16 lg:py-24 px-6 lg:px-24 xl:px-48 bg-gray-100">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                        Why Choose <span className="text-amber-500">Strive</span>?
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        We believe in empowering individuals to reach their full potential through 
                        innovative learning experiences and personalized growth paths.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                            <span className="text-2xl">🎯</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Goal-Oriented Learning</h3>
                        <p className="text-gray-600">
                            Set clear objectives and track your progress with our structured learning paths 
                            designed to help you achieve your specific goals.
                        </p>
                    </Card>

                    <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                            <span className="text-2xl">👥</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Expert Community</h3>
                        <p className="text-gray-600">
                            Connect with industry experts and like-minded learners who share your 
                            passion for growth and success.
                        </p>
                    </Card>

                    <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                            <span className="text-2xl">📈</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Progress Tracking</h3>
                        <p className="text-gray-600">
                            Monitor your improvement with detailed analytics and personalized 
                            insights that help you stay motivated and on track.
                        </p>
                    </Card>

                    <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                            <span className="text-2xl">🏆</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Achievement System</h3>
                        <p className="text-gray-600">
                            Earn badges, certificates, and recognition as you complete milestones 
                            and master new skills.
                        </p>
                    </Card>

                    <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                            <span className="text-2xl">⚡</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Flexible Learning</h3>
                        <p className="text-gray-600">
                            Learn at your own pace with access to content 24/7, on any device, 
                            wherever you are.
                        </p>
                    </Card>

                    <Card className="p-8 border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center mb-6">
                            <span className="text-2xl">🎓</span>
                        </div>
                        <h3 className="text-xl font-semibold mb-4">Certification</h3>
                        <p className="text-gray-600">
                            Receive industry-recognized certificates that validate your skills 
                            and boost your career prospects.
                        </p>
                    </Card>
                </div>
            </div>
        </section>
    );
}
