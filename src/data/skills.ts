export interface SkillGroup {
  category: string;
  icon: string;
  skills: string[];
}

export const skillGroups: SkillGroup[] = [
  {
    category: 'Programming Languages',
    icon: 'Code2',
    skills: ['Python', 'TypeScript', 'JavaScript', 'Java', 'Swift', 'C/C++', 'HTML', 'CSS'],
  },
  {
    category: 'Frontend Development',
    icon: 'Monitor',
    skills: ['React', 'Next.js', 'Vite', 'Tailwind CSS', 'SwiftUI', 'Radix UI', 'MediaPipe'],
  },
  {
    category: 'Backend & APIs',
    icon: 'Server',
    skills: ['FastAPI', 'Node.js', 'Express', 'REST APIs', 'GraphQL', 'Pug', 'JWT'],
  },
  {
    category: 'Databases',
    icon: 'Database',
    skills: ['PostgreSQL', 'SQLAlchemy', 'localStorage'],
  },
  {
    category: 'AI / Machine Learning',
    icon: 'Brain',
    skills: ['PyTorch', 'Torchvision', 'OpenCV', 'Claude API', 'MediaPipe', 'Computer Vision', 'CNN'],
  },
  {
    category: 'Developer Tools',
    icon: 'Wrench',
    skills: ['Git', 'GitHub', 'VS Code', 'Eclipse IDE', 'Xcode', 'Postman', 'Javadoc'],
  },
  {
    category: 'Cloud & Deployment',
    icon: 'Cloud',
    skills: ['Vercel', 'GitHub Actions', 'npm'],
  },
  {
    category: 'Embedded Systems & Robotics',
    icon: 'Cpu',
    skills: ['NVIDIA Jetson Nano', 'Arduino', 'Raspberry Pi', 'VEX V5', 'VEXcode', 'ARM Assembly', 'TETRIX Platform'],
  },
];

export interface Certification {
  title: string;
  issuer: string;
  date: string;
}

export const certifications: Certification[] = [
  { title: 'Claude API Development', issuer: 'Anthropic', date: 'Apr 2026' },
  { title: 'Claude Code 101', issuer: 'Anthropic', date: 'Apr 2026' },
  { title: 'Claude Code in Action', issuer: 'Anthropic', date: 'Apr 2026' },
  { title: 'Claude 101', issuer: 'Anthropic', date: 'Apr 2026' },
  { title: 'Model Context Protocol (MCP) Fundamentals & Advanced Topics', issuer: 'Anthropic', date: 'Apr 2026' },
  { title: 'AI Fluency Framework & Foundations', issuer: 'Anthropic', date: 'Apr 2026' },
  { title: 'AI Fluency for Students, Educators, and Nonprofits', issuer: 'Anthropic', date: 'Apr 2026' },
  { title: 'Introduction to Agent Skills', issuer: 'Anthropic', date: 'Apr 2026' },
  { title: 'Introduction to Subagents', issuer: 'Anthropic', date: 'Apr 2026' },
  { title: 'Claude with Vertex AI', issuer: 'Anthropic', date: 'Apr 2026' },
  { title: 'Claude in Amazon Bedrock', issuer: 'Anthropic', date: 'Apr 2026' },
];
