import { PersonalPhoto } from "@/components/ui/PersonalPhoto";
import { ScrollHeading } from "@/components/ui/ScrollHeading";
const highlights = [
  {
    title: "Web applications",
    description:
      "React and Next.js interfaces, FastAPI backends, and PostgreSQL databases.",
  },
  {
    title: "Machine learning",
    description:
      "A PyTorch handwriting model with 47 character classes, plus MediaPipe and computer vision projects.",
  },
  {
    title: "Robotics",
    description:
      "Jetson Nano face detection, VEX V5 competition work, and ARM sensor simulation.",
  },
  {
    title: "UX design",
    description: "A UX Design minor alongside Computer Science at Laurier.",
  },
];
export function AboutSection() {
  return (
    <section
      id="about"
      className="section light-section about-section"
      aria-labelledby="about-heading"
    >
      <div className="container">
        <PersonalPhoto slot="about" />
        <div className="about-editorial">
          <div>
            <ScrollHeading id="about-heading">About me</ScrollHeading>
            <div className="about-copy">
              <p>
                I’m a Computer Science student at Wilfrid Laurier University’s
                Milton campus, with a UX Design minor, on the co-op program. I
                expect to graduate in August 2028.
              </p>
              <p>
                I build React and FastAPI applications, train PyTorch models,
                and work with embedded robotics. Right now, I’m a software
                development intern at the Ontario Ministry of Public and
                Business Service Delivery and Procurement.
              </p>
              <p>
                At Laurier, I lead competition logistics for WLU Robotics, work
                as a teaching assistant for Calculus and IT courses, and
                represent the university as a Student Ambassador. Outside class,
                my projects include handwriting recognition, ASL hand-sign
                detection, and an iOS fitness app.
              </p>
            </div>
          </div>
          <div className="about-highlights">
            {highlights.map((item) => (
              <div className="about-fact" key={item.title}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
