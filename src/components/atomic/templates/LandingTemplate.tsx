import SiteHeader from "@/components/atomic/organisms/SiteHeader";
import Hero from "@/components/atomic/organisms/Hero";
import FeatureGrid from "@/components/atomic/organisms/FeatureGrid";
import HowItWorks from "@/components/atomic/organisms/HowItWorks";
import CodeShowcase from "@/components/atomic/organisms/CodeShowcase";
import PricingTeaser from "@/components/atomic/organisms/PricingTeaser";
import SiteFooter from "@/components/atomic/organisms/SiteFooter";

export default function LandingTemplate() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <FeatureGrid />
        <HowItWorks />
        <CodeShowcase />
        <PricingTeaser />
      </main>
      <SiteFooter />
    </>
  );
}

