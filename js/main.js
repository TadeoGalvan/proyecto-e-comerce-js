let productos=[]
fetch("./js/productos.json")
    .then(response=>response.json())
    .then(data=>{
        productos=data
        cargarProductos(productos)
    })
const contenedorProductos = document.querySelector("#contenedor-productos");
const botonesCategorias = document.querySelectorAll(".boton-categoria")
const tituloPrincipal = document.querySelector("#titulo-principal")
let botonesAgregar=document.querySelectorAll(".producto__texto-boton")
const numerito = document.querySelector("#numerito")

function cargarProductos(productosElegidos){
    contenedorProductos.innerHTML=""
    productosElegidos.forEach(producto=> {
        const div=document.createElement("div");
        div.classList.add("producto")
        div.innerHTML=`
        <img class="producto__imagen" src="${producto.imagen}" alt="${producto.titulo}">
        <div class="producto__texto">
            <h3 class="producto__texto-titulo">${producto.titulo}</h3>
            <p class="producto__texto-precio">$${producto.precio}</p>
            <button class="producto__texto-boton" id="${producto.id}">agregar</button>
        </div>
        `;
        contenedorProductos.append(div)
    }) 
    actualizarBotonesAgregar()
}


botonesCategorias.forEach(boton=>{
    boton.addEventListener("click",(e)=> {
        botonesCategorias.forEach(boton=>boton.classList.remove("active"))
        e.currentTarget.classList.add("active");
        if(e.currentTarget.id != "todos"){
            const productosCategoria=productos.find(producto=>producto.categoria.id===e.currentTarget.id)
            tituloPrincipal.innerHTML=productosCategoria.categoria.nombre
            const productosBoton=productos.filter(producto=>producto.categoria.id===e.currentTarget.id)
            cargarProductos(productosBoton);
        // }else if (e.currentTarget.id === productos.filter(producto=>producto.categoria.id2)){
        //     const productosBoton1=productos.filter(producto=>producto.categoria.id2===e.currentTarget.id)
        //     console.log(productosBoton1)
        //     cargarProductos(productosBoton1);
        }else{
            tituloPrincipal.innerHTML="Todos los productos"
            cargarProductos(productos)
        }
    })
})

function actualizarBotonesAgregar(){
    botonesAgregar=document.querySelectorAll(".producto__texto-boton")
    botonesAgregar.forEach(boton =>{
        boton.addEventListener("click", agregarAlCarrito)
    })
}

let productosEnCarrito

let productosEnCarritoLS=localStorage.getItem("productos-en-carrito")
if (productosEnCarritoLS) {
    productosEnCarrito=JSON.parse(productosEnCarritoLS)
    actualizarNumerito()
}else{
    productosEnCarrito=[]
}

function agregarAlCarrito(e){
    Toastify({
        text: "Producto agregado!",
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


    const idBoton=e.currentTarget.id
    const productoAgregado=productos.find(producto=>producto.id===idBoton)
    if (productosEnCarrito.some(producto=>producto.id===idBoton)){
        const index = productosEnCarrito.findIndex(producto=>producto.id===idBoton)
        productosEnCarrito[index].cantidad++
    }else{
        productoAgregado.cantidad=1
        productosEnCarrito.push(productoAgregado)
    }
    actualizarNumerito()
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosEnCarrito))
}

function actualizarNumerito(){
    let nuevoNumerito = productosEnCarrito.reduce((acc, producto)=>acc  +producto.cantidad, 0)
    numerito.innerHTML=nuevoNumerito
}