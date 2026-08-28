// ============================================================
// MUEBLES MEDELLÍN
// Lógica de la página de detalle
// ============================================================

// ============================================================
// ESTADO GLOBAL DEL PRODUCTO (para WhatsApp y otras funciones)
// ============================================================
// FIX: La base del estado incluye correctamente 'view' y 'legType'
window.productState = {
    view: 'frontal',
    collectionName: '',
    collectionSlug: '',
    fabricName: '',
    fabricId: '',
    legType: 'Madera', // Valor por defecto con mayúscula
    originalImageSrc: null,
    selectedRenderUrl: null
};

// ============================================================
// MAPEO DE RENDERS DISPONIBLES (Corregido)
// ============================================================
const rendersDisponibles = {
    'sala-corona-capitoneada': {
        'Suiza': {
            'Blanco': { 'Madera': '/images/productos/sala-corona-capitoneada/suiza/muestra-01.webp' },
            'Beige': { 'Madera': '/images/productos/sala-corona-capitoneada/suiza/muestra-02.webp' },
            'Gris claro': { 'Madera': '/images/productos/sala-corona-capitoneada/suiza/muestra-03.webp' },
            'Gris oscuro': { 'Madera': '/images/productos/sala-corona-capitoneada/suiza/muestra-04.webp' },
            'Negro': { 'Madera': '/images/productos/sala-corona-capitoneada/suiza/muestra-05.webp' }
        }
    },
    'sala-click-clack-jumbo-completa': {
        'Boreal': {
            'Lila Sutil': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/madera/muestra-01.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/aluminio/muestra-01.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/plastico/muestra-01.webp'
            },
            'Niebla Grisal': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/madera/muestra-02.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/aluminio/muestra-02.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/plastico/muestra-02.webp'
            },
            'Mármol Arena': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/madera/muestra-03.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/aluminio/muestra-03.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/plastico/muestra-03.webp'
            },
            'Rojo Borgoña': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/madera/muestra-04.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/aluminio/muestra-04.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/plastico/muestra-04.webp'
            },
            'Violeta Púrpura': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/madera/muestra-05.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/aluminio/muestra-05.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/plastico/muestra-05.webp'
            },
            'Azul Cobalto Profundo': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/madera/muestra-06.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/aluminio/muestra-06.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/plastico/muestra-06.webp'
            },
            'Lino Pétreo': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/madera/muestra-07.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/aluminio/muestra-07.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/plastico/muestra-07.webp'
            },
            'Mármol Ahumado': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/madera/muestra-08.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/aluminio/muestra-08.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/plastico/muestra-08.webp'
            },
            'Ópalo Profundo': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/madera/muestra-09.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/aluminio/muestra-09.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/boreal/patas/plastico/muestra-09.webp'
            }
        },
        'Suiza': {
            // Suiza se queda así, apuntando a la misma imagen para los 3 tipos de patas, 
            // ya que en tu árbol de archivos no hay subcarpetas de patas para Suiza. 
            // Esto evita que la imagen se rompa si el usuario cambia la pata mientras ve Suiza.
            'Blanco': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-01.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-01.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-01.webp'
            },
            'Beige': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-02.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-02.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-02.webp'
            },
            'Gris claro': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-03.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-03.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-03.webp'
            },
            'Gris oscuro': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-04.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-04.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-04.webp'
            },
            'Negro': {
                'Madera': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-05.webp',
                'Aluminio': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-05.webp',
                'Plástico': '/images/productos/sala-click-clack-jumbo-completa/suiza/muestra-05.webp'
            }
        }
    }
};

// ============================================================
// FUNCIÓN PARA OBTENER URL DEL RENDER 
// ============================================================
function obtenerRenderUrl(productoSlug, coleccionNombre, fabricName, legType) {
    if (!productoSlug || !coleccionNombre || !fabricName || !legType) return null;
    const productoRenders = rendersDisponibles[productoSlug];
    if (!productoRenders) return null;
    const coleccionRenders = productoRenders[coleccionNombre];
    if (!coleccionRenders) return null;
    const telaRenders = coleccionRenders[fabricName];
    if (!telaRenders) return null;
    return telaRenders[legType] || null;
}

