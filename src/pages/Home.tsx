import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import BrowseEvents from '../components/BrowseEvents';
import TrustText from '../components/TrustText';
import Features from '../components/Features';
import HowItWorks from '../components/HowItWorks';
import Pricing from '../components/Pricing';
import CTA from '../components/CTA';
import Footer from '../components/Footer';

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <BrowseEvents />
        <TrustText />
        <Features />
        <HowItWorks />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
