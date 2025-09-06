"use client";

import Link from "next/link";
import StriveIcon from "../icons/icon";
import { Card } from "../ui/card";
import { useEffect, useState } from "react";

function AnimatedCounter({ end, duration = 2000, suffix = "" }: { end: number; duration?: number; suffix?: string }) {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (currentTime: number) => {
            if (!startTime) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            
            setCount(Math.floor(progress * end));
            
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [end, duration]);

    return <span>{count.toLocaleString()}{suffix}</span>;
}

export default function Hero() {
    return (
        <section className="relative flex flex-col lg:flex-row lg:items-center justify-between px-6 lg:px-24 xl:px-48 w-full py-16 lg:py-24 min-h-[80vh] bg-gradient-to-b to-gray-50 from-white -mt-12" id="hero">
            <div className="flex flex-1 h-fit justify-center lg:flex-none flex-col gap-6 lg:w-1/2 z-10">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                    Welcome to <span className="text-amber-500">Strive!</span>
                </h1>
                <p className="text-lg lg:text-xl text-gray-600 leading-relaxed">
                    Your journey to success starts here. Unlock your potential with our comprehensive learning platform designed to help you achieve your goals.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Link
                        className="px-6 py-3 bg-amber-500 hover:bg-amber-600 text-center rounded-full shadow-md text-white font-semibold shadow-amber-100 transition-all ease-in-out duration-200 hover:shadow-2xl hover:shadow-amber-200"
                        href="/login"
                    >
                        Get Started Today
                    </Link>
                    <Link
                        className="px-6 py-3 border-2 border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white text-center rounded-full font-semibold transition-all ease-in-out duration-200"
                        href="#about"
                    >
                        Learn More
                    </Link>
                </div>
            </div>
            <div className="relative flex-1 hidden lg:flex justify-center items-center mt-8 lg:mt-0 [perspective:1000px]">
                <StriveIcon className="size-80 xl:size-96 z-10 text-black hover:text-amber-600 transform-3d transition-all ease-in-out duration-500 hover:rotate-x-12 hover:-rotate-y-20 hover:scale-110" />
                <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400/20 to-amber-600/20 blur-3xl" />
            </div>
            
            <Card className="absolute -bottom-15 left-1/2 transform -translate-x-1/2 p-8 bg-white/95 backdrop-blur-md shadow-2xl border-0 hidden lg:flex justify-center items-center rounded-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
                <div className="flex gap-12 text-center">
                    <div className="flex flex-col items-center group">
                        <div className="text-4xl font-bold text-amber-500 mb-1 transition-colors group-hover:text-amber-600">
                            <AnimatedCounter end={10} suffix="K+" />
                        </div>
                        <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Students</div>
                    </div>
                    <div className="w-px bg-gray-200"></div>
                    <div className="flex flex-col items-center group">
                        <div className="text-4xl font-bold text-amber-500 mb-1 transition-colors group-hover:text-amber-600">
                            <AnimatedCounter end={500} suffix="+" />
                        </div>
                        <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Courses</div>
                    </div>
                    <div className="w-px bg-gray-200"></div>
                    <div className="flex flex-col items-center group">
                        <div className="text-4xl font-bold text-amber-500 mb-1 transition-colors group-hover:text-amber-600">
                            <AnimatedCounter end={95} suffix="%" />
                        </div>
                        <div className="text-sm font-medium text-gray-600 uppercase tracking-wide">Success Rate</div>
                    </div>
                </div>
            </Card>
        </section>
    );
}
