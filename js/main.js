//--------------------------------------------------------------//

//OBTENER DOLAR ACTUALIZADO

let precioVenta = 1;


//CARRITO

let carrito = [];




$(document).ready(function() {

    //OBTENER DOLAR ACTUALIZADO
    const obtenerValorDolar = () => {
        const APIURL = "https://www.dolarsi.com/api/api.php?type=valoresprincipales";
        $.ajax({
            method: "GET",
            url: APIURL,
            success: function(data) {
                const dolarBlue = data.find(item => item.casa.nombre === 'Dolar Blue');
                if (dolarBlue.casa.venta) {
                    precioVenta = parseFloat(dolarBlue.casa.venta);
                }
                //llamada a renderizar
                renderizarProductos();

                if (localStorage.getItem('carrito')) {
                    const carritoTemporal = JSON.parse(localStorage.getItem('carrito'));

                    for (let i = 0; i < carritoTemporal.length; i++) {
                        agregarAlCarrito(carritoTemporal[i].producto, true);
                    }
                }
            }
        });
    }

    obtenerValorDolar();



    //SELECTOR PARA ORDENAR PRODUCTOS
    $("#miSeleccion").on('change', function() {
        ordenar();
    });
    $("#miSeleccion option[value='pordefecto']").attr("selected", true);
});

//CREO TABLA PARA RENDERIZAR PRODUCOTS
function renderizarProductos() {
    for (const producto of productos) {
        $(".milista").append(`<li class="col-4 list-group-item list-item-axie">
        <h3 style="centered"> ${producto.name} </h3>
        <img src=${producto.foto} width="100%">
        <p> Axie: ${producto.name}</p>
        <p><strong> $ ${producto.price*precioVenta} </strong></p>
        <button type="button" class="btn btn-primary btn-lg" id='btn${producto.id}'>      Buy your Axie     </button>
        </li>`);
        //Evento para cada boton
        $(`#btn${producto.id}`).on('click', function() {
            agregarAlCarrito(producto);
        });
    }
}

//AGREGAR PRODUCTOS AL CARRITO
function agregarAlCarrito(productoNuevo, pageLoad = false) {
    let proximoId;

    if (carrito[carrito.length - 1]) {
        proximoId = carrito[carrito.length - 1].id + 1;
    } else {
        proximoId = 0;
    }

    const nuevoProducto = {
        id: proximoId,
        producto: productoNuevo
    };
    carrito.push(nuevoProducto);

    console.log(carrito);
    !pageLoad && Swal.fire(
        'You added an NFT to your Cart.',
        productoNuevo.class,
        'success'
    ); //DIBUJO TABLA
    $("#tablabody").append(`
    <tr>
        <td width="15%"><img src=${productoNuevo.foto} width="50%"></td>
        <td>${productoNuevo.id}</td>
        <td>${productoNuevo.name}</td>
        <td>USD ${productoNuevo.price}</td>
        <td><button class="btn btn-danger delete" id="delete-${nuevoProducto.id}">X</button></td>
    </tr>`);

    addEvent_borrar(nuevoProducto.id);
    totalCarro();

    //AGREGO PRODUCTOS AL LOCALSTORAGE
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Borrar Producto
function addEvent_borrar(idProducto) {

    let btnDelete = document.getElementById(`delete-${idProducto}`);

    console.log(btnDelete);

    btnDelete.addEventListener('click', borraLinea);

    function borraLinea() {

        btnDelete.parentNode.parentNode.remove();

        console.log(btnDelete.parentNode.parentNode);

        const indexProducto = carrito.findIndex(item => item.id === idProducto);

        carrito.splice(indexProducto, 1);

        localStorage.setItem("carrito", JSON.stringify(carrito));

        totalCarro();

    }


}

//CALCULO TOTAL DE CARRITO
function totalCarro() {
    let total = 0;
    for (const serv of carrito) {
        total += (serv.producto.price);
        console.log(total);
    }
    const totalServicios = document.getElementById("resumen-total");
    totalServicios.innerHTML = `AR$ ${total*precioVenta}`;

}


const tableConteiner = document.getElementById("resumen-total");



//ORDEN DE PRODUCTOS
function ordenar() {
    let seleccion = $("#miSeleccion").val();
    //console.log(seleccion);
    if (seleccion == "menor") {
        //ordeno el array de productos por precio de menor a mayor
        productos.sort(function(a, b) { return a.price - b.price });
    } else if (seleccion == "mayor") {
        //ordeno el array de productos por precio de mayor a menor
        productos.sort(function(a, b) { return b.price - a.price });
    } else if (seleccion == "alfabetico") {
        //ordeno por orden alfabetico
        productos.sort(function(a, b) {
            return a.class.localeCompare(b.class);
        });
    }
    $(".list-item-axie").remove();
    renderizarProductos();
}

//BOTON DE COMPRA Y LIMPIO CARRO
$(document).ready(function() {
    $(".btnCompra").click(function() {

        carrito = [];
        document.getElementById('tablabody').innerHTML = '';
        localStorage.setItem('carrito', JSON.stringify([]));
        totalCarro()

        Swal.fire({
            title: 'Thank You for your purchase',
            width: 600,
            padding: '3em',
            background: '#fff url(https://img.freepik.com/free-vector/abstract-paper-hexagon-white-background_51543-213.jpg?size=626&ext=jpg)',
            backdrop: `
              rgba(0,0,123,0.4)
              url("https://media.giphy.com/media/vS8deMiryn69PFGwJQ/giphy.gif")
              left top
              no-repeat
            `
        })
    });
});