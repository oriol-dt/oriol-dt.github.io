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
            <a href="mailto:${cvData.info.email}" class="btn-contact">Contacto</a>
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
            <div class="card">
                <h3>${exp.puesto} @ ${exp.empresa}</h3>
                <p>${exp.periodo}</p>
                <p>${exp.detalles}</p>
            </div>
        `).join('');
    } else if (sectionId === 'formacion') {
        html = cvData.formacion.map(edu => `
                <div class="card">
                    <h3>${edu.titulo} @ ${edu.centro}</h3>
                    <p>${edu.nivel} - ${edu.estado}</p>
                </div>
        `).join('');
    } else if (sectionId === 'proyectos') {
        html = cvData.proyectos.map(pro => `
            <div class="card project-card">
                <h3>${pro.titulo}</h3>
                <p>${pro.descripcion}</p>
                <div class="tech-stack">
                    ${pro.tecnologias.map(tech => `<span class="tag">${tech}</span>`).join('')}
                </div>
                <a href="${pro.link}" target="_blank" class="btn-link">Ver proyecto</a>
            </div>
        `).join('');
    } else {
        html = `
            <div class="welcome-section">
                <div class="description-text">
                    <p>Especialista en sistemas con base en administración de infraestructuras (Windows/Linux) y servicios de red, evolucionando hacia el desarrollo Full Stack.</p>
                    <p>Enfocado en la resolución de problemas técnicos complejos con alta capacidad de aprendizaje autónomo y proactividad.</p>
                </div>
                <div class="info-grid">
                    <div class="info-item">
                        <h4>Habilidades IT</h4>
                        <ul>
                            <li><strong>Sistemas:</strong> Active Directory, Nginx, Apache, IIS, MySQL.</li>
                            <li><strong>Stack:</strong> Python, PHP, HTML/CSS, JavaScript.</li>
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
