import { HeroSection } from "@/components/landing/HeroSection";
import { CollaborationBadge } from "@/components/animations/CollaborationBadge";
import { AlertBanner } from "@/components/ui/alert-banner";

export default function Home() {
  return (
    <>
      <AlertBanner variant="info" />
      <main className="relative pt-14 sm:pt-0">
        {/* <CollaborationBadge /> */}
        <HeroSection />
      </main>
    </>
  );
}
