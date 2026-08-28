// ============================================================
// MUEBLES MEDELLÍN
// Bloque 1.1 — Delegación centralizada de eventos
// ============================================================


// ============================================================
// ESTADO DE LA APLICACIÓN
// ============================================================

// Carrito orientado a solicitud de cotización.
//
// IMPORTANTE:
// - No se almacenan precios.
// - No se calculan totales.
// - No se envía información monetaria.
// - productId será el identificador principal para la futura API.
//
// name se conserva únicamente para representar el producto
// actualmente seleccionado en la interfaz.
// Persistencia: se carga desde localStorage al iniciar.
let cart = JSON.parse(localStorage.getItem('muebles_cart')) || [];


// ============================================================
// ESTADO DEL CARRUSEL
// ============================================================

let currentSlide = 0;
let slideInterval = null;

const timePerSlide = 5000;


// ============================================================
// SIDEBAR
// ============================================================

function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (!sidebar || !overlay) {
        return;
    }

    const isClosed = sidebar.classList.contains('-translate-x-full');

    if (isClosed) {
        // Abrir sidebar
        sidebar.classList.remove('-translate-x-full');

        overlay.classList.remove('hidden');

        // Permitir que la transición de opacity ocurra
        requestAnimationFrame(() => {
            overlay.classList.remove('opacity-0');
        });

    } else {
        // Cerrar sidebar
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');

        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    }
}


function closeSidebar() {
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebar-overlay');

    if (!sidebar || !overlay) {
        return;
    }

    if (!sidebar.classList.contains('-translate-x-full')) {
        sidebar.classList.add('-translate-x-full');
        overlay.classList.add('opacity-0');

        setTimeout(() => {
            overlay.classList.add('hidden');
        }, 300);
    }
}


// ============================================================
// CARRITO (DRAWER CON TRANSICIONES - VERSIÓN CORREGIDA)
// ============================================================

function toggleCart() {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');

    if (!drawer || !overlay) return;

    const isOpen = drawer.classList.contains('translate-x-0');

    if (isOpen) {
        // Cerrar drawer: devolver la clase full
        drawer.classList.remove('translate-x-0');
        drawer.classList.add('translate-x-full');

        overlay.classList.remove('opacity-100', 'pointer-events-auto');
        overlay.classList.add('opacity-0', 'pointer-events-none');
    } else {
        // Abrir drawer: quitar la clase full y poner la de posición 0
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('translate-x-0');

        overlay.classList.add('opacity-100', 'pointer-events-auto');
        overlay.classList.remove('opacity-0', 'pointer-events-none');
    }
}


// ============================================================
// AGREGAR PRODUCTO
// ============================================================

function addToCart(productId, productCard) {

    if (!productId || !productCard) {
        return;
    }

    const nameElement = productCard.querySelector('h3');

    const name = nameElement
        ? nameElement.textContent.trim()
        : 'Producto';

    const normalizedProductId = String(productId);

    // Comprobar si el producto ya existe en el carrito.
    const existingItem = cart.find(
        item => item.productId === normalizedProductId
    );

    if (existingItem) {

        existingItem.quantity += 1;

    } else {

        cart.push({
            productId: normalizedProductId,
            name,
            quantity: 1
        });
    }

    updateCartUI();

    const drawer = document.getElementById('cart-drawer');

    // Si el drawer está cerrado, lo abrimos automáticamente al agregar
    if (drawer && !drawer.classList.contains('translate-x-0')) {
        toggleCart();
    }
}


// ============================================================
// ACTUALIZAR INTERFAZ DEL CARRITO
// ============================================================

