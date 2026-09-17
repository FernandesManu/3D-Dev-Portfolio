import { useEffect, useState } from "react";
import { ArrowDown, ArrowUpRight, Check, Copy, Menu, X } from "lucide-react";
import Scene from "./components/Scene";
import ProjectModal from "./components/ProjectModal";
import ContactForm from "./components/ContactForm";
import { experiences, projects, skills, testimonials } from "./data";

const App = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const closeModal = (event) => event.key === "Escape" && setActiveProject(null);
    window.addEventListener("keydown", closeModal);
    return () => window.removeEventListener("keydown", closeModal);
  }, []);

  const copyEmail = async () => {
    await navigator.clipboard.writeText("hello@studio.dev");
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };

  const closeMenu = () => setMenuOpen(false);

  return (
    <main>
      <header className="site-header">
        <a className="brand" href="#home" onClick={closeMenu}><span className="brand-mark">+</span> studio.dev</a>
        <button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen}>{menuOpen ? <X /> : <Menu />}</button>
        <nav className={menuOpen ? "site-nav is-open" : "site-nav"}>
          {["about", "work", "experience", "contact"].map((item) => <a key={item} href={`#${item}`} onClick={closeMenu}>{item}</a>)}
        </nav>
        <a className="header-cta" href="#contact">Vamos conversar <ArrowUpRight size={15} /></a>
      </header>

      <section className="hero section-wrap" id="home">
        <div className="hero-copy">
          <p className="eyebrow reveal">Frontend engineer / creative developer</p>
          <h1 className="reveal delay-one">Ideias complexas,<br /><em>interfaces claras.</em></h1>
          <p className="hero-intro reveal delay-two">Eu projeto e desenvolvo produtos digitais que equilibram intenção, movimento e resultado.</p>
          <div className="hero-actions reveal delay-three"><a className="button button-primary" href="#work">Ver projetos <ArrowDown size={16} /></a><a className="text-link" href="#contact">Sobre o estúdio <ArrowUpRight size={16} /></a></div>
        </div>
        <div className="hero-scene" aria-label="Objeto 3D abstrato em rotação"><Scene /></div>
        <div className="hero-meta"><span>01 / 04</span><span>Scroll to explore <ArrowDown size={14} /></span></div>
      </section>

      <section className="section-wrap about-section" id="about">
        <div className="section-heading"><p className="eyebrow">01 / Perfil</p><h2>Designing digital<br /><em>with intent.</em></h2></div>
        <div className="about-grid"><div className="about-statement"><p>Trabalho entre design e engenharia para transformar boas perguntas em experiências que as pessoas entendem de primeira.</p><a className="text-link" href="#contact">Conheça meu processo <ArrowUpRight size={16} /></a></div><div className="skill-panel"><p className="eyebrow">Ferramentas e práticas</p><div className="skill-list">{skills.map((skill) => <span key={skill}>{skill}</span>)}</div></div></div>
      </section>

      <section className="section-wrap work-section" id="work">
        <div className="section-heading inline-heading"><div><p className="eyebrow">02 / Seleção</p><h2>Trabalho<br /><em>recente.</em></h2></div><p className="section-note">Uma seleção de produtos, sistemas e experiências construídos com parceiros ambiciosos.</p></div>
        <div className="project-list">{projects.map((project) => <button className="project-row" key={project.id} onClick={() => setActiveProject(project)}><span className="project-index">0{project.id}</span><span className="project-name"><strong>{project.title}</strong><small>{project.summary}</small></span><span className="project-tags">{project.tags.join(" / ")}</span><ArrowUpRight className="project-arrow" size={20} /></button>)}</div>
      </section>

      <section className="section-wrap experience-section" id="experience">
        <div className="section-heading"><p className="eyebrow">03 / Trajetória</p><h2>Construindo<br /><em>repertório.</em></h2></div>
        <div className="timeline">{experiences.map((item) => <article className="timeline-item" key={item.period}><span>{item.period}</span><div><h3>{item.role} <small>@ {item.company}</small></h3><p>{item.description}</p></div><Check size={16} /></article>)}</div>
      </section>

      <section className="section-wrap testimonial-section"><p className="eyebrow">04 / Parcerias</p><div className="testimonial-grid">{testimonials.map((item) => <blockquote key={item.name}><p>“{item.quote}”</p><footer>{item.name}<span>{item.role}</span></footer></blockquote>)}</div></section>

      <section className="section-wrap contact-section" id="contact"><div className="contact-copy"><p className="eyebrow">05 / Contato</p><h2>Tem um desafio<br /><em>interessante?</em></h2><p>Vamos conversar sobre o que você está construindo e descobrir onde posso contribuir.</p><button className="email-copy" onClick={copyEmail}>{copied ? <Check size={16} /> : <Copy size={16} />} {copied ? "Copiado" : "hello@studio.dev"}</button></div><ContactForm /></section>

      <footer className="site-footer"><span>© 2026 studio.dev</span><span>Feito com curiosidade e código.</span><a href="#home">Voltar ao topo <ArrowUpRight size={14} /></a></footer>
      <ProjectModal project={activeProject} onClose={() => setActiveProject(null)} />
    </main>
  );
};

export default App;
