let productosEnCarrito=(localStorage.getItem("productos-en-carrito"))
productosEnCarrito=JSON.parse(productosEnCarrito)
const contenedorCarritoVacio=document.querySelector("#carrito-vacio")
const contenedorCarritoProductos=document.querySelector("#carrito-productos")
const contenedorCarritoAcciones=document.querySelector("#carrito-acciones")
const contenedorCarritoComprado=document.querySelector("#carrito-comprado")
let botonesEliminar=document.querySelectorAll(".carrito__productos-eliminar")
const botonVaciar=document.querySelector(".carrito__acciones-vaciar")
const botonComprar=document.querySelector(".carrito__acciones-comprar")
const contenedorTotal=document.querySelector("#total")

function cargarProductosCarrito (){
    if(productosEnCarrito && productosEnCarrito.length>0){
        contenedorCarritoVacio.classList.add("disabled")
        contenedorCarritoComprado.classList.add("disabled")
        contenedorCarritoProductos.classList.remove("disabled")
        contenedorCarritoAcciones.classList.remove("disabled")
        contenedorCarritoProductos.innerHTML=""
        productosEnCarrito.forEach(producto =>{
            const div=document.createElement("div")
            div.classList.add("carrito__producto")
            div.innerHTML=`
            <img src="${producto.imagen}" alt="${producto.titulo}">
            <div class="carrito__producto-titulo">
                <small>Titulo</small>
                <h3>${producto.titulo}</h3>
            </div>
            <div class="carrito__producto-cantidad">
                <small>Cantidad</small>
                <p>${producto.cantidad}</p>
            </div>
            <div class="carrito__producto-precio">
                <small>Precio</small>
                <p>${producto.precio}</p>
            </div>
            <div class="carrito__producto-subtotal">
                <small>Subtotal</small>
                <p>${producto.precio * producto.cantidad}</p>
            </div>
            <button class="carrito__producto-eliminar" id="${producto.id}"><i class="bi bi-trash"></i></button>
            `;
            contenedorCarritoProductos.append(div)
        })
        actualizarBotonesEliminar()
        actualiazarTotal()
    }else{
        contenedorCarritoVacio.classList.remove("disabled")
        contenedorCarritoComprado.classList.add("disabled")
        contenedorCarritoProductos.classList.add("disabled")
        contenedorCarritoAcciones.classList.add("disabled")
    }
}
cargarProductosCarrito ()

function actualizarBotonesEliminar(){
    botonesEliminar=document.querySelectorAll(".carrito__producto-eliminar")
    botonesEliminar.forEach(boton =>{
        boton.addEventListener("click", eliminarDelCarrito)
    })
}

function eliminarDelCarrito(e){
    Toastify({
        text: "Producto eliminado!",
        duration: 700,
        destination: "https://github.com/apvarun/toastify-js",
        newWindow: true,
        //close: true,
        gravity: "bottom", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
            background: "rgb(183,209,163)",
            background: "linear-gradient(90deg, rgba(183,209,163,1) 18%, rgba(252,247,211,1) 98%)",
            color:"#9d5e27",
            borderRadius:"15px",
            border: "1px solid #dee8be",
            textTransform:"uppercase",
            fontSize: ".75rem"
        },
        offset: {
            x: 30, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        onClick: function(){} // Callback after click
    }).showToast();
    const idBoton=e.currentTarget.id;
    const index=productosEnCarrito.findIndex(producto=>producto.id===idBoton)
    productosEnCarrito.splice(index, 1)
    cargarProductosCarrito ()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

botonVaciar.addEventListener("click", vaciarCarrito)
function vaciarCarrito(){
    productosEnCarrito.length=0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    cargarProductosCarrito ()
}

function actualiazarTotal() {
    const totalCalculado=productosEnCarrito.reduce((acc, producto) => acc+(producto.precio*producto.cantidad), 0)
    total.innerText=`${totalCalculado}`
}

botonComprar.addEventListener("click",comprarCarrito)
function comprarCarrito(){
    productosEnCarrito.length=0
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
    contenedorCarritoVacio.classList.add("disabled")
    contenedorCarritoComprado.classList.remove("disabled")
    contenedorCarritoProductos.classList.add("disabled")
    contenedorCarritoAcciones.classList.add("disabled")
}