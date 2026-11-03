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
            title: "Ingeniero Civil – Actas de Vecindad",
            images: ["images/001-exp-empresa-1.jpg", "images/002-exp-empresa-1.jpg", "images/003-exp-empresa-1.jpg", "images/004-exp-empresa-1.jpg"],
            fullDescription: "<p class=\"exp-company\">Gestión Legal Asociados SAS · NIT 901.039.233-7</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> Cañasgordas, Uramita, Dabeiba y Mutatá (Antioquia)</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> 29/11/2017 – 05/07/2018 · 7 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Levantamiento y elaboración de actas de vecindad de acuerdo con los lineamientos establecidos, dejando constancia del estado de los predios y estructuras colindantes antes de la intervención.</li><li>Ejecución del levantamiento a lo largo del corredor Cañasgordas – Mutatá, correspondiente a las Unidades Funcionales 1, 2, 3 y 4 del proyecto Autopista al Mar 2.</li></ul><h4>Herramientas:</h4><p>Excel, Word y AutoCAD.</p>",
            formEnabled: false
        },
        1: {
            title: "Auxiliar de Residente de Obra",
            images: ["images/001-exp-empresa-2.jpg", "images/002-exp-empresa-2.jpg", "images/003-exp-empresa-2.jpg", "images/004-exp-empresa-2.jpg"],
            fullDescription: "<p class=\"exp-company\">Consorcio Cancha Las Delicias · NIT 901.263.439-6</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> Astrea, Cesar</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> 15/05/2019 – 15/09/2019 · 4 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Apoyo a la residencia de obra en la supervisión técnica de las actividades según los planos del proyecto.</li><li>Control de inventarios y medición de las cantidades de obra ejecutadas.</li><li>Manejo de carteras de campo; elaboración de informes de avance y cortes de obra.</li><li>Gestión de cotizaciones con proveedores y coordinación del personal de obra.</li></ul><h4>Herramientas:</h4><p>Excel, Word, AutoCAD y Civil3D.</p>",
            formEnabled: false
        },
        2: {
            title: "Inspector de Obra",
            images: ["images/001-exp-empresa-3.jpg", "images/002-exp-empresa-3.jpg", "images/003-exp-empresa-3.jpg", "images/004-exp-empresa-3.jpg"],
            fullDescription: "<p class=\"exp-company\">Consorcio Intradomiciliarias 2020 · NIT 901.390.267-1</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> Astrea, Cesar</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> 25/08/2020 – 03/02/2021 · 5.3 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Inspección y supervisión técnica de las actividades según los planos de obra.</li><li>Control de inventarios y medición de las cantidades de obra ejecutadas.</li><li>Manejo de carteras de campo; elaboración de informes de avance y cortes de obra.</li><li>Gestión de cotizaciones con proveedores y coordinación del personal de obra.</li><li>Actividades adicionales: levantamiento y elaboración de planos según especificaciones en la etapa de diagnósticos.</li></ul><h4>Herramientas:</h4><p>Excel, Word, AutoCAD y Civil3D.</p>",
            formEnabled: false
        },
        3: {
            title: "Profesional en Costos y Presupuestos",
            images: ["images/001-exp-empresa-4.jpg", "images/002-exp-empresa-4.jpg", "images/003-exp-empresa-4.jpg", "images/004-exp-empresa-4.jpg"],
            fullDescription: "<p class=\"exp-company\">Consorcio Estudios Astrea 2021 (Consultoría) · NIT 901.517.486-4</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> Astrea, Cesar</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> 19/10/2021 – 19/12/2021 · 2 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Actualización de precios y cálculo del factor multiplicador.</li><li>Gestión de cotizaciones con proveedores.</li><li>Elaboración de análisis de precios unitarios (APU).</li><li>Elaboración del presupuesto del proyecto.</li></ul><h4>Herramientas:</h4><p>Excel, Word, AutoCAD y Civil3D.</p>",
            formEnabled: false
        },
        4: {
            title: "Residente de Interventoría",
            images: ["images/001-exp-empresa-5.jpg", "images/002-exp-empresa-5.jpg", "images/003-exp-empresa-5.jpg", "images/004-exp-empresa-5.jpg"],
            fullDescription: "<p class=\"exp-company\">Consorcio Interurbanas Fase I · NIT 901.578.450-0</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> Astrea, Cesar</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> Contrato N°1: 02/05/2022 – 30/04/2023 · 12.1 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Supervisión técnica de las actividades en obra.</li><li>Elaboración y seguimiento de oficios dirigidos al contratista y a la entidad contratante.</li><li>Realización de comités de obra y elaboración de actas e informes de seguimiento al contratista.</li><li>Elaboración de informes mensuales para actas de cobro a la entidad y de avance del contrato para la entidad supervisora.</li><li>Revisión y seguimiento del cronograma de actividades.</li><li>Elaboración y revisión de APU y especificaciones técnicas de ítems contractuales y no previstos.</li></ul><h4>Herramientas:</h4><p>Excel, Word, AutoCAD y Civil3D.</p>",
            formEnabled: false
        },
        5: {
            title: "Residente de Interventoría",
            images: ["images/001-exp-empresa-6.jpg", "images/002-exp-empresa-6.jpg", "images/003-exp-empresa-6.jpg", "images/004-exp-empresa-6.jpg"],
            fullDescription: "<p class=\"exp-company\">Consorcio Intertoscano 2022 · NIT 901.625.909-0</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> La Jagua de Ibirico, Cesar</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> Contrato N°1: 28/09/2022 – 30/06/2023 · 9.2 meses</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> Contrato N°2: 01/07/2023 – 08/08/2023 · 1.3 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Supervisión técnica de las actividades en obra.</li><li>Elaboración y seguimiento de oficios dirigidos al contratista y a la entidad contratante.</li><li>Realización de comités de obra y elaboración de actas e informes de seguimiento al contratista.</li><li>Elaboración de informes mensuales para actas de cobro a la entidad y de avance del contrato para la entidad supervisora.</li><li>Revisión y seguimiento del cronograma de actividades.</li><li>Elaboración y revisión de APU y especificaciones técnicas de ítems contractuales y no previstos.</li></ul><h4>Herramientas:</h4><p>Excel, Word, AutoCAD y Civil3D.</p>",
            formEnabled: false
        },
        6: {
            title: "Residente de Obra",
            images: ["images/001-exp-empresa-7.jpg", "images/002-exp-empresa-7.jpg", "images/003-exp-empresa-7.jpg", "images/004-exp-empresa-7.jpg"],
            fullDescription: "<p class=\"exp-company\">Unión Temporal Plaza Mercado Astrea · NIT 901.737.791-1</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> Astrea, Cesar</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> 12/09/2023 – 05/12/2023 · 2.8 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Levantamiento de actas de vecindad.</li><li>Planificación, revisión y seguimiento de las actividades según los cronogramas contractuales.</li><li>Supervisión técnica en obra de acuerdo con los planos contractuales.</li><li>Realización de comités de obra, actas e informes de seguimiento a la interventoría.</li><li>Elaboración de informes mensuales para actas de cobro y de avance del contrato para la entidad supervisora.</li><li>Elaboración y revisión de cortes de avance físico de obra.</li><li>Elaboración de formatos, informes diarios de avance y registro fotográfico; cotizaciones con proveedores.</li><li>Actividades adicionales: revisión de calidad de materiales, ensayos de laboratorio de relleno y agregados e implementación del plan de manejo de tránsito en obra.</li></ul><h4>Herramientas:</h4><p>Excel, Word, AutoCAD y Civil3D.</p>",
            formEnabled: false
        },
        7: {
            title: "Residente de Obra",
            images: ["images/001-exp-empresa-8.jpg", "images/002-exp-empresa-8.jpg", "images/003-exp-empresa-8.jpg", "images/004-exp-empresa-8.jpg"],
            fullDescription: "<p class=\"exp-company\">Consorcio AMCO · NIT 901.858.071-4</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> Fundación, Magdalena</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> 24/08/2024 – 15/11/2024 · 2.8 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Planificación, revisión y seguimiento de las actividades según los cronogramas contractuales.</li><li>Supervisión técnica en obra de acuerdo con los planos contractuales.</li><li>Realización de comités de obra, actas e informes de seguimiento a la Supervisión.</li><li>Elaboración de informes mensuales para actas de cobro y de avance del contrato para la entidad supervisora.</li><li>Elaboración y revisión de cortes de avance físico de obra.</li><li>Elaboración de formatos, informes diarios de avance y registro fotográfico; cotizaciones con proveedores.</li><li>Actividades adicionales: revisión de calidad de materiales, ensayos de laboratorio de relleno y agregados e implementación del plan de manejo de tránsito en obra.</li></ul><h4>Herramientas:</h4><p>Excel, Word, AutoCAD y Civil3D.</p>",
            formEnabled: false
        },
        8: {
            title: "Profesional en Cálculo Estructural",
            images: ["images/001-exp-empresa-9.jpg", "images/002-exp-empresa-9.jpg", "images/003-exp-empresa-9.jpg", "images/004-exp-empresa-9.jpg"],
            fullDescription: "<p class=\"exp-company\">Contrato de Mínima Cuantía (Consultoría) · NIT 770.290.069-4</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> Astrea, Cesar</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> 01/09/2024 – 30/10/2024 · 2 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Dimensionamiento y cálculo de cuantías de acero de refuerzo, con diseño bajo la norma NSR-10, para los muros perimetrales del cerramiento.</li><li>Cálculo de cantidades de obra.</li><li>Elaboración de APU y del presupuesto.</li><li>Trabajo en equipo con profesionales de otras áreas para consolidar la información.</li></ul><h4>Herramientas:</h4><p>Excel, Word, AutoCAD, Civil3D y NSR-10.</p>",
            formEnabled: false
        },
        9: {
            title: "Residente de Obra",
            images: ["images/001-exp-empresa-10.jpg", "images/002-exp-empresa-10.jpg", "images/003-exp-empresa-10.jpg", "images/004-exp-empresa-10.jpg"],
            fullDescription: "<p class=\"exp-company\">SETEC Servicios y Tecnologías del Caribe SAS · NIT 901.578.104 - 7</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> Nuevitas, Camaguey, Cuba</p><p class=\"exp-meta\"><i class=\"fas fa-hard-hat\"></i> Proyecto: Fases 9 y 10 Brownfield – Construcción y Montaje de Fábrica de Cementos 27 de julio</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> Fase 9: 29/11/2024 – 10/04/2025 · 4.4 meses</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> Fase 10: 17/07/2025 – 31/08/2025 · 1.5 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Supervisión diaria de las actividades ejecutadas por el personal directo y subcontratistas para cumplir la programación semanal.</li><li>Programación y seguimiento de concretos premezclados, topografía y liberaciones diarias.</li><li>Revisión de planos y especificaciones técnicas; solicitud de materiales y equipos requeridos.</li><li>Requerimientos de información de ingeniería y reporte del porcentaje de avance semanal por objetos tecnológicos.</li></ul><h4>Herramientas:</h4><p>Excel, Word, AutoCAD y Civil3D.</p>",
            formEnabled: false
        },
        10: {
            title: "Residente de Obra",
            images: ["images/001-exp-empresa-11.jpg", "images/002-exp-empresa-11.jpg", "images/003-exp-empresa-11.jpg", "images/004-exp-empresa-11.jpg"],
            fullDescription: "<p class=\"exp-company\">ISC Ingeniería &amp; Servicios del Caribe S.A.S. · NIT 901.550.144 - 1</p><p class=\"exp-meta\"><i class=\"fas fa-map-marker-alt\"></i> Nuevitas, Camaguey, Cuba</p><p class=\"exp-meta\"><i class=\"fas fa-hard-hat\"></i> Proyecto: Fases 11 y 12 Brownfield – Construcción y Montaje de Fábrica de Cementos 27 de julio</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> Fase 11: 01/09/2025 – 23/12/2025 · 3.8 meses</p><p class=\"exp-meta\"><i class=\"fas fa-calendar-alt\"></i> Fase 12: 24/12/2025 – 22/01/2026 · 1.0 meses</p><h4>Funciones y responsabilidades:</h4><ul><li>Supervisión diaria de las actividades ejecutadas por el personal directo y subcontratistas para cumplir la programación semanal.</li><li>Programación y seguimiento de concretos premezclados, topografía y liberaciones diarias.</li><li>Revisión de planos y especificaciones técnicas; solicitud de materiales y equipos requeridos.</li><li>Requerimientos de información de ingeniería y reporte del porcentaje de avance semanal por objetos tecnológicos.</li></ul><h4>Herramientas:</h4><p>Excel, Word, AutoCAD y Civil3D.</p>",
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

    const AUTOPLAY_MS = 3000; // tiempo entre fotos (3 segundos)
    const REDUCE_MOTION = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const CAN_HOVER = window.matchMedia('(hover: hover)').matches;

    function initSlider(slider) {
        if (!slider || slider.dataset.ready) return;
        slider.dataset.ready = 'true';

        // Si una foto aún no está en el servidor, muestra un aviso en lugar de una imagen rota
        slider.querySelectorAll('.slider-slide img').forEach(img => {
            const fail = () => img.parentElement.classList.add('no-photo');
            img.addEventListener('error', fail);
            if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) fail();
        });

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
            dot.addEventListener('click', () => { goTo(i); restart(); });
            dotsBox.appendChild(dot);
            dots.push(dot);
        });

        function goTo(i) {
            index = (i + total) % total;
            track.style.transform = `translateX(-${index * 100}%)`;
            dots.forEach((d, j) => d.classList.toggle('active', j === index));
        }

        prev.addEventListener('click', () => { goTo(index - 1); restart(); });
        next.addEventListener('click', () => { goTo(index + 1); restart(); });

        // Deslizar con el dedo en celular
        let startX = null;
        slider.addEventListener('touchstart', e => { startX = e.touches[0].clientX; }, { passive: true });
        slider.addEventListener('touchend', e => {
            if (startX === null) return;
            const dx = e.changedTouches[0].clientX - startX;
            if (Math.abs(dx) > 40) { goTo(index + (dx < 0 ? 1 : -1)); restart(); }
            startX = null;
        });

        // Flechas del teclado
        slider.addEventListener('keydown', e => {
            if (e.key === 'ArrowLeft') goTo(index - 1);
            if (e.key === 'ArrowRight') goTo(index + 1);
        });

        // Reproducción automática: pasa de foto cada 3 s mientras el cursor está encima
        let timer = null;
        function stop() { clearInterval(timer); timer = null; }
        function start() {
            if (timer || REDUCE_MOTION) return;
            timer = setInterval(() => {
                if (!slider.isConnected || slider.offsetParent === null) { stop(); return; }
                goTo(index + 1);
            }, AUTOPLAY_MS);
        }
        function restart() { if (timer) { stop(); start(); } }

        slider.addEventListener('mouseenter', start);
        slider.addEventListener('mouseleave', stop);
        slider.addEventListener('focusin', start);
        slider.addEventListener('focusout', stop);

        // En celulares (sin cursor) corre mientras el slider se ve en pantalla
        if (!CAN_HOVER && 'IntersectionObserver' in window) {
            new IntersectionObserver(entries => {
                entries.forEach(en => (en.isIntersecting ? start() : stop()));
            }, { threshold: 0.6 }).observe(slider);
        }

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
                if (service.images && service.images.length) {
                    modalContent += buildSliderHTML(service.images, service.title);
                } else if (service.image) {
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
                if (project.images && project.images.length) {
                    modalContent += buildSliderHTML(project.images, project.title);
                } else if (project.image) {
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
