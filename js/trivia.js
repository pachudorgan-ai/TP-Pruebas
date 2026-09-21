// ==================================
// SELECCION DE LOS ELEMENTOS DEL DOM
//===================================

//pedido de la API
// La API solo me permite pedir de hasta 25 paises asi que debo hacer varios pedidos.
const url = "https://api.restcountries.com/countries/v5";
const urlDos = "https://api.restcountries.com/countries/v5?offset=25";
const key = "rc_live_ba599f658cb54d278c6fe3f42078a83b"; // esta api key esta restringida a ser usada solo con ciertas paginas como mi pagina de github y el pages

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

//================
//JUEGO PRINCIPAL
//================

//hago el pedido de los paises con sus respectivas banderas y los guardo en un array de objetos
// La API solo me permite pedir de hasta 25 paises asi que debo hacer varios pedidos.
let paises = [];

fetch (url, {
    headers: {
        "Authorization": "Bearer " + key
    }
})
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        paises = datos.data.objects;
        console.log(paises);
        console.log(paises[0]);
        console.log(paises[0].names);
        console.log(paises[0].names.translations);
        console.log(paises[0].flag);

        console.log(paises[1].names.translations.spa.common);
        console.log(paises[1].flag.url_png);
    });

    fetch(urlDos, {
    headers: {
        "Authorization": "Bearer " + key
    }
})
    .then(function (respuesta) {
        return respuesta.json();
    })
    .then(function (datos) {
        console.log(datos);
    });