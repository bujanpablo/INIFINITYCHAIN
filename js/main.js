//COLOR HEART EN CARDS
clicked = true;
$("button").click(function() {
    if (clicked) {
        $(this).css('color', 'red');
        clicked = false;
    } else {
        $(this).css('color', 'grey');
        clicked = true;
    }
});


//ANIMAR SCROLL
$("#paraAnimar").click(function() {
    console.log("click en NFTS");
    $('html').animate({
        scrolltop: $("#NFTS").offset().top
    }, 2000);

})

//ANIMAR PANEL BLOG
$(document).ready(function() {
    $("#flip").click(function() {
        $("#panel").slideToggle("slow");
    });
});

//--------------------------------------------------------------//

//CARRITO

let carrito = [];


$(document).ready(function() {
    //llamada a renderizar
    renderizarProductos();

    //Selector con ordenamiento
    $("#miSeleccion").on('change', function() {
        ordenar();
    });
    $("#miSeleccion option[value='pordefecto']").attr("selected", true);
});

//Creo Tabla Renderizada
function renderizarProductos() {
    for (const producto of productos) {
        $(".milista").append(`<li class="col-4 list-group-item">
        <h3 style="centered"> ${producto.name} </h3>
        <img src=${producto.foto} width="100%">
        <p> Axie: ${producto.name}</p>
        <p><strong> $ ${producto.price} </strong></p>
        <button type="button" class="btn btn-primary btn-lg" id='btn${producto.id}'>      Buy your Axie     </button>
        </li>`);
        //Evento para cada boton
        $(`#btn${producto.id}`).on('click', function() {
            agregarAlCarrito(producto);
        });
    }
}

//AGREGAR PRODUCTOS AL CARRITO
function agregarAlCarrito(productoNuevo) {
    carrito.push(productoNuevo);
    console.log(carrito);
    Swal.fire(
        'You added an NFT to your Cart.',
        productoNuevo.class,
        'success'
    );
    $("#tablabody").append(`
    <tr>
        <td width="15%"><img src=${productoNuevo.foto} width="50%"></td>
        <td>${productoNuevo.id}</td>
        <td>${productoNuevo.name}</td>
        <td>$ ${productoNuevo.price}</td>
        <td><button class="btn btn-danger delete">X</button></td>
    </tr>`);


    addEvent_borrar();
    totalCarro();

    //Lo agrego al Local Storage
    localStorage.setItem("carrito", JSON.stringify(carrito));
}

//Borrar Producto
function addEvent_borrar() {

    let btnDelete = document.querySelectorAll('.delete');

    console.log(btnDelete);

    btnDelete.forEach(element => {

        element.addEventListener('click', borraLinea);





        function borraLinea() {


            element.parentNode.parentNode.remove();


            console.log(element.parentNode.parentNode);

            carrito.splice(element.parentNode.parentNode, 1);

            totalCarro();


        }

    })

}

//Total Carrito
function totalCarro() {
    let total = 0;
    for (const serv of carrito) {
        total += serv.price;
        console.log(total);
    }
    precioUnitario.innerHTML = total;
    totalServicios.innerHTML = carrito.length;

}


const tableConteiner = document.getElementById("resumen-total");

let precioTotal = document.createElement("td");
precioTotal.innerHTML = "$";
tableConteiner.appendChild(precioTotal);

let precioUnitario = document.createElement("td");
precioUnitario.innerHTML = "0";
tableConteiner.appendChild(precioUnitario);








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
    $("li").remove();
    renderizarProductos();
}

//BOTON DE COMPRA
$(document).ready(function() {
    $(".btnCompra").click(function() {
        Swal.fire({
            title: 'Thank Your for your purchase',
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