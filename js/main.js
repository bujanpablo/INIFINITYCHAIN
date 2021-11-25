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

function renderizarProductos() {
    for (const producto of productos) {
        $(".milista").append(`<li class="col-4 list-group-item">
        <h3 style="centered"> ${producto.class} </h3>
        <img src=${producto.foto} width="100%">
        <p> Axie: ${producto.class}</p>
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
        <td>${productoNuevo.class}</td>
        <td>${productoNuevo.price}</td>
    </tr>`);
    let guardaProducto = localStorage.setItem(productoNuevo);
    console.log(guardaProducto);
}




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

//API Localizacion por IP 
const settings = {
    "async": true,
    "crossDomain": true,
    "url": "https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/",
    "method": "GET",
    "headers": {
        "x-rapidapi-host": "ip-geolocation-ipwhois-io.p.rapidapi.com",
        "x-rapidapi-key": "ffea4a0023mshed8044148f86ceep1aa76fjsnf0cda36c1b23"
    }
};

$.ajax(settings).done(function(response) {
    console.log(response);
});

//MODAL VALIDACION EDAD
function preguntarEdad() {
    var edad = localStorage.getItem("edad");
    if (edad == null) {
        $("#modal-edad").modal("show");
    } else {
        validarEdad(edad);
    }
}

function guardarEdad() {
    const edad = $("#validar-edad").val();
    if (edad.trim() != "") {
        localStorage.setItem("edad", edad);
        $("#modal-edad").modal("hide");
        validarEdad(edad);
    }
}

function validarEdad(edad) {
    if (edad < 18) {
        $("#modal-menor").modal("show");
        var formulario = document.getElementById("customer");
        formulario.parentNode.removeChild(formulario);
        $("#tablabody").hide();
        $(".milista").hide();
    }
}