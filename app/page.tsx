import { Suspense } from "react";
import { Navbar } from "@/components/Navbar";
import { HeroHeader } from "@/components/HeroHeader";
import { FeaturedWork } from "@/components/FeaturedWork";
import { ExperiencePillars } from "@/components/ExperiencePillars";
import { PortfolioGallery } from "@/components/PortfolioGallery";
import { FlashCatalog } from "@/components/FlashCatalog";
import { BookingPolicies } from "@/components/BookingPolicies";
import { IntakeForm } from "@/components/IntakeForm";
import { AboutAndStudio } from "@/components/AboutAndStudio";
import { Footer } from "@/components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: "{\"@context\":\"https://schema.org\",\"@type\":\"LocalBusiness\",\"name\":\"Tattoos by Jake Llewellyn\",\"description\":\"Tattoos by Jake Llewellyn\",\"url\":\"https://tattoos-by-jake-llewellyn-f08acf.duckbyte.co\"}" }} />
      <Navbar />
      <div id="hero-header" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <HeroHeader />
        </Suspense>
      </div>
      <div id="featured-work" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <FeaturedWork />
        </Suspense>
      </div>
      <div id="experience-pillars" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <ExperiencePillars />
        </Suspense>
      </div>
      <div id="portfolio-gallery" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <PortfolioGallery />
        </Suspense>
      </div>
      <div id="flash-catalog" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <FlashCatalog />
        </Suspense>
      </div>
      <div id="booking-policies" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <BookingPolicies />
        </Suspense>
      </div>
      <div id="intake-form" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <IntakeForm />
        </Suspense>
      </div>
      <div id="about-and-studio" className="scroll-mt-20">
        <Suspense fallback={<div className="min-h-[30vh]" />}>
          <AboutAndStudio />
        </Suspense>
      </div>
      <Footer />
    </main>
  );
}
