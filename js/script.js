document.addEventListener('DOMContentLoaded', function() {

    // --- Navbar Toggle para Móvil ---
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            // Cambiar ícono de hamburguesa a X y viceversa
            const icon = navToggle.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
                navToggle.setAttribute('aria-label', 'Cerrar menú');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
                navToggle.setAttribute('aria-label', 'Abrir menú');
            }
        });

        // Cerrar menú al hacer clic en un enlace (para SPAs o navegación en la misma página)
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    navMenu.classList.remove('active');
                    const icon = navToggle.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                    navToggle.setAttribute('aria-label', 'Abrir menú');
                }
            });
        });
    }


    // --- Modal para Servicios y Proyectos ---
    const modal = document.getElementById('modal');
    const modalBody = document.getElementById('modal-body');
    const modalServiceNameInput = document.getElementById('modalServiceName'); // Para el formulario del modal
    const closeButton = document.querySelector('.close-button');

    // Datos de ejemplo para servicios (podrías cargarlos desde un JSON o directamente aquí)
    const servicesData = {
        s1: {
            title: "Nombre del Servicio/Producto 1",
            image: "images/service1-large.jpg", // Imagen más grande para el modal
            description: "<p>Esta es una descripción <strong>mucho más detallada</strong> del Servicio/Producto 1. Aquí puedes explicar en profundidad los beneficios, metodologías, tecnologías utilizadas, y casos de éxito relacionados.</p><ul><li>Beneficio clave 1</li><li>Metodología aplicada</li><li>Tecnología innovadora</li></ul><p>Contacta para una cotización personalizada.</p>",
            formEnabled: true // Habilita el mini formulario en el modal para este servicio
        },
        s2: {
            title: "Nombre del Servicio/Producto 2",
            image: "images/service2-large.jpg",
            description: "<p>Detalles completos sobre el Servicio/Producto 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p><p>Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>",
            formEnabled: true
        }
        // Añade más datos de servicios aquí con sus IDs
    };

    // Datos de ejemplo para proyectos
    const projectsData = {
        0: {
            title: "Ingeniero Civil – Actas de Vecindad, Autopista al Mar 2",
            images: [
                "images/001-exp-empresa-1.jpg",
                "images/002-exp-empresa-1.jpg",
                "images/003-exp-empresa-1.jpg",
                "images/004-exp-empresa-1.jpg"
            ],
            fullDescription: "<p class=\"exp-company\">Gestión Legal Asociados SAS · NIT 901.039.233-7</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> Cañasgordas, Uramita, Dabeiba y Mutatá (Antioquia)</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> 29/11/2017 – 05/07/2018 · Contrato de 7 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Levantamiento y elaboración de actas de vecindad de acuerdo con los lineamientos establecidos, dejando constancia del estado de los predios y estructuras colindantes antes de la intervención.</li><li>Ejecución del levantamiento a lo largo del corredor Cañasgordas – Mutatá, correspondiente a las Unidades Funcionales 1, 2, 3 y 4 del proyecto Autopista al Mar 2.</li></ul><h4>Herramientas:</h4><p>Microsoft Excel, Microsoft Word y AutoCAD.</p>",
            formEnabled: false// Generalmente no se pone formulario de servicio en detalle de proyecto, pero es una opción
        },
        1: {
            title: "Nombre Detallado del Proyecto 1",
            image: "images/project1-large.jpg", // Imagen más grande para el modal
            fullDescription: "<p>Aquí va la descripción completa del Proyecto 1. Incluye detalles como: objetivos del proyecto, desafíos encontrados, soluciones implementadas, tu rol específico (diseño, supervisión, gestión), presupuesto (si es relevante y público), duración, y resultados obtenidos.</p><h4>Tecnologías Utilizadas:</h4><ul><li>AutoCAD</li><li>Revit</li><li>Software de cálculo estructural XYZ</li></ul><h4>Impacto:</h4><p>El proyecto mejoró [aspecto específico] y benefició a [grupo de personas/comunidad].</p>",
            formEnabled: false // Generalmente no se pone formulario de servicio en detalle de proyecto, pero es una opción
        },
        2: {
            title: "Nombre Detallado del Proyecto 2",
            image: "images/project2-large.jpg",
            fullDescription: "<p>Descripción exhaustiva del Proyecto 2. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.</p>",
            formEnabled: false
        },
        // Añade más datos de proyectos aquí
        3: {
            title: "Nombre Detallado del Proyecto 3",
            image: "images/project3-large.jpg",
            fullDescription: "<p>Descripción exhaustiva del Proyecto 3. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio, vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa.</p>",
            formEnabled: false
        }
    };

    
    // --- Slider de fotos ---
    function buildSliderHTML(images, altBase) {
        const slides = images.map((src, i) =>
            `<div class="slider-slide"><img src="${src}" alt="${altBase} - foto ${i + 1}" loading="lazy"></div>`
        ).join('');
        return `<div class="slider" data-slider tabindex="0" aria-roledescription="carrusel" aria-label="Fotos: ${altBase}">` +
            `<div class="slider-track">${slides}</div>` +
            `<button type="button" class="slider-btn slider-prev" aria-label="Foto anterior"><i class="fas fa-chevron-left"></i></button>` +
            `<button type="button" class="slider-btn slider-next" aria-label="Foto siguiente"><i class="fas fa-chevron-right"></i></button>` +
            `<div class="slider-dots"></div></div>`;
    }

    function initSlider(slider) {
        if (!slider || slider.dataset.ready) return;
        slider.dataset.ready = 'true';

        const track = slider.querySelector('.slider-track');
        const slides = slider.querySelectorAll('.slider-slide');
        const prev = slider.querySelector('.slider-prev');
        const next = slider.querySelector('.slider-next');
        const dotsBox = slider.querySelector('.slider-dots');
        const total = slides.length;
        let index = 0;

        if (total <= 1) {
            [prev, next, dotsBox].forEach(el => { if (el) el.style.display = 'none'; });
            return;
        }

        const dots = [];
        slides.forEach((_, i) => {
            const dot = document.createElement('button');
            dot.type = 'button';
            dot.className = 'slider-dot';
            dot.setAttribute('aria-label', `Ir a la foto ${i + 1}`);
            dot.addEventListener('click', () => goTo(i));
            dotsBox.appendChild(dot);
            dots.push(dot);
        });

        function goTo(i) {
            index = (i + total) % total;
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((d, j) => d.classList.toggle('active', j === index));
        }

        prev.addEventListener('click', () => goTo(index - 1));
        next.addEventListener('click', () => goTo(index + 1));

        // Deslizar con el dedo en celular
        let startX = null;
        slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        slider.addEventListener('touchend', e => {
            if (startX === null) return;
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 40) goTo(index + (dx < 0 ? 1 : -1));
            startX = null;
        });

        // Flechas del teclado
        slider.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') goTo(index - 1);
            if (e.key === 'ArrowRight') goTo(index + 1);
        });

        goTo(0);
    }

    // Activa los sliders que ya están en la página (tarjetas de experiencia)
    document.querySelectorAll('[data-slider]').forEach(initSlider);
    
    
    
    // Función para abrir el modal
    function openModal(content, serviceName, showForm) {
        if (modalBody) modalBody.innerHTML = content;
        if (modalBody) modalBody.querySelectorAll('[data-slider]').forEach(initSlider);
        if (modal) modal.style.display = 'block';

        const modalFormContainer = document.querySelector('.modal-service-request-form');
        if (modalServiceNameInput && modalFormContainer) {
            if (showForm && serviceName) {
                modalServiceNameInput.value = serviceName;
                modalFormContainer.style.display = 'block';
            } else {
                modalFormContainer.style.display = 'none';
            }
        }
    }

    // Event Listeners para botones "Leer Más" de Servicios
    document.querySelectorAll('.view-service-button').forEach(button => {
        button.addEventListener('click', () => {
            const serviceId = button.dataset.serviceId;
            const service = servicesData[serviceId];
            if (service && modal) {
                let modalContent = `<h3>${service.title}</h3>`;
                if (service.image) {
                    modalContent += `<img src="${service.image}" alt="${service.title}" class="modal-image">`;
                }
                modalContent += service.description;
                openModal(modalContent, service.title, service.formEnabled);
            }
        });
    });

    // Event Listeners para botones "Ver Más Detalles" de Proyectos
    document.querySelectorAll('.view-project-button').forEach(button => {
        button.addEventListener('click', () => {
            const projectId = button.dataset.projectId;
            const project = projectsData[projectId];
            if (project && modal) {
                let modalContent = `<h3>${project.title}</h3>`;
                if (project.image) {
                    modalContent += `<img src="${project.image}" alt="${project.title}" class="modal-image">`;
                }
                modalContent += project.fullDescription;
                openModal(modalContent, null, project.formEnabled); // No se pasa nombre de servicio para el form del modal
            }
        });
    });


    // Cerrar Modal
    if (closeButton) {
        closeButton.onclick = function() {
            if (modal) modal.style.display = "none";
        }
    }
    if (modal) {
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    }

    // --- Smooth Scrolling para anclas del menú ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Solo previene el default si el href no es solo "#" (usado a veces para botones dummy)
            if (this.getAttribute('href') !== "#" && document.querySelector(this.getAttribute('href'))) {
                e.preventDefault();
                document.querySelector(this.getAttribute('href')).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- Manejo de Formularios (Ejemplo básico, sin envío real) ---
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const email = document.getElementById('newsletterEmail').value;
            if (email) {
                alert(`Gracias por suscribirte, ${email}! (Esto es una demo)`);
                this.reset();
            } else {
                alert("Por favor, ingresa un correo electrónico.");
            }
        });
    }

    const serviceRequestForm = document.getElementById('serviceRequestForm');
    if (serviceRequestForm) {
        serviceRequestForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const name = document.getElementById('userName').value;
            const email = document.getElementById('userEmail').value;
            const serviceType = document.getElementById('serviceType').value;
            const message = document.getElementById('message').value;

            if (name && email && serviceType && message) {
                alert(`Solicitud de servicio recibida de ${name} para ${serviceType}. Nos pondremos en contacto pronto. (Esto es una demo)`);
                // Aquí integrarías el envío a un backend o servicio de email.
                this.reset();
            } else {
                alert("Por favor, completa todos los campos requeridos.");
            }
        });
    }

    const modalServiceForm = document.getElementById('modalServiceForm');
    if (modalServiceForm) {
        modalServiceForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const serviceName = document.getElementById('modalServiceName').value;
            const userName = document.getElementById('modalUserName').value;
            const userEmail = document.getElementById('modalUserEmail').value;

            if (userName && userEmail && serviceName) {
                 alert(`Solicitud de información para "${serviceName}" recibida de ${userName} (${userEmail}). Nos pondremos en contacto. (Esto es una demo)`);
                 this.reset();
                 if (modal) modal.style.display = "none"; // Cierra el modal después de enviar
            } else {
                 alert("Por favor, completa tu nombre y correo electrónico.");
            }
        });
    }


    // --- Actualizar año en el footer ---
    const currentYearSpan = document.getElementById('currentYear');
    if (currentYearSpan) {
        currentYearSpan.textContent = new Date().getFullYear();
    }

    // --- Activar enlace del menú según la sección visible (opcional, más avanzado) ---
    // Puedes implementar Intersection Observer API para esto si lo deseas.
    // Por ahora, lo mantenemos simple.

});
