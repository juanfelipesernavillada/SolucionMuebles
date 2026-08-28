// ============================================================
// MUEBLES & DECORACIONES
// Portfolio Demo - Configurador visual
// ============================================================

'use strict';


// ============================================================
// ESTADO
// ============================================================

const state = {
    catalogo: null,

    producto: null,

    coleccion: '',
    tela: '',
    pata: 'Madera',

    vista: 0,

    imagenPrincipal: '',

    modalAbierto: false
};


// ============================================================
// ELEMENTOS DEL DOM
// ============================================================

const elements = {
    productName: document.getElementById('product-name'),

    mainImage: document.getElementById('imagen-principal'),

    thumbnails: document.querySelectorAll('.thumb-btn'),

    prevButton: document.getElementById('btn-prev'),
    nextButton: document.getElementById('btn-next'),

    collectionsContainer:
        document.getElementById('colecciones-container'),

    selectedCollection:
        document.getElementById('coleccion-seleccionada'),

    selectedFabric:
        document.getElementById('tela-seleccionada'),

    selectedLeg:
        document.getElementById('pata-seleccionada'),

    legRadios:
        document.querySelectorAll('input[name="pata"]'),

    measureSofa:
        document.getElementById('medida-sofa'),

    measureChairs:
        document.getElementById('medida-sillas'),

    whatsapp:
        document.getElementById('product-whatsapp'),

    modalOverlay:
        document.getElementById('modal-overlay'),

    modal:
        document.getElementById('modal-catalogo'),

    modalTitle:
        document.getElementById('modal-titulo'),

    modalSubtitle:
        document.getElementById('modal-subtitulo'),

    modalGrid:
        document.getElementById('modal-telas-grid'),

    modalEmpty:
        document.getElementById('modal-sin-telas'),

    modalClose:
        document.getElementById('btn-cerrar-modal')
};


// ============================================================
// CONSTANTES
// ============================================================

const LEG_MAP = {
    madera: 'Madera',
    aluminio: 'Aluminio',
    plastico: 'Plástico'
};


const GALLERY_VIEWS = [
    'Frontal',
    'Lateral derecha',
    'Lateral izquierda',
    'Trasera'
];


const DEFAULT_IMAGE =
    'images/productos/sala-click-clack-jumbo-completa/principal.webp';


// ============================================================
// CARGAR JSON
// ============================================================

async function loadCatalog() {

    try {

        const response = await fetch('./data/catalogo.json', {
            cache: 'no-store'
        });

        if (!response.ok) {
            throw new Error(
                `No se pudo cargar catalogo.json (${response.status})`
            );
        }

        state.catalogo = await response.json();

        validarCatalogo();

        inicializarProducto();

    } catch (error) {

        console.error('Error cargando catálogo:', error);

        mostrarErrorCarga();

    }

}


// ============================================================
// VALIDACIÓN BÁSICA
// ============================================================

function validarCatalogo() {

    if (!state.catalogo) {
        throw new Error('El catálogo está vacío.');
    }

    if (!state.catalogo.producto) {
        throw new Error(
            'Falta "producto" en catalogo.json.'
        );
    }

    if (!Array.isArray(state.catalogo.colecciones)) {
        throw new Error(
            'Falta "colecciones" en catalogo.json.'
        );
    }

}


// ============================================================
// INICIALIZAR PRODUCTO
// ============================================================

function inicializarProducto() {

    state.producto = state.catalogo.producto;

    // --------------------------------------------------------
    // Nombre
    // --------------------------------------------------------

    if (elements.productName) {
        elements.productName.textContent =
            state.producto.nombre || 'Producto';
    }


    // --------------------------------------------------------
    // Imagen principal
    // --------------------------------------------------------

    const imagen =
        state.producto.imagen_principal || DEFAULT_IMAGE;

    state.imagenPrincipal = imagen;

    if (elements.mainImage) {
        elements.mainImage.src = imagen;
        elements.mainImage.alt =
            state.producto.nombre || 'Producto';
    }


    // --------------------------------------------------------
    // Medidas
    // --------------------------------------------------------

    actualizarMedidas();


    // --------------------------------------------------------
    // Colecciones
    // --------------------------------------------------------

    renderizarColecciones();


    // --------------------------------------------------------
    // Patas
    // --------------------------------------------------------

    inicializarPatas();


    // --------------------------------------------------------
    // Galería
    // --------------------------------------------------------

    inicializarGaleria();


    // --------------------------------------------------------
    // WhatsApp
    // --------------------------------------------------------

    actualizarWhatsApp();


    // --------------------------------------------------------
    // Interacciones del modal
    // --------------------------------------------------------

    inicializarModal();

}


