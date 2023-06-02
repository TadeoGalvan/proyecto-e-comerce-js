// PRODUCTOS
const productos = [
    // Abrigos
    {
        id: "producto-01",
        titulo: "Producto 01",
        imagen:  " ../img/figuras/goku/figura-goku3.jpeg",
        categoria: {
            nombre: "Dragon ball",
            id: "figuraDragonBall",
            id2: "figuras"
        },
        precio: 1000
    },
    {
        id: "producto-02",
        titulo: "Producto 02",
        imagen: "../img/figuras/goku/figura-goku3.jpeg",
        categoria: {
            nombre: "Dragon ball",
            id: "figuraDragonBall",
            id2: "figuras"
        },
        precio: 1000
    },
    {
        id: "producto-03",
        titulo: "Producto 03",
        imagen: "../img/figuras/goku/figura-goku3.jpeg",
        categoria: {
            nombre: "Naruto",
            id: "figuraNaruto",
            id2: "figuras"
        },
        precio: 1000
    },
    {
        id: "producto-04",
        titulo: "Producto 04",
        imagen: "../img/figuras/goku/figura-goku3.jpeg",
        categoria: {
            nombre: "Naruto",
            id: "figuraNaruto",
            id2: "figuras"
        },
        precio: 1000
    },
    {
        id: "producto-05",
        titulo: "Producto 05",
        imagen: "../img/mangas/seinen/seinen-macross.jpg",
        categoria: {
            nombre: "Shonen",
            id: "mangaShonen",
            id2: "mangas"
        },
        precio: 1000
    },
    {
        id: "producto-06",
        titulo: "Producto 06",
        imagen: "../img/mangas/seinen/seinen-macross.jpg",
        categoria: {
            nombre: "Shonen",
            id: "mangaShonen",
            id2: "mangas"
        },
        precio: 1000
    },
    {
        id: "producto-07",
        titulo: "Producto 07",
        imagen: "../img/mangas/seinen/seinen-macross.jpg",
        categoria: {
            nombre: "Seinen",
            id: "mangaSeinen",
            id2: "mangas"
        },
        precio: 1000
    },
    {
        id: "producto-08",
        titulo: "Producto 08",
        imagen: "../img/mangas/seinen/seinen-macross.jpg",
        categoria: {
            nombre: "Seinen",
            id: "mangaSeinen",
            id2: "mangas"
        },
        precio: 1000
    },
    {
        id: "producto-09",
        titulo: "Producto 09",
        imagen: "../img/mangas/seinen/seinen-macross.jpg",
        categoria: {
            nombre: "Seinen",
            id: "mangaSeinen",
            id2: "mangas"
        },
        precio: 1000
    },
    
];

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

cargarProductos(productos)

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

const productosEnCarritoLS=JSON.parse(localStorage.getItem("productos-en-carrito"))
if (productosEnCarritoLS) {
    productosEnCarrito=productosEnCarritoLS
    actualizarNumerito()
}else{
    productosEnCarrito=[]
}

function agregarAlCarrito(e){
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