// ============================================================
// FUNCIÓN PARA ACTUALIZAR LA IMAGEN PRINCIPAL
// ============================================================
function actualizarImagenPrincipal(nuevaUrl) {
    const avisoDesarrollo = document.getElementById('aviso-render-desarrollo');

    if (nuevaUrl) {
        window.productState.selectedRenderUrl = nuevaUrl;
        if (avisoDesarrollo) avisoDesarrollo.classList.add('hidden');
        
        // FIX 2: Para que la configuración se refleje sin pisarse con la galería,
        // forzamos a la galería a ir al índice 0 (Frontal), lo cual pintará el render.
        if (typeof window.updateGallery === 'function') {
            window.updateGallery(0); 
        }
    } else {
        // FIX 3: El fallback limpia la URL seleccionada para que el estado no quede corrupto
        window.productState.selectedRenderUrl = null;
        if (avisoDesarrollo) avisoDesarrollo.classList.remove('hidden');
    }
}

// ============================================================
// ACTUALIZAR ENLACE DE WHATSAPP CON SELECCIÓN ACTUAL
// ============================================================
// FIX 1: Se mantiene el oficial integrando las patas en el mensaje final.
function actualizarWhatsApp() {
    const whatsappLink = document.getElementById('product-whatsapp');
    if (!whatsappLink) return;

    const productName = document.getElementById('product-name')?.textContent?.trim() || 'Producto';
    const coleccion = window.productState.collectionName || '';
    const tela = window.productState.fabricName || '';
    const patas = window.productState.legType || 'Madera';

    let mensaje = `Hola, quisiera cotizar el producto: ${productName}`;
    if (coleccion) mensaje += `\n• Colección: ${coleccion}`;
    if (tela) mensaje += `\n• Tela: ${tela}`;
    mensaje += `\n• Patas: ${patas}`;
    
    mensaje += `\n\nVer producto: ${window.location.href}`;
    whatsappLink.href = `https://wa.me/573000000000?text=${encodeURIComponent(mensaje)}`;
}

// ============================================================
// 1. GALERÍA DEL PRODUCTO (vistas: frontal, lateral, trasera)
// ============================================================
function initProductGallery() {
    const dataContainer = document.getElementById('product-data');
    const mainImage = document.getElementById('imagen-principal');
    const thumbs = document.querySelectorAll('.thumb-btn');
    const btnPrev = document.getElementById('btn-prev');
    const btnNext = document.getElementById('btn-next');

    if (!dataContainer || !mainImage) return;

    let vistas = [];
    try {
        const parsed = JSON.parse(dataContainer.dataset.images);
        if (Array.isArray(parsed) && parsed.length > 0) {
            vistas = parsed.filter(v => v && typeof v.imagen === 'string' && v.imagen.length > 0);
        }
    } catch (error) {
        console.error('Error inicializando galería:', error);
    }

    if (vistas.length === 0) {
        const fallback = mainImage.getAttribute('src');
        if (!fallback) return;
        vistas = [
            { nombre: 'Frontal', imagen: fallback },
            { nombre: 'Lateral derecha', imagen: fallback },
            { nombre: 'Lateral izquierda', imagen: fallback },
            { nombre: 'Trasera', imagen: fallback }
        ];
    }

    const nombres = ['Frontal', 'Lateral derecha', 'Lateral izquierda', 'Trasera'];
    while (vistas.length < 4) {
        const base = vistas[0] || { imagen: mainImage.src };
        vistas.push({
            nombre: nombres[vistas.length] || `Vista ${vistas.length + 1}`,
            imagen: base.imagen
        });
    }

    let currentIndex = 0;

    function updateGallery(newIndex) {
        if (newIndex < 0) newIndex = vistas.length - 1;
        if (newIndex >= vistas.length) newIndex = 0;
        currentIndex = newIndex;
        const vistaActual = vistas[currentIndex];
        
        // FIX 2: Separar explícitamente "vista" de "configuración"
        if (vistaActual && vistaActual.nombre) {
            window.productState.view = vistaActual.nombre.toLowerCase();
        }

        let urlToShow = vistaActual ? vistaActual.imagen : null;

        // Si la vista es "frontal" y hay una configuración seleccionada válida, mostramos el render
        if (window.productState.view === 'frontal' && window.productState.selectedRenderUrl) {
            urlToShow = window.productState.selectedRenderUrl;
        }

        if (urlToShow) {
            mainImage.classList.remove('fade-in');
            void mainImage.offsetWidth;
            mainImage.src = urlToShow;
            mainImage.classList.add('fade-in');
        }
        
        thumbs.forEach((btn, idx) => {
            const isActive = idx === currentIndex;
            btn.classList.toggle('border-stone-800', isActive);
            btn.classList.toggle('border-transparent', !isActive);
            btn.setAttribute('aria-current', isActive ? 'true' : 'false');
        });
    }

    thumbs.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const idx = parseInt(e.currentTarget.dataset.index, 10);
            if (!isNaN(idx)) updateGallery(idx);
        });
    });

    if (btnPrev) btnPrev.addEventListener('click', () => updateGallery(currentIndex - 1));
    if (btnNext) btnNext.addEventListener('click', () => updateGallery(currentIndex + 1));

    let touchStartX = 0, touchStartY = 0, touchEndX = 0, touchEndY = 0;
    const SWIPE_THRESHOLD = 50;

    mainImage.addEventListener('touchstart', (e) => {
        const touch = e.changedTouches[0];
        touchStartX = touch.clientX;
        touchStartY = touch.clientY;
    }, { passive: true });

    mainImage.addEventListener('touchend', (e) => {
        const touch = e.changedTouches[0];
        touchEndX = touch.clientX;
        touchEndY = touch.clientY;
        const deltaX = touchEndX - touchStartX;
        const deltaY = touchEndY - touchStartY;
        if (Math.abs(deltaX) >= SWIPE_THRESHOLD && Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX < 0) updateGallery(currentIndex + 1);
            else updateGallery(currentIndex - 1);
        }
    }, { passive: true });

    updateGallery(0);
    window.updateGallery = updateGallery;
}