// ============================================================
// MEDIDAS
// ============================================================

function actualizarMedidas() {

    const medidas =
        state.producto.medidas ||
        state.producto.medidas_estructuradas ||
        {};


    if (elements.measureSofa) {

        elements.measureSofa.textContent =
            obtenerMedida(
                medidas,
                [
                    'Largo del Sofá',
                    'largo del sofá',
                    'sofa',
                    'Largo sofa'
                ]
            );

    }


    if (elements.measureChairs) {

        elements.measureChairs.textContent =
            obtenerMedida(
                medidas,
                [
                    'Ancho de las Sillas',
                    'ancho de las sillas',
                    'sillas',
                    'Ancho sillas'
                ]
            );

    }

}


function obtenerMedida(objeto, posiblesClaves) {

    if (!objeto || typeof objeto !== 'object') {
        return '—';
    }

    for (const clave of posiblesClaves) {

        if (
            Object.prototype.hasOwnProperty.call(
                objeto,
                clave
            )
        ) {

            return objeto[clave];

        }

    }

    return '—';

}


// ============================================================
// RENDERIZAR COLECCIONES
// ============================================================

function renderizarColecciones() {

    if (!elements.collectionsContainer) {
        return;
    }

    elements.collectionsContainer.replaceChildren();


    const colecciones =
        state.catalogo.colecciones || [];


    colecciones.forEach(coleccion => {

        if (
            !coleccion ||
            !Array.isArray(coleccion.variantes) ||
            coleccion.variantes.length === 0
        ) {
            return;
        }


        const button =
            document.createElement('button');

        button.type = 'button';


        button.className =
            'coleccion-selector group relative w-full h-20 rounded-t-full rounded-b-lg shadow-sm hover:shadow-md transition-all flex flex-col items-center justify-end p-2 hover:-translate-y-1 border border-stone-300 hover:border-stone-900 bg-stone-100 overflow-visible';


        button.dataset.collectionId =
            coleccion.id || '';

        button.dataset.collectionName =
            coleccion.nombre || '';

        button.dataset.collectionSlug =
            coleccion.slug || '';


        // ----------------------------------------------------
        // Gancho
        // ----------------------------------------------------

        const gancho =
            document.createElement('span');

        gancho.className =
            'absolute -top-2.5 left-1/2 -translate-x-1/2 w-5 h-5 rounded-full border-2 border-stone-400 bg-white shadow-sm z-20';


        button.appendChild(gancho);


        // ----------------------------------------------------
        // Imagen de muestra
        // ----------------------------------------------------

        const imageContainer =
            document.createElement('div');

        imageContainer.className =
            'absolute inset-0 rounded-t-full rounded-b-lg overflow-hidden';


        const image =
            document.createElement('img');

        image.src =
            coleccion.variantes[0].imagen_recorte ||
            DEFAULT_IMAGE;

        image.alt =
            coleccion.nombre || 'Colección';

        image.className =
            'w-full h-full object-cover opacity-75 group-hover:opacity-100 transition';


        imageContainer.appendChild(image);

        button.appendChild(imageContainer);


        // ----------------------------------------------------
        // Nombre
        // ----------------------------------------------------

        const name =
            document.createElement('span');

        name.className =
            'relative z-10 bg-black/60 text-white text-[10px] sm:text-xs font-medium px-2 py-1 rounded-full backdrop-blur-sm truncate max-w-full';


        name.textContent =
            coleccion.nombre || 'Colección';


        button.appendChild(name);


        // ----------------------------------------------------
        // Evento
        // ----------------------------------------------------

        button.addEventListener('click', () => {

            abrirColeccion(
                coleccion.slug
            );

        });


        elements.collectionsContainer.appendChild(button);

    });

}


// ============================================================
// ABRIR COLECCIÓN
// ============================================================

