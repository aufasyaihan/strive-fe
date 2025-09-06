import Link from "next/link";
import StriveIcon from "../icons/icon";

export default function Navbar() {
    return (
        <>
            <nav className="mx-auto max-w-2xl bg-white/20 px-4 py-0.5 rounded-full shadow-lg backdrop-blur-sm border border-gray-200/50 h-fit">
                <div className="flex gap-12 justify-between items-center">
                    <Link href="#hero">
                        <StriveIcon className="h-11 w-20 stroke-2 text-amber-500 -translate-y-1" />
                    </Link>
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
                        href="/login"
                        className="text-white bg-amber-500 hover:bg-amber-600 rounded-full px-4 py-1 transition-colors ease-in-out duration-200"
                    >
                        Login
                    </Link>
                </div>
            </nav>
        </>
    );
}
