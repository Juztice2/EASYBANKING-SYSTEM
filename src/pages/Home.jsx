import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import BankingSolutions from "../components/BankingSolutions";
import Security from "../components/Security";
import Testimonials from "../components/Testimonials";
import CTA from "../components/CTA";
import Footer from "../components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen">

      <Navbar />

      <main>
        <Hero />
        <BankingSolutions />
        <Security />
        <Testimonials />
        <CTA />
      </main>

      <Footer />

    </div>
  );
}