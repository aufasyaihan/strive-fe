import Hero from "@/components/landing/hero";
import About from "@/components/landing/about";
import Pricing from "@/components/landing/pricing";
import Contact from "@/components/landing/contact";
import Footer from "@/components/landing/footer";

export default function Home() {
    return (
        <>
            <Hero />
            <About />
            <Pricing />
            <Contact />
            <Footer />
        </>
    );
}