// ============================================================
// 2. SELECTOR DE COLECCIONES (ganchitos en el panel lateral)
// ============================================================
function initColeccionSelector() {
    const dataContainer = document.getElementById('product-data');
    if (!dataContainer) return;

    const productSlug = dataContainer.dataset.productSlug || null; // Necesario para filtrar
    let colecciones = [];
    try {
        colecciones = JSON.parse(dataContainer.dataset.colecciones || '[]');
    } catch (e) {
        console.error('Error al parsear colecciones:', e);
        return;
    }

    window._colecciones = colecciones;

    const coleccionSelectors = document.querySelectorAll('.coleccion-selector');
    const modal = document.getElementById('modal-catalogo');

    if (!coleccionSelectors.length || !modal) return;

    function abrirModalDirecto() {
        modal.classList.remove('hidden');
        void modal.offsetWidth;
        modal.classList.remove('opacity-0');
        const panel = modal.querySelector('.bg-white');
        if (panel) panel.classList.remove('scale-95');
    }

    coleccionSelectors.forEach(btn => {
        btn.addEventListener('click', function() {
            const nombre = this.dataset.coleccionNombre;
            const slug = this.dataset.coleccionSlug;

            window.productState.collectionName = nombre;
            window.productState.collectionSlug = slug;

            const titulo = document.getElementById('modal-titulo');
            if (titulo) titulo.textContent = `Catálogo: ${nombre}`;
            const subtitulo = document.getElementById('modal-subtitulo');
            if (subtitulo) subtitulo.textContent = `Colección: ${nombre}`;

            // FIX 6: Filtrar colecciones por producto. Buscamos el slug PERO asegurando 
            // que si hay una llave "producto_slug", corresponda a la de este producto.
            let coleccionData = colecciones.find(c => 
                c.slug === slug && 
                (!c.producto_slug || c.producto_slug === productSlug)
            );

            if (coleccionData && coleccionData.variantes && coleccionData.variantes.length > 0) {
                llenarModalConTelas(coleccionData.variantes);
            } else {
                const grid = document.getElementById('modal-telas-grid');
                const sinTelas = document.getElementById('modal-sin-telas');
                if (grid) grid.replaceChildren();
                if (sinTelas) sinTelas.classList.remove('hidden');
            }

            abrirModalDirecto();
        });
    });
}

