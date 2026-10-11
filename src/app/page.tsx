import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ExperienceSection } from "@/components/sections/ExperienceSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { EducationSection } from "@/components/sections/EducationSection";
import { ContactSection } from "@/components/sections/ContactSection";

import { ProjectRail } from "@/components/sections/ProjectRail";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectRail />
      <ExperienceSection />
      <div className="personal-background">
        <AboutSection />
        <EducationSection />
      </div>
      <SkillsSection />
      <ProjectsSection />
      <ContactSection />
    </>
  );
}