function abrirColeccion(slug) {

    const coleccion =
        state.catalogo.colecciones.find(
            item => item.slug === slug
        );


    if (!coleccion) {
        return;
    }


    state.coleccion =
        coleccion.nombre || '';


    // --------------------------------------------------------
    // Actualizar resumen
    // --------------------------------------------------------

    if (elements.selectedCollection) {

        elements.selectedCollection.textContent =
            state.coleccion;

    }


    // --------------------------------------------------------
    // Título modal
    // --------------------------------------------------------

    if (elements.modalTitle) {

        elements.modalTitle.textContent =
            `Catálogo: ${coleccion.nombre}`;

    }


    if (elements.modalSubtitle) {

        elements.modalSubtitle.textContent =
            `Selecciona una tela de la colección ${coleccion.nombre}`;

    }


    // --------------------------------------------------------
    // Crear tarjetas
    // --------------------------------------------------------

    renderizarTelas(coleccion.variantes || []);


    // --------------------------------------------------------
    // Abrir
    // --------------------------------------------------------

    abrirModal();

}


// ============================================================
// RENDERIZAR TELAS
// ============================================================

function renderizarTelas(variantes) {

    if (!elements.modalGrid) {
        return;
    }


    elements.modalGrid.replaceChildren();


    if (elements.modalEmpty) {
        elements.modalEmpty.classList.toggle(
            'hidden',
            variantes.length > 0
        );
    }


    variantes.forEach((variante, index) => {

        const card =
            document.createElement('button');

        card.type = 'button';


        card.className =
            'fabric-card group relative aspect-square rounded-xl overflow-hidden border-2 border-stone-200 hover:border-stone-900 transition-all shadow-sm flex flex-col justify-end p-3 text-left';


        card.dataset.fabricId =
            variante.id || `fabric-${index}`;

        card.dataset.fabricName =
            variante.nombre || `Tela ${index + 1}`;


        // ----------------------------------------------------
        // Imagen
        // ----------------------------------------------------

        const wrapper =
            document.createElement('div');

        wrapper.className =
            'absolute inset-0';


        const image =
            document.createElement('img');

        image.src =
            variante.imagen_recorte ||
            DEFAULT_IMAGE;

        image.alt =
            variante.nombre || 'Tela';

        image.className =
            'w-full h-full object-cover group-hover:scale-110 transition duration-500';


        wrapper.appendChild(image);

        card.appendChild(wrapper);


        // ----------------------------------------------------
        // Overlay
        // ----------------------------------------------------

        const overlay =
            document.createElement('div');

        overlay.className =
            'absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent opacity-80';


        card.appendChild(overlay);


        // ----------------------------------------------------
        // Nombre
        // ----------------------------------------------------

        const name =
            document.createElement('span');

        name.className =
            'relative z-10 bg-black/60 text-white text-xs font-medium px-3 py-1.5 rounded-full backdrop-blur-sm self-start shadow-sm';


        name.textContent =
            variante.nombre || 'Tela';


        card.appendChild(name);


        // ----------------------------------------------------
        // Estado seleccionado
        // ----------------------------------------------------

        if (
            state.tela &&
            state.tela === variante.nombre
        ) {

            card.classList.add(
                'border-stone-900',
                'ring-2',
                'ring-stone-900'
            );

        }


        // ----------------------------------------------------
        // Click
        // ----------------------------------------------------

        card.addEventListener('click', () => {

            seleccionarTela(
                variante
            );

        });


        elements.modalGrid.appendChild(card);

    });

}


// ============================================================
// SELECCIONAR TELA
// ============================================================

function seleccionarTela(variante) {

    state.tela =
        variante.nombre || '';


    // --------------------------------------------------------
    // Resumen
    // --------------------------------------------------------

    if (elements.selectedFabric) {

        elements.selectedFabric.textContent =
            state.tela;

    }


    // --------------------------------------------------------
    // Actualizar render
    // --------------------------------------------------------

    actualizarRender();


    // --------------------------------------------------------
    // WhatsApp
    // --------------------------------------------------------

    actualizarWhatsApp();


    // --------------------------------------------------------
    // Cerrar modal
    // --------------------------------------------------------

    cerrarModal();

}


// ============================================================
// INICIALIZAR PATAS
// ============================================================

function inicializarPatas() {

    elements.legRadios.forEach(radio => {

        radio.addEventListener('change', () => {

            const pata =
                LEG_MAP[radio.value] ||
                radio.value;


            state.pata = pata;


            if (elements.selectedLeg) {

                elements.selectedLeg.textContent =
                    pata;

            }


            actualizarRender();

            actualizarWhatsApp();

        });

    });


    // Estado inicial

    if (elements.selectedLeg) {

        elements.selectedLeg.textContent =
            state.pata;

    }

}


