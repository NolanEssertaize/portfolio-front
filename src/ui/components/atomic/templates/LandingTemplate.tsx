import SiteHeader from "@ui/components/atomic/organisms/SiteHeader";
import Hero from "@ui/components/atomic/organisms/Hero";
import FeatureGrid from "@ui/components/atomic/organisms/FeatureGrid";
import HowItWorks from "@ui/components/atomic/organisms/HowItWorks";
import CodeShowcase from "@ui/components/atomic/organisms/CodeShowcase";
import PricingTeaser from "@ui/components/atomic/organisms/PricingTeaser";
import SiteFooter from "@ui/components/atomic/organisms/SiteFooter";

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

