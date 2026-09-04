import { useState } from "react";
import { ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa6";
import "./ProjectCard.css";

function ProjectCard({ title, subtitle, tags, stack, image, links }) {
  const [imageError, setImageError] = useState(false);

  return (
    <article className="project-card">
      <div className="project-card__media">
        {!imageError ? (
          <img
            src={image}
            alt={`Aperçu du projet ${title}`}
            loading="lazy"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="project-card__media-fallback" aria-hidden="true">
            {title.slice(0, 2).toUpperCase()}
          </div>
        )}
      </div>

      <div className="project-card__body">
        <ul className="project-card__tags">
          {tags.map((tag) => (
            <li key={tag} className="project-card__tag">
              {tag}
            </li>
          ))}
        </ul>

        <h3 className="project-card__title">{title}</h3>
        <p className="project-card__subtitle">{subtitle}</p>

        {stack?.length > 0 && (
          <ul className="project-card__stack">
            {stack.slice(0, 6).map((tech) => (
              <li key={tech} className="project-card__stack-item">
                {tech}
              </li>
            ))}
          </ul>
        )}

        {(links?.demo || links?.code) && (
          <div className="project-card__links">
            {links.demo && (
              <a
                href={links.demo}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link project-card__link--primary"
              >
                <ExternalLink aria-hidden="true" size={16} />
                Visiter le site
              </a>
            )}
            {links.code && (
              <a
                href={links.code}
                target="_blank"
                rel="noopener noreferrer"
                className="project-card__link project-card__link--ghost"
              >
                <FaGithub aria-hidden="true" size={16} />
                Code
              </a>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export default ProjectCard;
