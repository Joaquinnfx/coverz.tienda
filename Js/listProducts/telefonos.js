// Array de productos con nombre, precio y la imagen
const productos = [
  { nombre: "Iphone 14 Pro Max", precio: 1100 , imagen: "/assets/iphone-14-pro-max.png" },
  { nombre: "Iphone 13", precio: 1100 ,imagen: "/assets/iphone-13-Photoroom.png" },
  { nombre: "Iphone 15 Pro Max", precio: 1100 , imagen: "/assets/iphone-15-pro-max-Photoroom.png" },
  { nombre: "Samsung Galaxy S21", precio: 1100 , imagen: "/assets/SamsungS21.png" },
  { nombre: "Samsung Galaxy S24 Ultra", precio: 1100 , imagen: "/assets/samsung-s24-ultra-Photoroom.png" },
  { nombre: "Motorola G54", precio: 1100 , imagen: "/assets/moto-g54-Photoroom.png" },
  { nombre: "Motorola G85", precio: 1100 , imagen: "/assets/moto-g85-Photoroom.png" },
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
