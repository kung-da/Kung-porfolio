import { Navigation } from "@/components/Navigation";
import { AmbientDots } from "@/components/AmbientDots";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Gallery } from "@/components/sections/Gallery";
import { DataLab } from "@/components/sections/DataLab";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="relative min-h-screen" style={{ background: "#0a0f1e" }}>
      <AmbientDots />
      <div className="relative" style={{ zIndex: 10 }}>
        <Navigation />
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Gallery />
        <DataLab />
        <Contact />
        <Footer />
      </div>
    </div>
  );
};

export default Index;