// ============================================================
// RESOLVER RENDER
// ============================================================

function obtenerRenderUrl() {

    if (
        !state.catalogo ||
        !state.producto ||
        !state.coleccion ||
        !state.tela ||
        !state.pata
    ) {
        return null;
    }


    const renders =
        state.catalogo.renders;


    if (!renders) {
        return null;
    }


    const productoRenders =
        renders[state.producto.slug];


    if (!productoRenders) {
        return null;
    }


    const coleccionRenders =
        productoRenders[state.coleccion];


    if (!coleccionRenders) {
        return null;
    }


    const telaRenders =
        coleccionRenders[state.tela];


    if (!telaRenders) {
        return null;
    }


    return telaRenders[state.pata] || null;

}


// ============================================================
// ACTUALIZAR RENDER
// ============================================================

function actualizarRender() {

    if (!elements.mainImage) {
        return;
    }


    const renderUrl =
        obtenerRenderUrl();


    if (renderUrl) {

        cargarImagenPrincipal(renderUrl);

    } else {

        // ----------------------------------------------------
        // Todavía no existe ese render.
        // Volvemos a la imagen neutra.
        // ----------------------------------------------------

        cargarImagenPrincipal(
            state.imagenPrincipal
        );

    }

}


// ============================================================
// CARGAR IMAGEN PRINCIPAL
// ============================================================

function cargarImagenPrincipal(url) {

    if (!url || !elements.mainImage) {
        return;
    }


    elements.mainImage.classList.remove(
        'fade-in'
    );


    void elements.mainImage.offsetWidth;


    elements.mainImage.src =
        url;


    elements.mainImage.classList.add(
        'fade-in'
    );

}


// ============================================================
// GALERÍA
// ============================================================

function inicializarGaleria() {

    elements.thumbnails.forEach(thumbnail => {

        thumbnail.addEventListener('click', () => {

            const index =
                Number(
                    thumbnail.dataset.viewIndex
                );


            if (
                Number.isNaN(index)
            ) {
                return;
            }


            cambiarVista(index);

        });

    });


    if (elements.prevButton) {

        elements.prevButton.addEventListener(
            'click',
            () => {

                cambiarVista(
                    state.vista - 1
                );

            }
        );

    }


    if (elements.nextButton) {

        elements.nextButton.addEventListener(
            'click',
            () => {

                cambiarVista(
                    state.vista + 1
                );

            }
        );

    }


    // --------------------------------------------------------
    // Swipe
    // --------------------------------------------------------

    inicializarSwipe();


    cambiarVista(0);

}


// ============================================================
// CAMBIAR VISTA
// ============================================================

function cambiarVista(index) {

    const total =
        GALLERY_VIEWS.length;


    if (index < 0) {
        index = total - 1;
    }


    if (index >= total) {
        index = 0;
    }


    state.vista = index;


    // --------------------------------------------------------
    // En esta demo las cuatro vistas usan la misma imagen
    // neutra.
    //
    // Si en el futuro existen vistas reales, aquí se podrá
    // ampliar el dataset.
    // --------------------------------------------------------

    cargarImagenPrincipal(
        state.imagenPrincipal
    );


    // --------------------------------------------------------
    // Actualizar miniaturas
    // --------------------------------------------------------

    elements.thumbnails.forEach(
        (thumbnail, thumbnailIndex) => {

            const active =
                thumbnailIndex === index;


            thumbnail.classList.toggle(
                'border-stone-800',
                active
            );


            thumbnail.classList.toggle(
                'border-transparent',
                !active
            );


            thumbnail.setAttribute(
                'aria-current',
                active
                    ? 'true'
                    : 'false'
            );

        }
    );


    // --------------------------------------------------------
    // Si estamos en frontal, restaurar el render configurado.
    // --------------------------------------------------------

    if (index === 0) {

        actualizarRender();

    }

}


// ============================================================
// SWIPE
// ============================================================

