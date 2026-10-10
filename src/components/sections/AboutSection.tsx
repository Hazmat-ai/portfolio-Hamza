import { FadeIn } from '@/components/animations/FadeIn';
import { Code2, Layers, BrainCircuit, Cpu, GraduationCap, Users } from 'lucide-react';

const highlights = [
  {
    icon: Code2,
    title: 'Full-Stack Development',
    description: 'Building end-to-end applications with React, Next.js, FastAPI, and PostgreSQL.',
  },
  {
    icon: BrainCircuit,
    title: 'AI / Machine Learning',
    description: 'Working with PyTorch CNNs, Claude API, MediaPipe, and computer vision pipelines.',
  },
  {
    icon: Cpu,
    title: 'Robotics & Embedded Systems',
    description: 'Hands-on with NVIDIA Jetson Nano, Arduino, VEX V5, and ARM Cortex-M architecture.',
  },
  {
    icon: Layers,
    title: 'UX Design Minor',
    description: 'Applying user-centred design principles to every interface I build.',
  },
  {
    icon: GraduationCap,
    title: 'Wilfrid Laurier University',
    description: 'BSc Computer Science, UX Design Minor, Co-op — expected August 2028.',
  },
  {
    icon: Users,
    title: 'Ontario Government Intern',
    description: 'Software Development Intern at the Ministry of Public and Business Service Delivery.',
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section bg-[#0a0a0f]" aria-labelledby="about-heading">
      <div className="container">
        <FadeIn>
          <span className="section-label">About Me</span>
        </FadeIn>

        <div className="mt-6 grid md:grid-cols-2 gap-16 items-start">
          {/* Left: bio */}
          <div>
            <FadeIn delay={0.1}>
              <h2
                id="about-heading"
                className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-6"
              >
                Building software that{' '}
                <span className="gradient-text">bridges ideas and reality</span>
              </h2>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="space-y-4 text-[var(--text-secondary)] leading-relaxed text-base">
                <p>
                  I&apos;m a Computer Science student at Wilfrid Laurier University (Milton Campus) pursuing a
                  UX Design Minor on the Co-op program, expected to graduate in August 2028. My work spans
                  the full stack—from React frontends and FastAPI backends to PyTorch models and embedded
                  robotics systems.
                </p>
                <p>
                  Currently, I&apos;m a Software Development Intern at the Ontario Government&apos;s Ministry of Public
                  and Business Service Delivery and Procurement, where I apply these skills in a professional
                  engineering environment to systems that serve the public.
                </p>
                <p>
                  At university, I lead competition logistics for WLU Robotics, teach Calculus and IT as a
                  teaching assistant, and represent the university as a Student Ambassador. Outside class,
                  I build personal projects that explore the edges of what AI and software can do—from
                  handwriting recognition to real-time ASL detection to iOS fitness apps.
                </p>
                <p>
                  I care about systems that are well-designed at every layer: clean architecture, reliable
                  implementations, and interfaces people actually want to use.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.35}>
              <div className="mt-8 flex flex-wrap gap-3">
                <a
                  href="https://github.com/Hazmat-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm py-2"
                >
                  GitHub Profile
                </a>
                <a
                  href="https://www.linkedin.com/in/hamzarizvi-cs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary text-sm py-2"
                >
                  LinkedIn
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right: highlights grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {highlights.map((item, i) => {
              const Icon = item.icon;
              return (
                <FadeIn key={item.title} delay={0.1 + i * 0.08} direction="up">
                  <div className="card p-5 h-full">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center mb-3"
                      style={{ background: 'var(--accent-dim)' }}
                    >
                      <Icon size={18} className="text-[var(--accent-bright)]" />
                    </div>
                    <h3 className="font-semibold text-sm text-white mb-1.5">{item.title}</h3>
                    <p className="text-xs text-[var(--text-muted)] leading-relaxed">{item.description}</p>
                  </div>
                </FadeIn>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
