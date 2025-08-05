
class EcommerceCoverz {
    constructor() {
        this.productos = [];
        this.carrito = JSON.parse(localStorage.getItem('carrito')) || [];
        this.initPromise = this._init();
    }

    async _init() {
        await this.cargarProductos();
        this.setupEventListeners();
        this.actualizarContadorCarrito();
    }

    async cargarProductos() {
        try {
            // Determinar la ruta correcta basada en la ubicación de la página
            const isInPages = window.location.pathname.includes('/pages/');
            const jsonPath = isInPages ? '../data/products.json' : './data/products.json';

            const response = await fetch(jsonPath);
            if (!response.ok) {
                throw new Error('Error al cargar productos');
            }
            this.productos = await response.json();
        } catch (error) {
            console.error('Error cargando productos:', error);
            this.productos = [];
        }
    }

    setupEventListeners() {
        // Búsqueda
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.addEventListener('input', (e) => {
                this.buscarProductos(e.target.value);
            });
        }

        // Filtro de precio
        const precioFiltro = document.getElementById('filtro-precio');
        if (precioFiltro) {
            precioFiltro.addEventListener('change', (e) => {
                this.filtrarPorPrecio(e.target.value);
            });
        }

        // Filtro de destacados
        const destacadosFiltro = document.getElementById('filtro-destacados');
        if (destacadosFiltro) {
            destacadosFiltro.addEventListener('change', (e) => {
                this.filtrarDestacados(e.target.checked);
            });
        }

        // Filtro de marca
        const marcaFiltro = document.getElementById('filtro-marca');
        if (marcaFiltro) {
            marcaFiltro.addEventListener('change', (e) => {
                this.filtrarPorMarca(e.target.value);
            });
        }