function inicializarSwipe() {

    if (!elements.mainImage) {
        return;
    }


    let startX = 0;
    let startY = 0;


    elements.mainImage.addEventListener(
        'touchstart',
        event => {

            const touch =
                event.changedTouches[0];

            startX =
                touch.clientX;

            startY =
                touch.clientY;

        },
        {
            passive: true
        }
    );


    elements.mainImage.addEventListener(
        'touchend',
        event => {

            const touch =
                event.changedTouches[0];


            const deltaX =
                touch.clientX - startX;

            const deltaY =
                touch.clientY - startY;


            const threshold = 50;


            if (
                Math.abs(deltaX) >= threshold &&
                Math.abs(deltaX) > Math.abs(deltaY)
            ) {

                if (deltaX < 0) {

                    cambiarVista(
                        state.vista + 1
                    );

                } else {

                    cambiarVista(
                        state.vista - 1
                    );

                }

            }

        },
        {
            passive: true
        }
    );

}


// ============================================================
// MODAL
// ============================================================

function inicializarModal() {

    if (
        !elements.modalOverlay ||
        !elements.modal
    ) {
        return;
    }


    if (elements.modalClose) {

        elements.modalClose.addEventListener(
            'click',
            cerrarModal
        );

    }


    elements.modalOverlay.addEventListener(
        'click',
        event => {

            if (
                event.target ===
                elements.modalOverlay
            ) {

                cerrarModal();

            }

        }
    );


    document.addEventListener(
        'keydown',
        event => {

            if (
                event.key === 'Escape' &&
                state.modalAbierto
            ) {

                cerrarModal();

            }

        }
    );

}


// ============================================================
// ABRIR MODAL
// ============================================================

function abrirModal() {

    if (!elements.modalOverlay) {
        return;
    }


    state.modalAbierto = true;


    elements.modalOverlay.classList.remove(
        'hidden'
    );


    // Necesario para que flex vuelva a aplicarse
    elements.modalOverlay.classList.add(
        'flex'
    );


    void elements.modalOverlay.offsetWidth;


    elements.modalOverlay.classList.remove(
        'opacity-0'
    );


    if (elements.modal) {

        elements.modal.classList.remove(
            'scale-95'
        );

    }


    elements.modalOverlay.setAttribute(
        'aria-hidden',
        'false'
    );


    document.body.classList.add(
        'overflow-hidden'
    );

}


// ============================================================
// CERRAR MODAL
// ============================================================

function cerrarModal() {

    if (
        !elements.modalOverlay ||
        !state.modalAbierto
    ) {
        return;
    }


    state.modalAbierto = false;


    elements.modalOverlay.classList.add(
        'opacity-0'
    );


    if (elements.modal) {

        elements.modal.classList.add(
            'scale-95'
        );

    }


    elements.modalOverlay.setAttribute(
        'aria-hidden',
        'true'
    );


    document.body.classList.remove(
        'overflow-hidden'
    );


    setTimeout(() => {

        if (!state.modalAbierto) {

            elements.modalOverlay.classList.add(
                'hidden'
            );

            elements.modalOverlay.classList.remove(
                'flex'
            );

        }

    }, 300);

}


// ============================================================
// WHATSAPP
// ============================================================

function actualizarWhatsApp() {

    if (!elements.whatsapp) {
        return;
    }


    const whatsapp =
        state.catalogo?.whatsapp || {};


    const numero =
        whatsapp.numero || '';


    if (!numero) {

        elements.whatsapp.href = '#';

        return;

    }


    const productName =
        state.producto?.nombre ||
        'Producto';


    let mensaje =
        `${whatsapp.mensaje_base || 'Hola, quisiera cotizar el producto: '}${productName}`;


    if (state.coleccion) {

        mensaje +=
            `\n• Colección: ${state.coleccion}`;

    }


    if (state.tela) {

        mensaje +=
            `\n• Tela: ${state.tela}`;

    }


    if (state.pata) {

        mensaje +=
            `\n• Patas: ${state.pata}`;

    }


    mensaje +=
        `\n\nVer demo: ${window.location.href}`;


    elements.whatsapp.href =
        `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;

}


// ============================================================
// ERROR DE CARGA
// ============================================================

function mostrarErrorCarga() {

    if (elements.productName) {

        elements.productName.textContent =
            'No se pudo cargar la demo';

    }


    if (elements.mainImage) {

        elements.mainImage.src =
            DEFAULT_IMAGE;

    }

}


// ============================================================
// ARRANQUE
// ============================================================

document.addEventListener(
    'DOMContentLoaded',
    loadCatalog
);