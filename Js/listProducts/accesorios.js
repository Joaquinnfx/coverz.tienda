// Array de productos con nombre, precio y la imagen
const productos = [
  { nombre: "Cargador Apple", precio: 10 , imagen: "/assets/Cargador-Iphone-3-Photoroom.png" },
  { nombre: "Cargador Samsung", precio: 10 ,imagen: "/assets/cargador_samsung-Photoroom.png" },
  { nombre: "AirPods 4", precio: 10 , imagen: "/assets/images-Photoroom.png" },
  { nombre: "Aro de luz para celular", precio: 10 , imagen: "/assets/arodeluz.jpg" },
  { nombre: "Soporte de mesa", precio: 10 , imagen: "/assets/Soporte-celu-Photoroom.png" },
  { nombre: "Soporte sopapa", precio: 10 , imagen: "/assets/Soporte-sopapa-Photoroom.png" },
    { nombre: "Correa para celular", precio: 10 , imagen: "/assets/Correa-celu-Photoroom.png" },
];



// Cargar el carrito desde localStorage o iniciar vacío
let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

// Seleccionar todos los botones "Agregar al carrito"
const botones = document.querySelectorAll(".btn-add");

botones.forEach((boton, index) => {
  boton.addEventListener("click", (e) => {
    e.preventDefault(); // Previene que se redireccione aún

    const producto = productos[index];
    carrito.push(producto);

    // Guardar en localStorage
    localStorage.setItem("carrito", JSON.stringify(carrito));

    // Redirigir al carrito después de agregar (opcional)
    // window.location.href = "carrito.html";
  });
});