        // Newsletter
        const newsletterForm = document.getElementById('newsletterForm');
        if (newsletterForm) {
            newsletterForm.addEventListener('submit', (e) => {
                e.preventDefault();
                this.suscribirNewsletter();
            });
        }
    }

    aplicarFiltro(categoria) {
        const productosFiltrados = categoria === 'todos'
            ? this.productos
            : this.productos.filter(p => p.categoria === categoria);

        this.renderizarProductos(productosFiltrados, 'listProducts');
    }

    buscarProductos(termino) {
        const productosFiltrados = this.productos.filter(p =>
            p.nombre.toLowerCase().includes(termino.toLowerCase()) ||
            p.marca.toLowerCase().includes(termino.toLowerCase())
        );

        this.renderizarProductos(productosFiltrados, 'listProducts');
    }

    filtrarPorPrecio(rango) {
        let productosFiltrados = this.productos;
        const path = window.location.pathname;

        // Primero filtrar por categoría actual
        if (path.includes('telefonos.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'telefonos');
        } else if (path.includes('fundas.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'fundas');
        } else if (path.includes('accesorios.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'accesorios');
        } else if (path.includes('repuestos.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'repuestos');
        }

        // Luego aplicar filtro de precio según la página
        if (rango && rango !== '') {
            switch (rango) {
                // Filtros para teléfonos
                case '0-500':
                    productosFiltrados = productosFiltrados.filter(p => p.precio <= 500);
                    break;
                case '500-1000':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 500 && p.precio <= 1000);
                    break;
                case '1000-1500':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 1000 && p.precio <= 1500);
                    break;
                case '1500-9999':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 1500);
                    break;

                // Filtros para fundas
                case '0-10':
                    productosFiltrados = productosFiltrados.filter(p => p.precio <= 10);
                    break;
                case '10-20':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 10 && p.precio <= 20);
                    break;
                case '20-30':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 20 && p.precio <= 30);
                    break;
                case '30-9999':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 30);
                    break;

                // Filtros para accesorios
                case '0-15':
                    productosFiltrados = productosFiltrados.filter(p => p.precio <= 15);
                    break;
                case '15-30':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 15 && p.precio <= 30);
                    break;
                case '30-50':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 30 && p.precio <= 50);
                    break;
                case '50-9999':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 50);
                    break;

                // Filtros para repuestos
                case '0-80':
                    productosFiltrados = productosFiltrados.filter(p => p.precio <= 80);
                    break;
                case '80-150':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 80 && p.precio <= 150);
                    break;
                case '150-200':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 150 && p.precio <= 200);
                    break;
                case '200-9999':
                    productosFiltrados = productosFiltrados.filter(p => p.precio > 200);
                    break;
            }
        }

        this.renderizarProductos(productosFiltrados, 'listProducts');
    }

    filtrarDestacados(soloDestacados) {
        let productosFiltrados = this.productos;

        // Primero filtrar por categoría actual
        const path = window.location.pathname;
        if (path.includes('telefonos.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'telefonos');
        } else if (path.includes('fundas.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'fundas');
        } else if (path.includes('accesorios.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'accesorios');
        } else if (path.includes('repuestos.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'repuestos');
        }

        // Luego aplicar filtro de destacados si está activado
        if (soloDestacados) {
            productosFiltrados = productosFiltrados.filter(p => p.destacado);
        }

        this.renderizarProductos(productosFiltrados, 'listProducts');
    }

    filtrarPorMarca(marca) {
        let productosFiltrados = this.productos;

        // Primero filtrar por categoría actual
        const path = window.location.pathname;
        if (path.includes('telefonos.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'telefonos');
        } else if (path.includes('fundas.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'fundas');
        } else if (path.includes('accesorios.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'accesorios');
        } else if (path.includes('repuestos.html')) {
            productosFiltrados = this.productos.filter(p => p.categoria === 'repuestos');
        }

        // Luego aplicar filtro de marca si está seleccionada
        if (marca && marca !== '') {
            productosFiltrados = productosFiltrados.filter(p => p.marca === marca);
        }

        this.renderizarProductos(productosFiltrados, 'listProducts');
    }

    mostrarProductosCategoria(categoria) {
        const productosCategoria = this.productos.filter(p => p.categoria === categoria);
        this.renderizarProductos(productosCategoria, 'listProducts');
    }

    mostrarProductosDestacados() {
        const productosDestacados = this.productos.filter(p => p.destacado);
        this.renderizarProductos(productosDestacados, 'productos-destacados');
    }

    renderizarProductos(productos, targetId) {
        const container = document.getElementById(targetId);
        if (!container) {
            console.error(`Contenedor ${targetId} no encontrado`);
            return;
        }

        if (productos.length === 0) {
            container.innerHTML = `
                <div class="col-12 text-center">
                    <h3 class="text-muted">No se encontraron productos</h3>
                    <p class="text-muted">Intenta con otros filtros o términos de búsqueda</p>
                </div>
            `;
            return;
        }

        container.innerHTML = productos.map(producto => this.crearCardProducto(producto)).join('');
    }

    crearCardProducto(producto) {
        // Determinar la ruta correcta de la imagen basada en la ubicación de la página
        const imagePath = window.location.pathname.includes('/pages/') ? '../assets/' : './assets/';

        return `
            <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
                <div class="card h-100 producto-card">
                    <img src="${imagePath}${producto.imagen}" class="card-img-top" alt="${producto.nombre}">
                    <div class="card-body d-flex flex-column">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text text-muted">${producto.marca}</p>
                        <p class="card-text">$${producto.precio.toLocaleString()}</p>
                        <p class="card-text"><small class="text-muted">Stock: ${producto.stock}</small></p>
                        <div class="mt-auto">
                            <button class="btn btn-primary w-100" onclick="window.ecommerce.agregarAlCarrito('${producto.id}')">
                                <i class="fas fa-shopping-cart"></i> Agregar al carrito
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    agregarAlCarrito(productoId) {
        const producto = this.productos.find(p => p.id === productoId);
        if (!producto) return;

        const itemExistente = this.carrito.find(item => item.id === productoId);

        if (itemExistente) {
            if (itemExistente.cantidad < producto.stock) {
                itemExistente.cantidad++;
            } else {
                Swal.fire({
                    icon: 'warning',
                    title: 'Stock insuficiente',
                    text: 'No hay más unidades disponibles de este producto'
                });
                return;
            }
        } else {
            this.carrito.push({
                id: producto.id,
                nombre: producto.nombre,
                precio: producto.precio,
                imagen: producto.imagen,
                cantidad: 1
            });
        }

        this.guardarCarrito();
        this.actualizarContadorCarrito();

        Swal.fire({
            icon: 'success',
            title: 'Producto agregado',
            text: `${producto.nombre} se agregó al carrito`,
            timer: 1500,
            showConfirmButton: false
        });
    }

    quitarDelCarrito(productoId) {
        this.carrito = this.carrito.filter(item => item.id !== productoId);
        this.guardarCarrito();
        this.actualizarContadorCarrito();
        this.mostrarCarrito();
    }

    actualizarCantidad(productoId, nuevaCantidad) {
        const item = this.carrito.find(item => item.id === productoId);
        if (item) {
            const producto = this.productos.find(p => p.id === productoId);
            if (nuevaCantidad <= producto.stock && nuevaCantidad > 0) {
                item.cantidad = nuevaCantidad;
                this.guardarCarrito();
                this.actualizarContadorCarrito();
                this.mostrarCarrito();
            }
        }
    }

    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
    }

    actualizarContadorCarrito() {
        const contador = document.getElementById('carritoContador');
        if (contador) {
            const totalItems = this.carrito.reduce((sum, item) => sum + item.cantidad, 0);
            contador.textContent = totalItems;
            contador.style.display = totalItems > 0 ? 'block' : 'none';
        }
    }

    mostrarCarrito() {
        const carritoContainer = document.getElementById('carritoContainer');
        if (!carritoContainer) return;

        if (this.carrito.length === 0) {
            carritoContainer.innerHTML = `
                <div class="text-center py-5">
                    <i class="fas fa-shopping-cart fa-3x text-muted mb-3"></i>
                    <h4 class="text-muted">Tu carrito está vacío</h4>
                    <p class="text-muted">Agrega algunos productos para comenzar</p>
                    <a href="../index.html" class="btn btn-primary">Ver productos</a>
                </div>
            `;
            return;
        }

        // Determinar la ruta correcta de la imagen basada en la ubicación de la página
        const imagePath = window.location.pathname.includes('/pages/') ? '../assets/' : './assets/';

        const carritoHTML = this.carrito.map(item => {
            const producto = this.productos.find(p => p.id === item.id);
            return `
                <div class="card mb-3">
                    <div class="row g-0">
                        <div class="col-md-3">
                            <img src="${imagePath}${item.imagen}" class="img-fluid rounded-start" alt="${item.nombre}">
                        </div>
                        <div class="col-md-9">
                            <div class="card-body">
                                <h5 class="card-title">${item.nombre}</h5>
                                <p class="card-text">$${item.precio.toLocaleString()}</p>
                                <div class="d-flex align-items-center">
                                    <label class="me-2">Cantidad:</label>
                                    <input type="number" class="form-control me-2" style="width: 80px;" 
                                           value="${item.cantidad}" min="1" max="${producto.stock}"
                                           onchange="window.ecommerce.actualizarCantidad('${item.id}', this.value)">
                                    <button class="btn btn-danger btn-sm" onclick="window.ecommerce.quitarDelCarrito('${item.id}')">
                                        <i class="fas fa-trash"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        const total = this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0);

        carritoContainer.innerHTML = `
            ${carritoHTML}
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Total: $${total.toLocaleString()}</h5>
                    <button class="btn btn-success w-100" onclick="window.ecommerce.realizarCompra()">
                        <i class="fas fa-credit-card"></i> Realizar compra
                    </button>
                </div>
            </div>
        `;
    }

    realizarCompra() {
        Swal.fire({
            title: '¿Confirmar compra?',
            text: `Total: $${this.carrito.reduce((sum, item) => sum + (item.precio * item.cantidad), 0).toLocaleString()}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Confirmar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Simular proceso de compra
                Swal.fire({
                    title: 'Procesando compra...',
                    text: 'Por favor espera',
                    allowOutsideClick: false,
                    didOpen: () => {
                        Swal.showLoading();
                    }
                });

                setTimeout(() => {
                    this.carrito = [];
                    this.guardarCarrito();
                    this.actualizarContadorCarrito();

                    Swal.fire({
                        icon: 'success',
                        title: '¡Compra realizada con éxito!',
                        text: 'Gracias por tu compra. Recibirás un email con los detalles.',
                        confirmButtonText: 'Continuar'
                    }).then(() => {
                        window.location.href = '../index.html';
                    });
                }, 2000);
            }
        });
    }

    suscribirNewsletter() {
        const email = document.getElementById('newsletterEmail').value;
        if (email) {
            Swal.fire({
                icon: 'success',
                title: '¡Suscripción exitosa!',
                text: 'Te has suscrito a nuestro newsletter',
                timer: 2000,
                showConfirmButton: false
            });
            document.getElementById('newsletterEmail').value = '';
        }
    }
}

// Inicializar la aplicación
window.ecommerce = new EcommerceCoverz();

// Esperar a que el DOM esté listo y la inicialización sea completa
document.addEventListener('DOMContentLoaded', async () => {
    try {
        await window.ecommerce.initPromise;

        // Determinar qué página estamos y cargar el contenido apropiado
        const path = window.location.pathname;

        if (path.includes('telefonos.html')) {
            window.ecommerce.mostrarProductosCategoria('telefonos');
        } else if (path.includes('fundas.html')) {
            window.ecommerce.mostrarProductosCategoria('fundas');
        } else if (path.includes('accesorios.html')) {
            window.ecommerce.mostrarProductosCategoria('accesorios');
        } else if (path.includes('repuestos.html')) {
            window.ecommerce.mostrarProductosCategoria('repuestos');
        } else if (path.includes('carrito.html')) {
            window.ecommerce.mostrarCarrito();
        } else if (path.endsWith('/') || path.endsWith('/index.html') || path.endsWith('index.html')) {
            // Página principal - mostrar productos destacados
            window.ecommerce.mostrarProductosDestacados();
        }
    } catch (error) {
        console.error('Error durante la inicialización:', error);
    }
}); 