function updateCartUI() {

    // 1. Guardar el estado actual en localStorage
    localStorage.setItem('muebles_cart', JSON.stringify(cart));

    // 2. Actualizar el contador y la lista de productos
    const itemsContainer = document.getElementById('cart-items');
    const countLabel = document.getElementById('cart-count');

    if (!itemsContainer || !countLabel) {
        return;
    }

    // Eliminamos los nodos existentes sin utilizar innerHTML.
    itemsContainer.replaceChildren();

    let totalItems = 0;

    cart.forEach((item, index) => {

        totalItems += item.quantity;


        // ----------------------------------------------------
        // Contenedor principal
        // ----------------------------------------------------

        const row = document.createElement('div');

        row.className =
            'flex justify-between items-center border-b border-stone-100 pb-2';

        row.dataset.cartIndex = String(index);


        // ----------------------------------------------------
        // Información del producto
        // ----------------------------------------------------

        const infoDiv = document.createElement('div');


        // Nombre + cantidad
        const nameElement = document.createElement('p');

        nameElement.className =
            'font-medium text-sm';

        nameElement.textContent =
            `${item.name} — Cantidad: ${item.quantity}`;


        infoDiv.appendChild(nameElement);


        // ----------------------------------------------------
        // Botón eliminar
        // ----------------------------------------------------

        const deleteButton = document.createElement('button');

        deleteButton.className =
            'text-xs text-red-300 hover:text-red-500 transition';

        deleteButton.type = 'button';

        deleteButton.textContent = 'Eliminar';

        deleteButton.dataset.action =
            'remove-from-cart';

        deleteButton.dataset.index =
            String(index);


        // ----------------------------------------------------
        // Ensamblar fila
        // ----------------------------------------------------

        row.appendChild(infoDiv);
        row.appendChild(deleteButton);

        itemsContainer.appendChild(row);
    });


    // Contador del carrito.
    // Representa la cantidad total de unidades solicitadas.
    countLabel.textContent = String(totalItems);
}


// ============================================================
// WHATSAPP — SOLICITUD DE COTIZACIÓN
// ============================================================

