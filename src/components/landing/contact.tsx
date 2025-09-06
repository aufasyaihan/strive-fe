import { Card } from "../ui/card";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";

export default function Contact() {
    return (
        <section
            id="contact"
            className="py-16 lg:py-24 px-6 lg:px-24 xl:px-48 bg-white"
        >
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-3xl lg:text-5xl font-bold mb-6">
                        Get in <span className="text-amber-500">Touch</span>
                    </h2>
                    <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                        Have questions? We&apos;d love to hear from you. Send us
                        a message and we&apos;ll respond as soon as possible.
                    </p>
                </div>

                <div className="grid lg:grid-cols-2 gap-12">
                    <Card className="p-8 border-0 shadow-lg">
                        <form className="space-y-6">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label htmlFor="firstName">
                                        First Name
                                    </Label>
                                    <Input id="firstName" placeholder="John" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="lastName">Last Name</Label>
                                    <Input id="lastName" placeholder="Doe" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="email">Email</Label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="john@example.com"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="subject">Subject</Label>
                                <Input
                                    id="subject"
                                    placeholder="How can we help?"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="message">Message</Label>
                                <textarea
                                    id="message"
                                    rows={5}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-amber-500 focus:border-transparent resize-none"
                                    placeholder="Tell us more about your inquiry..."
                                />
                            </div>
                            <Button
                                type="submit"
                                className="w-full bg-amber-500 hover:bg-amber-600 text-white py-3 rounded-full font-semibold transition-colors duration-200"
                            >
                                Send Message
                            </Button>
                        </form>
                    </Card>

                    <div className="space-y-8">
                        <Card className="p-6 border-0 shadow-lg">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">📧</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Email Us
                                    </h3>
                                    <p className="text-gray-600">
                                        support@strive.com
                                    </p>
                                    <p className="text-gray-600">
                                        info@strive.com
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 border-0 shadow-lg">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">📞</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Call Us
                                    </h3>
                                    <p className="text-gray-600">
                                        +1 (555) 123-4567
                                    </p>
                                    <p className="text-gray-600">
                                        Mon-Fri, 9am-6pm EST
                                    </p>
                                </div>
                            </div>
                        </Card>

                        <Card className="p-6 border-0 shadow-lg">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-amber-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <span className="text-xl">📍</span>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold mb-2">
                                        Visit Us
                                    </h3>
                                    <p className="text-gray-600">
                                        123 Learning Street
                                    </p>
                                    <p className="text-gray-600">
                                        Education City, EC 12345
                                    </p>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </section>
    );
}
