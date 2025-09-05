import Link from "next/link";
import StriveIcon from "../icons/icon";

export default function Navbar() {
    return (
        <nav className="mx-auto max-w-2xl bg-neutral-100/50 px-4 py-2 rounded-full shadow-md backdrop-blur-sm">
            <div className="flex justify-between items-center">
              <Link href="/">
                  <StriveIcon className="h-10 w-20 stroke-2" />
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
                        <Link href="#contact" className="group" >
                            Contact
                            <span className="block max-w-0 group-hover:max-w-full transition-all duration-500 h-0.5 bg-amber-500" />
                        </Link>
                    </li>
                </ul>
                <div className="flex gap-2">
                    <Link
                        href="/login"
                        className="text-white bg-amber-500 hover:bg-amber-600 rounded-full px-4 py-1 transition-colors ease-in-out duration-200"
                    >
                        Login
                    </Link>
                    <Link
                        href="/register"
                        className="rounded-full px-4 py-1 border border-amber-500 text-amber-500 hover:bg-amber-500 hover:text-white transition-colors ease-in-out duration-200"
                    >
                        Sign Up
                    </Link>
                </div>
            </div>
        </nav>
    );
}
