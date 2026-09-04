import { useState } from "react";
import { FileDown, FileText } from "lucide-react";
import Badge from "@/components/Badge.jsx";
import Button from "@/components/Button.jsx";
import Modal from "@/components/Modal.jsx";
import SectionTitle from "@/components/SectionTitle.jsx";
import "./About.css";

function About() {
  const [isCvOpen, setIsCvOpen] = useState(false);

  return (
    <section id="a-propos" className="about section section--wash">
      <div className="container about__inner">
        <div className="about__header">
          <Badge className="about__badge" icon />
          <SectionTitle
            eyebrow="À propos"
            title="Qui suis-je ?"
            id="a-propos-title"
          />
        </div>

        <div className="about__body">
          <p>
            J’ai passé plusieurs années dans l’assurance, à analyser des
            dossiers et évaluer des risques, avant de me reconvertir dans le
            développement web. J’en garde le réflexe de bien comprendre un
            problème avant de coder, au service d’interfaces claires et
            accessibles.
          </p>
          <p>
            Ce qui me plaît dans le développement, c’est justement cette
            diversité : une animation CSS un jour, une API à optimiser le
            lendemain, un score Lighthouse à améliorer la semaine suivante.
            Le fil conducteur reste le même — construire des produits bien
            pensés, utiles, prêts pour de vrais utilisateurs.
          </p>
          <div className="about__actions">
            <Button href="/cv-marc.pdf" variant="ghost">
              Télécharger mon CV
              <FileDown aria-hidden="true" size={18} />
            </Button>
            <Button
              variant="ghost"
              onClick={() => setIsCvOpen(true)}
              aria-haspopup="dialog"
            >
              Consulter mon CV
              <FileText aria-hidden="true" size={18} />
            </Button>
          </div>
        </div>
      </div>

      {isCvOpen && (
        <Modal title="CV de Marc Pero" onClose={() => setIsCvOpen(false)}>
          <iframe src="/cv-marc.html" title="CV de Marc Pero" />
        </Modal>
      )}
    </section>
  );
}

export default About;
