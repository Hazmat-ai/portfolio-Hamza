import { type Project } from "@/data/projects";
import { BrandMark } from "@/components/ui/BrandLogo";
export function ProjectSpecs({ project }: { project: Project }) {
  return (
    <dl className="project-specs">
      <div>
        <dt>Discipline</dt>
        <dd>{project.category}</dd>
      </div>
      <div>
        <dt>Stack</dt>
        <dd>{project.techStack.join(" / ")}</dd>
      </div>
    </dl>
  );
}
export function CatalogueLabel({ project }: { project: Project }) {
  return (
    <div className="catalogue-label">
      <span className="workshop-annotation">
        Project {String(project.order).padStart(2, "0")}
      </span>
      <BrandMark className="maker-mark" />
    </div>
  );
}
