// ==================================
// SELECCION DE LOS ELEMENTOS DEL DOM
//===================================

//elementos del html para modificar su contenido y visibilidad

const inicio = document.querySelector ('#triviaInicio');
const botonComenzar = document.querySelector ('#triviaComenzar');

const juego = document.querySelector ('#triviaJuego');
const progreso = document.querySelector ('#triviaProgreso');
const vidas = document.querySelector ('#triviaVidas');
const contadorCorrectas = document.querySelector ('#triviaCorrectas');
const estado = document.querySelector ('#triviaEstado');

const preguntas = document.querySelector ('#triviaPreguntas');
const bandera = document.querySelector ('#triviaBandera');
const opciones = document.querySelector ('#triviaOpciones');
const botonSiguiente = document.querySelector ('#triviaSiguiente');

const final = document.querySelector ('#triviaFinal');
const resultado = document.querySelector ('#triviaResultado');
const puntaje = document.querySelector ('#triviaPuntaje');
const jugador = document.querySelector ('#triviaJugador');
const botonReiniciar = document.querySelector ('#triviaReiniciar');

//=======================================
//JUEGO PRINCIPAL: CREACION DE PREGUNTAS
//=======================================

////IDEA PRINCIPAL: hago el pedido de los paises con sus respectivas banderas y los guardo en un array de objetos

// La API solo me permite pedir de hasta 25 paises asi que debo hacer varios pedidos agregando un offset que corre a los siguiente 25 paises
let offset = 0;
const key = "rc_live_ba599f658cb54d278c6fe3f42078a83b"; // esta api key esta restringida a ser usada solo con ciertas paginas como la pagina de github pages de este repositorio, por lo que no es un problema publicarla

let paises = [];
let paisesConBandera = [];

//la funcion pide a la Api 25 paises, los convierte a formato json y los alamcena en el array de paises. Luego pregunta si quedan mas paises por pedir, si la respuesta es si, se agrega un +25 al offset y se hace un nuevo pedido. Esta suma al offset permita que se pida a partir del pais 26 y no se repitan los mismos de antes.

function cargarPaises() {
    const url = "https://api.restcountries.com/countries/v5?offset=" + offset;
    
    fetch(url, {
        headers: {
            "Authorization": "Bearer " + key
        }
    })
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {

        datos.data.objects.forEach(function (pais) {
                paises.push(pais);
        });

        console.log("Países cargados:", paises.length);

        if (datos.data.meta.more == true && paises.length < 250) {
            offset = offset + 25;
            cargarPaises();

        } else {

            console.log("Todos los países fueron cargados");
            console.log(paises.length);
            
            //Como no todos los paises tienen cargada una bandera hago un if que recorra el array y se quede solo con aquellos que tienen una foto de la bandera.
            paises.forEach (function (pais) {
            if (pais.flag.url_png != "") {
                paisesConBandera.push(pais);
            }})
            console.log (paisesConBandera.length);
        }})
}
cargarPaises ();
