import { X, ArrowUpRight } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-backdrop" role="presentation" onMouseDown={onClose}>
      <article className="modal" role="dialog" aria-modal="true" aria-labelledby="project-title" onMouseDown={(event) => event.stopPropagation()}>
        <button className="icon-button modal-close" type="button" onClick={onClose} aria-label="Fechar projeto">
          <X size={20} />
        </button>
        <div className="modal-art" style={{ "--project-accent": project.accent }}><span>{project.title.slice(0, 2)}</span></div>
        <div className="modal-content">
          <p className="eyebrow">Case study / 0{project.id}</p>
          <h2 id="project-title">{project.title}</h2>
          <p>{project.details}</p>
          <div className="tag-list">{project.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
          <a className="text-link" href={project.href} onClick={onClose}>Começar uma conversa <ArrowUpRight size={16} /></a>
        </div>
      </article>
    </div>
  );
}
