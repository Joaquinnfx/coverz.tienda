const productos=[
    { nombre: "Pantalla para Iphone", precio: 150 , imagen: "/assets/pantalla-iphone-Photoroom.png"}, 
    { nombre: "Bateria para Iphone", precio: 150 , imagen: "/assets/bateria-iphone-Photoroom.png"},

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
