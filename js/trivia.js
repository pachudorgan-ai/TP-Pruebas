// ==================================
// SELECCION DE LOS ELEMENTOS DEL DOM
//===================================

//pedido de la API
const url = "https://api.restcountries.com/countries/v5";
const key = MI_API_KEY; // esta api key esta restringida a ser usada solo con ciertas paginas como mi pagina de github y el pages

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


//hago el pedido de los paises con sus respectivas banderas y los guardo en un array de objetos

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
        paises = datos
        console.log(datos);
        console.log(paises[0]);
        console.log(paises[0].name);
        console.log(paises[0].name.translations.spa);
        console.log(paises[0].flags);
    });
