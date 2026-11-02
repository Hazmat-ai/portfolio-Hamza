import type { Metadata } from "next";
import { Portfolio } from "@/components/convergence/Portfolio";
export const metadata: Metadata = {
  title: "Résumé",
  description: "Hamza Rizvi’s experience, education, projects and skills.",
  alternates: { canonical: "/resume" },
};
export default function ResumePage() {
  return <Portfolio initialTab="resume" autoIntro={false} />;
}
