import { SignalLine } from "@/components/signal/SignalLine";
import { BrandMark } from "@/components/ui/BrandLogo";
const decisions: Record<
  string,
  { nodes: string[]; notes: { label: string; detail: string }[] }
> = {
  studymind: {
    nodes: ["React", "FastAPI", "PostgreSQL"],
    notes: [
      {
        label: "Document parsing",
        detail:
          "PyMuPDF reads uploaded PDFs before Claude generates structured study materials.",
      },
      {
        label: "Persistent study sets",
        detail:
          "SQLAlchemy and PostgreSQL store user data behind JWT authentication.",
      },
    ],
  },
  "tcp-converter": {
    nodes: ["Client", "Threaded server", "Conversions"],
    notes: [
      {
        label: "Concurrent connections",
        detail: "A separate thread handles each client connection.",
      },
      {
        label: "Request validation",
        detail:
          "A custom text protocol defines requests, responses and error handling.",
      },
    ],
  },
  "arm-cortex-simulator": {
    nodes: ["Simulated ADC", "Polling loop", "GPIO alert"],
    notes: [
      {
        label: "Cycle by cycle",
        detail: "The browser simulator models an ARM Thumb polling loop.",
      },
      {
        label: "Threshold comparison",
        detail:
          "Chart.js displays simulated readings and GPIO state transitions.",
      },
    ],
  },
};
export function ProjectDecisions({ projectId }: { projectId: string }) {
  const diagram = decisions[projectId];
  if (!diagram) return null;
  return (
    <figure className="project-decisions">
      <figcaption>
        <span className="workshop-annotation">
          Architecture diagram · project notes
        </span>
        <BrandMark className="maker-mark" />
      </figcaption>
      <div
        className="decision-flow"
        role="img"
        aria-label={diagram.nodes.join(" to ")}
      >
        {diagram.nodes.map((node) => (
          <span key={node}>{node}</span>
        ))}
      </div>
      <SignalLine projectId={projectId} />
      <dl className="decision-notes">
        {diagram.notes.map((note) => (
          <div key={note.label}>
            <dt>{note.label}</dt>
            <dd>{note.detail}</dd>
          </div>
        ))}
      </dl>
    </figure>
  );
}
