// Array de productos con nombre, precio y la imagen
const productos = [
  { nombre: "Funda de Silicona", precio: 10 , imagen: "/assets/funda_silicona-Photoroom.png" },
  { nombre: "Funda negra", precio: 10 ,imagen: "/assets/funda_negra-Photoroom.png" },
  { nombre: "Funda Astronauta", precio: 10 , imagen: "/assets/funda_astronauta-Photoroom.png" },
  { nombre: "Funda con diseño en resina", precio: 10 , imagen: "/assets/Funda_diseñoresina-Photoroom.png" },
  { nombre: "Fundas Puffer", precio: 10 , imagen: "/assets/Fundas_puffer-Photoroom.png" },
  { nombre: "Fundas de los Simpsons", precio: 10 , imagen: "/assets/Fundas_Simpsons-Photoroom.png" },
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
