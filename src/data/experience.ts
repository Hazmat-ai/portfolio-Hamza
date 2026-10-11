export interface ExperienceItem {
  title: string;
  organization: string;
  dates: string;
  location: string;
  description: string[];
  technologies?: string[];
  priority: number;
}

export const experience: ExperienceItem[] = [
  {
    title: "Software Development Intern",
    organization:
      "Ministry of Public and Business Service Delivery and Procurement, Ontario Government",
    dates: "Aug 2026 – Jan 2027",
    location: "Ontario, Canada",
    description: [
      "Build internal websites for industry use.",
      "Work with businesses on tax-law and anti-money-laundering compliance.",
      "Work with databases, servers, and data schemas across projects using different programming languages and AI tools.",
      "Use Azure, VS Code, Git, and GitHub in development workflows.",
    ],
    technologies: ["Azure", "VS Code", "Git", "GitHub"],
    priority: 1,
  },
  {
    title: "IT Teaching Assistant",
    organization: "Wilfrid Laurier University",
    dates: "Jan 2026 – Apr 2026",
    location: "Milton, ON",
    description: [
      "Supported instruction for IT courses, reinforcing concepts and helping students work through technical problems.",
      "Communicated structured technical material to 100+ students, adapting explanations to different learning needs.",
      "Provided one-on-one and small-group support during labs and office hours.",
    ],
    priority: 2,
  },
  {
    title: "Student Instructional Assistant — Calculus & Functions",
    organization: "Wilfrid Laurier University",
    dates: "Aug 2025 – Apr 2026",
    location: "Milton, ON",
    description: [
      "Provided academic support for Calculus and Functions courses, reinforcing quantitative reasoning and problem-solving approaches.",
      "Held regular office hours and study sessions for groups of students, clarifying concepts and reviewing assignments.",
      "Developed explanations for complex mathematical topics tailored to first-year computer science students.",
    ],
    priority: 3,
  },
  {
    title: "Head of Competition",
    organization: "WLU Robotics",
    dates: "Nov 2025 – Present",
    location: "Milton, ON",
    description: [
      "Lead competition logistics for WLU Robotics, coordinating team participation in robotics events and managing timelines.",
      "Organize team preparation, competition registration, and post-event reviews to support continuous improvement.",
      "Collaborate with team leads across design and programming subgroups to align on competition strategy.",
    ],
    priority: 4,
  },
  {
    title: "Student Ambassador",
    organization: "Wilfrid Laurier University",
    dates: "Jan 2025 – Present",
    location: "Milton, ON",
    description: [
      "Represented Wilfrid Laurier University at prospective student events, open houses, and campus tours.",
      "Contributed to a 25% increase in prospective student inquiries through audience-tailored communication and event engagement.",
      "Collaborated with university staff to coordinate event logistics and ensure consistent, accurate information delivery.",
    ],
    priority: 5,
  },
  {
    title: "Website Usability Tester",
    organization: "Betlabs",
    dates: "Mar 2026 – Present",
    location: "Remote",
    description: [
      "Conducted structured usability testing sessions, documenting user behaviour observations and interface friction points.",
      "Produced written feedback reports communicating findings to cross-functional stakeholders.",
      "Applied UX evaluation methods to identify usability issues and prioritize improvements.",
    ],
    priority: 6,
  },
  {
    title: "iOS Developer (Co-op)",
    organization: "Swift Developer Program",
    dates: "Jan 2024 – Jun 2024",
    location: "Remote",
    description: [
      "Completed a structured iOS development program, building applications in Swift and SwiftUI.",
      "Developed FitForge, a workout and nutrition tracking application, as a capstone project.",
      "Gained hands-on experience with Swift Concurrency, data modelling, and SwiftUI component architecture.",
    ],
    technologies: ["Swift", "SwiftUI", "Xcode", "iOS"],
    priority: 7,
  },
  {
    title: "Guide / Technician",
    organization: "Minecraft Experience",
    dates: "Jun 2025 – Sep 2025",
    location: "Mississauga, ON",
    description: [
      "Provided technical support and guided visitors through an interactive Minecraft-themed experience with 1,000+ daily visitors.",
      "Diagnosed and resolved hardware and software issues under operational pressure to maintain uptime.",
      "Collaborated cross-functionally with operations staff to manage high visitor volumes and ensure consistent experience quality.",
    ],
    priority: 8,
  },
];
