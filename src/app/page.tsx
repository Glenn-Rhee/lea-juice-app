import Collection from "../../components/Collection";
import CTA from "../../components/CTA";
import Footer from "../../components/Footer";
import Hero from "../../components/Hero";
import Navbar from "../../components/Navbar";
import Stats from "../../components/Stats";
import Story from "../../components/Story";
import Testimonials from "../../components/Testimonials";

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Stats />
      <Collection />
      <Story />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