// ============================================================
// 3. LLENAR MODAL CON TELAS (versión SIN innerHTML)
// ============================================================
function llenarModalConTelas(variantes) {
    const container = document.getElementById('modal-telas-grid');
    const sinTelas = document.getElementById('modal-sin-telas');
    if (!container) return;

    if (sinTelas) sinTelas.classList.add('hidden');
    container.replaceChildren();

    variantes.forEach((variante, index) => {
        const tarjeta = document.createElement('button');
        tarjeta.type = 'button';
        tarjeta.className = 'fabric-card group relative aspect-square rounded-xl overflow-hidden border-2 border-stone-200 hover:border-stone-900 transition-all shadow-sm flex flex-col justify-end p-3 text-left';

        tarjeta.dataset.fabricId = variante.id || `variante-${index}`;
        tarjeta.dataset.fabricName = variante.nombre;

        const imgWrapper = document.createElement('div');
        imgWrapper.className = 'absolute inset-0';

        const img = document.createElement('img');
        img.src = variante.imagen_recorte || '/images/placeholder.webp';
        img.alt = variante.nombre;
        img.className = 'w-full h-full object-cover group-hover:scale-110 transition duration-500';
        imgWrapper.appendChild(img);

        const overlay = document.createElement('div');
        overlay.className = 'absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80 group-hover:opacity-90 transition';

        const nombreSpan = document.createElement('span');
        nombreSpan.className = 'relative z-10 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm self-start shadow-sm';
        nombreSpan.textContent = variante.nombre;

        tarjeta.appendChild(imgWrapper);
        tarjeta.appendChild(overlay);
        tarjeta.appendChild(nombreSpan);

        tarjeta.addEventListener('click', function() {
            const nombre = this.dataset.fabricName;
            const fabricId = this.dataset.fabricId;

            window.productState.fabricName = nombre;
            window.productState.fabricId = fabricId;

            const telaSpan = document.getElementById('tela-seleccionada');
            if (telaSpan) telaSpan.textContent = nombre;

            const coleccionSpan = document.getElementById('coleccion-seleccionada');
            if (coleccionSpan && window.productState.collectionName) {
                coleccionSpan.textContent = window.productState.collectionName;
            }

            actualizarWhatsApp();

            const dataContainer = document.getElementById('product-data');
            const productSlug = dataContainer ? dataContainer.dataset.productSlug : null;
            const coleccionNombre = window.productState.collectionName || 'Suiza';
            const tipoPata = window.productState.legType; 

            const renderUrl = obtenerRenderUrl(productSlug, coleccionNombre, nombre, tipoPata);
            actualizarImagenPrincipal(renderUrl);

            const btnCerrar = document.getElementById('btn-cerrar-modal');
            if (btnCerrar) btnCerrar.click();
        });

        container.appendChild(tarjeta);
    });
}

// ============================================================
// 4. MODAL DE VISTA PREVIA (apertura/cierre)
// ============================================================
function initFabricModal() {
    const modal = document.getElementById('modal-catalogo');
    const btnCerrar = document.getElementById('btn-cerrar-modal');

    if (!modal) return;

    function cerrarModal() {
        const panel = modal.querySelector('.bg-white');
        if (panel) panel.classList.add('scale-95');
        modal.classList.add('opacity-0');
        setTimeout(() => {
            modal.classList.add('hidden');
        }, 300);
    }

    if (btnCerrar) btnCerrar.addEventListener('click', cerrarModal);
    modal.addEventListener('click', function(e) {
        if (e.target === this) cerrarModal();
    });
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && !modal.classList.contains('hidden')) cerrarModal();
    });
    window.cerrarModalGlobal = cerrarModal;
}

