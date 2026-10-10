import photoMetadata from "./photoMetadata.json";
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
  if (slug in photoMetadata) {
    const metadata = photoMetadata[slug as keyof typeof photoMetadata];
    const compositions: Record<
      string,
      { alt: string; position: string; mobilePosition: string }
    > = {
      fitforge: {
        alt: "An athlete preparing a barbell lift in a dark gym, contextual fitness photography, not the FitForge application",
        position: "50% 65%",
        mobilePosition: "53% 65%",
      },
      "smart-write": {
        alt: "A fountain pen on handwritten lined paper, contextual handwriting photography",
        position: "50% 55%",
        mobilePosition: "55% 55%",
      },
      "arns-travel-system": {
        alt: "Aircraft wing and engine above clouds at sunset, contextual travel photography",
        position: "50% 50%",
        mobilePosition: "60% 50%",
      },
      "jetson-nano-robot": {
        alt: "Close-up of a Raspberry Pi circuit board, contextual embedded computing photography, not the actual Jetson robot",
        position: "50% 55%",
        mobilePosition: "50% 55%",
      },
      "tcp-converter": {
        alt: "Network cabling in a server installation, contextual networking photography",
        position: "50% 50%",
        mobilePosition: "50% 50%",
      },
      "arm-cortex-simulator": {
        alt: "An Arduino board surrounded by electronic components, contextual electronics photography, not the ARM simulator hardware",
        position: "50% 50%",
        mobilePosition: "50% 50%",
      },
      "hubspot-integration": {
        alt: "People collaborating around laptops in a workplace, contextual CRM workflow photography",
        position: "50% 38%",
        mobilePosition: "62% 38%",
      },
      "vex-robotics": {
        alt: "Close-up of mechanical gears, contextual drivetrain photography, not the team's competition robot",
        position: "50% 50%",
        mobilePosition: "40% 50%",
      },
      "fpv-racing-sim": {
        alt: "Close-up of a camera lens, contextual imaging photography, not the FPV installation",
        position: "50% 50%",
        mobilePosition: "50% 50%",
      },
    };
    return {
      ...metadata,
      ...compositions[slug],
      src: `/assets/photography/${slug}.webp`,
      label: "Context photograph · Unsplash",
      kind: "photograph",
    };
  }
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
    alt: "Original StudyMind frontend, with the empty note input and upload controls",
    label: "Original frontend · local capture",
  },
  {
    src: "/assets/projects/studymind/auth.webp",
    alt: "Original StudyMind sign-in screen",
    label: "Original frontend · local capture",
  },
];
