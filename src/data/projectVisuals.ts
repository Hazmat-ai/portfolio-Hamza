export interface ProjectVisual {
  src: string | null;
  alt: string;
  label: string;
  kind?: "photograph";
  position?: string;
  mobilePosition?: string;
  width?: number;
  height?: number;
  blurDataURL?: string;
}
export function projectVisual(slug: string, title: string): ProjectVisual {
  if (slug === "campaign-os") return campaignVisuals[0];
  if (slug === "studymind") return studyVisuals[0];
  if (slug === "asl-recognition")
    return {
      src: "/assets/projects/asl-recognition/home.webp",
      alt: "Original ASL frontend with the camera inactive; no recognition output is simulated",
      label: "Original frontend · local capture",
    };
  return {
    src: null,
    alt: title,
    label: "Engineering / project notes",
  };
}
export const campaignVisuals: ProjectVisual[] = [
  {
    src: "/assets/projects/campaign-os/home.webp",
    alt: "Local capture of the original campaignOS home frontend component",
    label: "Original frontend · local capture",
  },
  {
    src: "/assets/projects/campaign-os/brief.webp",
    alt: "Local capture of the original campaignOS empty campaign brief frontend component",
    label: "Original frontend · local capture",
  },
];

export const studyVisuals: ProjectVisual[] = [
  {
    src: "/assets/projects/studymind/home.webp",
    alt: "StudyMind home page showing flashcard and summary options, note input, and PDF upload controls",
    label: "Original frontend · local capture",
  },
  {
    src: "/assets/projects/studymind/auth.webp",
    alt: "Original StudyMind sign-in screen",
    label: "Original frontend · local capture",
  },
];