// ============================================================
// 5. CARRUSEL DE PRODUCTOS SIMILARES
// ============================================================
function initRelatedProductsCarousel() {
    const track = document.getElementById('relacionados-track');
    const items = document.querySelectorAll('.relacionado-item');
    const prevBtn = document.getElementById('rel-prev');
    const nextBtn = document.getElementById('rel-next');
    const indicatorsContainer = document.getElementById('rel-indicadores');

    if (!track || items.length === 0) return;

    function getItemsPerView() {
        if (window.innerWidth >= 1024) return 4;
        if (window.innerWidth >= 768) return 2;
        return 1;
    }

    let currentPage = 0;
    let itemsPerView = getItemsPerView();
    // FIX 5: Se cambia const por let para poder actualizarlo en el resize
    let totalPages = Math.max(1, Math.ceil(items.length / itemsPerView)); 

    function updateCarousel() {
        if (currentPage >= totalPages) currentPage = totalPages - 1;
        if (currentPage < 0) currentPage = 0;

        const offset = -currentPage * (100 / itemsPerView);
        track.style.transform = `translateX(${offset}%)`;

        if (indicatorsContainer) {
            const dots = indicatorsContainer.querySelectorAll('.dot');
            dots.forEach((dot, idx) => {
                dot.classList.toggle('bg-stone-800', idx === currentPage);
                dot.classList.toggle('bg-stone-300', idx !== currentPage);
            });
        }
    }

    function goToPage(page) {
        if (page < 0) page = totalPages - 1;
        if (page >= totalPages) page = 0;
        currentPage = page;
        updateCarousel();
    }

    // Función auxiliar para construir indicadores y evitar redundancia
    function buildIndicators() {
        if (!indicatorsContainer) return;
        // FIX 4: Adiós al innerHTML = ''
        indicatorsContainer.replaceChildren(); 
        for (let i = 0; i < totalPages; i++) {
            const dot = document.createElement('button');
            dot.className = `dot w-2 h-2 rounded-full transition ${i === currentPage ? 'bg-stone-800' : 'bg-stone-300'}`;
            dot.setAttribute('aria-label', `Ir a página ${i + 1}`);
            dot.addEventListener('click', () => goToPage(i));
            indicatorsContainer.appendChild(dot);
        }
    }

    if (totalPages > 1) {
        buildIndicators();
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goToPage(currentPage - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goToPage(currentPage + 1));

    let startX = 0;
    let isDragging = false;
    track.addEventListener('touchstart', (e) => {
        startX = e.touches[0].clientX;
        isDragging = true;
    }, { passive: true });

    track.addEventListener('touchend', (e) => {
        if (!isDragging) return;
        const diff = startX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) goToPage(currentPage + 1);
            else goToPage(currentPage - 1);
        }
        isDragging = false;
    }, { passive: true });

    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => {
            const newItemsPerView = getItemsPerView();
            if (newItemsPerView !== itemsPerView) {
                itemsPerView = newItemsPerView;
                
                // FIX 5: Ahora sí reasignamos el totalPages real del scope
                totalPages = Math.max(1, Math.ceil(items.length / itemsPerView)); 
                
                if (currentPage >= totalPages) currentPage = totalPages - 1;
                
                buildIndicators(); // FIX 4: Se vuelve a usar replaceChildren
                updateCarousel();
            }
        }, 200);
    });

    updateCarousel();
}

// ============================================================
// 6. SELECTOR DE PATAS (NUEVO)
// ============================================================

function initLegSelector() {
    const legInputs = document.querySelectorAll('input[name="pata"]');
    if (!legInputs.length) return;

    // Mapeo de valores de los radio buttons a las claves del mapeo (con mayúscula inicial)
    const legMap = {
        'madera': 'Madera',
        'aluminio': 'Aluminio',
        'plastico': 'Plástico'
    };

    legInputs.forEach(input => {
        input.addEventListener('change', function() {
            // Convertir el valor del radio a la clave correcta (con mayúscula)
            const legTypeKey = legMap[this.value] || this.value;
            window.productState.legType = legTypeKey;

            // Obtener el slug del producto
            const dataContainer = document.getElementById('product-data');
            const productSlug = dataContainer ? dataContainer.dataset.productSlug : null;

            // Obtener colección y tela actuales
            const coleccionNombre = window.productState.collectionName || 'Suiza';
            const fabricName = window.productState.fabricName;

            // Si hay una tela seleccionada, actualizar la imagen
            if (fabricName) {
                const renderUrl = obtenerRenderUrl(productSlug, coleccionNombre, fabricName, window.productState.legType);
                actualizarImagenPrincipal(renderUrl);
            }

            // Actualizar el enlace de WhatsApp
            actualizarWhatsApp();
        });
    });
}

// ============================================================
// INICIALIZACIÓN
// ============================================================
document.addEventListener('DOMContentLoaded', () => {
    const imgPrincipal = document.getElementById('imagen-principal');
    if (imgPrincipal) {
        window.productState.originalImageSrc = imgPrincipal.src;
    }

    actualizarWhatsApp();
    initProductGallery();
    initColeccionSelector();
    initFabricModal();
    initRelatedProductsCarousel();
    initLegSelector(); // <--- SELECTOR DE PATAS AGREGADO
});