import { cvData } from "./data.js";

const app = document.getElementById("hero-section");
const navLinks = document.querySelectorAll('.nav-link');

function calculateAge(birthDate) {
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
        age--;
    }
    return age;
}

function setBasicInfo() {
    const base = document.querySelector('.header-text');

    if (base) {
        base.innerHTML = `
            <h1>${cvData.info.nombre}</h1>
            <p class="subtitle">${cvData.info.rol}</p>
            <p class="subtitle">📍${cvData.info.ubicacion}</p>
            <p class="subtitle">${calculateAge(cvData.info.nacimiento)} años</p>
            <a href="mailto:${cvData.info.email}" class="btn-primary">Contacto</a>
        `;
    }
}

function renderLastUpdate() {
    const today = new Date();
    const fullDateSpan = document.getElementById("full-date");
    if (fullDateSpan) {
        fullDateSpan.innerText = `${today.getDate()} de ${today.toLocaleDateString('es-ES', { month: 'long' })} de ${today.getFullYear()}`;
    }
}

function renderSection(sectionId) {
    app.classList.remove("fade-in");
    void app.offsetWidth;
    app.classList.add("fade-in");

    let html = '';

    if (sectionId === 'experiencia') {
        html = cvData.experiencia.map(exp => `
            <div class="card" style="margin-bottom: 20px; text-align: left;">
                <h3>${exp.puesto} @ ${exp.empresa}</h3>
                <p class="subtitle" style="font-size: 0.95rem; margin-bottom: 8px;">${exp.periodo}</p>
                <p style="white-space: pre-line;">${exp.detalles}</p>
            </div>
        `).join('');
    } else if (sectionId === 'formacion') {
        html = cvData.formacion.map(edu => `
            <div class="card" style="margin-bottom: 20px; text-align: left;">
                <h3>${edu.titulo} @ ${edu.centro}</h3>
                <p>${edu.nivel} - <strong>${edu.estado}</strong></p>
            </div>
        `).join('');
    } else if (sectionId === 'proyectos') {
        html = cvData.proyectos.map(pro => {
            let linksHtml = '';

            // Si tiene link_pub o link_gh, renderizamos esos botones específicos
            if (pro.link_pub || pro.link_gh) {
                linksHtml = `
                    <div class="project-links">
                        ${pro.link_pub ? `<a href="${pro.link_pub}" target="_blank" class="btn-link">Ver Demo</a>` : ''}
                        ${pro.link_gh ? `<a href="${pro.link_gh}" target="_blank" class="btn-link gh-link">GitHub</a>` : ''}
                    </div>
                `;
            }
            // Si no tiene esos, pero sí un "link" genérico antiguo
            else if (pro.link) {
                linksHtml = `
                    <div class="project-links">
                        <a href="${pro.link}" target="_blank" class="btn-link">Ver proyecto</a>
                    </div>
                `;
            }

            return `
                <div class="card project-card" style="margin-bottom: 20px; text-align: left; padding: 15px; border: 1px solid var(--border-color); border-radius: 8px;">
                    <h3>${pro.titulo}</h3>
                    <p>${pro.descripcion}</p>
                    <div class="tech-stack" style="display: flex; flex-wrap: wrap; gap: 5px; margin: 10px 0;">
                        ${pro.tecnologias.map(tech => `<span class="tag" style="background: var(--bg-color); padding: 3px 8px; border-radius: 4px; font-size: 0.8rem;">${tech}</span>`).join('')}
                    </div>
                    ${linksHtml}
                </div>
            `;
        }).join('');
    } else {
        html = `
            <div class="welcome-section" style="text-align: left;">
                <div class="description-text">
                    <p>Técnico en sistemas con base en administración de infraestructuras (Windows/Linux) y servicios de red, evolucionando hacia el desarrollo Full Stack. Enfocado en la resolución de problemas técnicos complejos con alta capacidad de aprendizaje autónomo y proactividad.</p>
                </div>
                <div class="info-grid" style="margin-top: 20px;">
                    <div class="info-item" style="margin-bottom: 15px;">
                        <h4>Habilidades IT</h4>
                        <ul class="skills-list">
                            <li><strong>Sistemas:</strong> Active Directory, DNS, DHCP, Nginx, Apache, IIS, MySQL.</li>
                            <li><strong>Programación:</strong> Python, PHP, HTML/CSS, JavaScript, TypeScript, SQL.</li>
                            <li>
                                <strong>Frameworks:</strong>
                                <div class="frameworks-category">
                                    <span class="framework-group-title">Frontend:</span>
                                    <div class="tech-stack" style="display: flex; flex-wrap: wrap; gap: 5px; margin: 5px 0 10px 0;">
                                        <span class="tag">React</span>
                                        <span class="tag">Angular</span>
                                    </div>
                                </div>
                                <div class="frameworks-category">
                                    <span class="framework-group-title">Backend:</span>
                                    <div class="tech-stack" style="display: flex; flex-wrap: wrap; gap: 5px; margin: 5px 0 0 0;">
                                        <span class="tag">Express</span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                    <div class="info-item">
                        <h4>Idiomas</h4>
                        <ul>
                            <li>Español y Catalán (Nativo)</li>
                            <li>Inglés <a href="${cvData.info.link_doc}" target="_blank" class="inline-link">(Intermedio)</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    app.innerHTML = `<section id="section-${sectionId}">${html}</section>`;
}

function navigateToSection(sectionId, updateHistory = true) {
    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('data-section') === sectionId);
    });

    if (updateHistory) {
        history.pushState({ sectionId }, "", `#${sectionId}`);
    }

    renderSection(sectionId);
}

navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute("data-section");
        navigateToSection(sectionId);
    });
});

window.addEventListener("popstate", (e) => {
    const sectionId = e.state?.sectionId || "inicio";
    navigateToSection(sectionId, false);
});

document.addEventListener('DOMContentLoaded', () => {
    renderLastUpdate();
    setBasicInfo();

    const initialSection = window.location.hash.replace('#', '') || "inicio";

    history.replaceState({ sectionId: initialSection }, "", `#${initialSection}`);

    navigateToSection(initialSection, false);
});