function sendToWhatsApp() {

    if (cart.length === 0) {
        return;
    }

    const phone = '573000000000'; // Número de WhatsApp (sin signos ni espacios)


    // Crear una línea por producto.
    const lines = cart.map(item => {
        return `• ${item.name} - Cantidad: ${item.quantity}`;
    });


    const message = [
        '🛋️ *Nueva Solicitud de Cotización*',
        '',
        ...lines,
        '',
        '¿Podrían indicarme la disponibilidad y la cotización de estos artículos?'
    ].join('\n');


    const whatsappUrl =
        `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;


    window.location.href = whatsappUrl;
}


// ============================================================
// CARRUSEL
// ============================================================

function showSlide(index) {

    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    if (slides.length === 0) {
        return;
    }


    // Ocultar slide actual

    slides[currentSlide].classList.remove(
        'opacity-100',
        'z-10'
    );

    slides[currentSlide].classList.add(
        'opacity-0',
        'z-0'
    );


    if (dots[currentSlide]) {

        dots[currentSlide].classList.remove(
            'bg-white'
        );

        dots[currentSlide].classList.add(
            'bg-white/50'
        );
    }


    // Calcular nueva posición

    currentSlide =
        (index + slides.length) % slides.length;


    // Mostrar nuevo slide

    slides[currentSlide].classList.remove(
        'opacity-0',
        'z-0'
    );

    slides[currentSlide].classList.add(
        'opacity-100',
        'z-10'
    );


    if (dots[currentSlide]) {

        dots[currentSlide].classList.remove(
            'bg-white/50'
        );

        dots[currentSlide].classList.add(
            'bg-white'
        );
    }
}


function nextSlide() {
    showSlide(currentSlide + 1);
}


function prevSlide() {
    showSlide(currentSlide - 1);
}


function startSlideShow() {

    stopSlideShow();

    slideInterval = setInterval(() => {
        nextSlide();
    }, timePerSlide);
}


function stopSlideShow() {

    if (slideInterval !== null) {

        clearInterval(slideInterval);

        slideInterval = null;
    }
}


// ============================================================
// DELEGACIÓN CENTRALIZADA DE EVENTOS
// ============================================================

document.addEventListener('click', (event) => {

    const target = event.target.closest('[data-action]');

    if (!target) {
        return;
    }


    const action = target.dataset.action;


    // --------------------------------------------------------
    // TOGGLE SIDEBAR
    // --------------------------------------------------------

    if (action === 'toggle-sidebar') {

        event.preventDefault();

        toggleSidebar();

        return;
    }


    // --------------------------------------------------------
    // CERRAR SIDEBAR
    // --------------------------------------------------------

    if (action === 'close-sidebar') {

        // IMPORTANTE:
        // NO hacemos preventDefault().
        //
        // De esta manera:
        // 1. cerramos sidebar
        // 2. el navegador continúa con href="#cat-salas"

        closeSidebar();

        return;
    }


    // --------------------------------------------------------
    // TOGGLE CART
    // --------------------------------------------------------

    if (action === 'toggle-cart') {

        event.preventDefault();

        toggleCart();

        return;
    }


    // --------------------------------------------------------
    // CARRUSEL
    // --------------------------------------------------------

    if (action === 'slide') {

        event.preventDefault();

        const targetSlide = target.dataset.target;


        if (targetSlide === 'prev') {

            prevSlide();

            return;
        }


        if (targetSlide === 'next') {

            nextSlide();

            return;
        }


        const index =
            Number.parseInt(targetSlide, 10);


        if (Number.isInteger(index)) {

            showSlide(index);
        }

        return;
    }


    // --------------------------------------------------------
    // AGREGAR AL CARRITO (CORREGIDO)
    // --------------------------------------------------------

    if (action === 'add-to-cart') {

        event.preventDefault();

        const productId = target.dataset.productId;

        if (!productId) {
            console.warn('Botón de carrito sin productId.');
            return;
        }

        // Intentar obtener la tarjeta (.group) para el Home
        const productCard = target.closest('.group');

        if (productCard) {
            // Comportamiento actual (Home)
            addToCart(productId, productCard);
        } else {
            // Fallback para vista de detalle o cualquier otro lugar
            const productName = target.dataset.productName || target.dataset.nombre;
            if (!productName) {
                console.warn('No se encontró el nombre del producto para el carrito.');
                return;
            }

            // Crear un objeto "card" mínimo para addToCart
            const fakeCard = {
                querySelector: (selector) => {
                    if (selector === 'h3') {
                        return { textContent: productName };
                    }
                    return null;
                }
            };
            addToCart(productId, fakeCard);
        }
        return;
    }


    // --------------------------------------------------------
    // ELIMINAR DEL CARRITO
    // --------------------------------------------------------

    if (action === 'remove-from-cart') {

        event.preventDefault();

        const index =
            Number.parseInt(
                target.dataset.index,
                10
            );


        if (
            !Number.isInteger(index) ||
            index < 0 ||
            index >= cart.length
        ) {
            return;
        }


        cart.splice(index, 1);

        updateCartUI();

        return;
    }


    // --------------------------------------------------------
    // WHATSAPP
    // --------------------------------------------------------

    if (action === 'send-whatsapp') {

        event.preventDefault();

        sendToWhatsApp();

        return;
    }
});


// ============================================================
// INICIALIZACIÓN
// ============================================================

document.addEventListener('DOMContentLoaded', () => {

    // --------------------------------------------------------
    // CARRUSEL PRINCIPAL
    // --------------------------------------------------------

    const carousel =
        document.getElementById('hero-carousel');

    if (carousel) {

        carousel.addEventListener(
            'mouseenter',
            stopSlideShow
        );

        carousel.addEventListener(
            'mouseleave',
            startSlideShow
        );
    }

    startSlideShow();


    // --------------------------------------------------------
    // CERRAR CARRITO AL HACER CLIC EN EL OVERLAY
    // --------------------------------------------------------

    const overlay = document.getElementById('cart-overlay');

    if (overlay) {
        overlay.addEventListener('click', () => {
            toggleCart();
        });
    }


    // --------------------------------------------------------
    // CERRAR CARRITO CON TECLA ESC
    // --------------------------------------------------------

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            const drawer = document.getElementById('cart-drawer');
            if (drawer && drawer.classList.contains('translate-x-0')) {
                toggleCart();
            }
        }
    });


    // --------------------------------------------------------
    // PINTAR EL CARRITO AL CARGAR LA PÁGINA (persistencia)
    // --------------------------------------------------------

    updateCartUI();

});