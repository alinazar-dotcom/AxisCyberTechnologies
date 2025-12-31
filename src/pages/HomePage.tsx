import { Hero } from '../components/Hero';
import { TrustedBy } from '../components/TrustedBy';
import { Philosophy } from '../components/Philosophy';
import { Services } from '../components/Services';
import { TechGalaxy } from '../components/TechGalaxy';
import { CaseStudies } from '../components/CaseStudies';
import { CoreLogic } from '../components/CoreLogic';
import { Industries } from '../components/Industries';
import { InnovationLab } from '../components/InnovationLab';
import { CTASection } from '../components/CTASection';

export function HomePage() {
  return (
    <>
      <Hero />
      <TrustedBy />
      <Philosophy />
      <Services />
      <TechGalaxy />
      <CaseStudies />
      <CoreLogic />
      <Industries />
      <InnovationLab />
      <CTASection />
    </>
  );
}
