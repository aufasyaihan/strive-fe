"use client";

import Link from "next/link";
import StriveIcon from "../icons/icon";
import { useEffect, useState } from "react";
import { getToken } from "@/lib/cookies";

export default function Navbar() {
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(() => {
        const fetchLoginStatus = async () => {
            try {
                const token = await getToken("access_token");
                setIsLoggedIn(!!token);
            } catch (error) {
                console.error("Error checking login status:", error);
                setIsLoggedIn(false);
            }
        };
        fetchLoginStatus();
    }, []);
    return (
        <>
            <nav className="mx-auto max-w-2xl bg-white/20 px-4 py-0.5 rounded-full shadow-lg backdrop-blur-sm border border-gray-200/50 h-fit">
                <div className="flex gap-12 justify-between items-center">
                    <StriveIcon
                        className="h-11 w-20 stroke-2 text-amber-500 -translate-y-1 cursor-pointer"
                        onClick={() =>
                            window.scrollTo({ top: 0, behavior: "smooth" })
                        }
                    />
                    <ul className="flex items-center gap-4">
                        <li>
                            <Link href="#about" className="group">
                                About
                                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500" />
                            </Link>
                        </li>
                        <li>
                            <Link href="#pricing" className="group">
                                Pricing
                                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500" />
                            </Link>
                        </li>
                        <li>
                            <Link href="#contact" className="group">
                                Contact
                                <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500" />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
            <nav className="mx-auto max-w-2xl bg-white/20 p-2 rounded-full shadow-lg backdrop-blur-sm border border-gray-200/50 my-auto">
                <div className="flex gap-2 items-center justify-center">
                    <Link
                        href={isLoggedIn ? "/dashboard" : "/login"}
                        className="text-white bg-amber-500 hover:bg-amber-600 rounded-full px-4 py-1 transition-colors ease-in-out duration-200"
                    >
                        {isLoggedIn ? "Dashboard" : "Login"}
                    </Link>
                </div>
            </nav>
        </>
    );
}
