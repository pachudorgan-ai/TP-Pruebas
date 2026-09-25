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
const titulo = document.querySelector ('#triviaBandera');
const bandera = document.querySelector ('#imgBandera');
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
const key = 'rc_live_ba599f658cb54d278c6fe3f42078a83b'; // esta api key esta restringida a ser usada solo con ciertas paginas como la pagina de github pages de este repositorio, por lo que no es un problema publicarla

let paises = [];
let paisesConBandera = [];
let paisesUsados = []; //almacena los paises cuyas banderas se usaron para evitar repetir preguntas

let vidasJugador = 3;
let puntos = 0;

//la funcion pide a la Api 25 paises, los convierte a formato json y los alamcena en el array de paises. Luego pregunta si quedan mas paises por pedir, si la respuesta es si, se agrega un +25 al offset y se hace un nuevo pedido. Esta suma al offset permita que se pida a partir del pais 26 y no se repitan los mismos de antes.
async function cargarPaises() {
    try {
        const url = 'https://api.restcountries.com/countries/v5?offset=' + offset;

        const respuesta = await fetch(url, {
            headers: {
                "Authorization": "Bearer " + key
            }
        });

        //Verifica que no haya errores
        if (!respuesta.ok) {
            throw new Error('No se pudieron cargar los países');
        }

        const datos = await respuesta.json();

        //si no hay errores continua con la carga de todos los paises
        datos.data.objects.forEach(pais => {
            paises.push(pais);
        });

        console.log('Países cargados:', paises.length);

        if (datos.data.meta.more == true && paises.length < 250) {

            offset = offset + 25;
            await cargarPaises();

        } else {

            console.log('Todos los países fueron cargados');
            console.log(paises.length);

            //Como no todos los paises tienen cargada una bandera hago un if que recorra el array y se quede solo con aquellos que tienen una foto de la bandera.
            paises.forEach(pais => {
                if (pais.flag.url_png != "") {
                    paisesConBandera.push(pais);
                }
            });

            console.log(paisesConBandera.length);

            let pregunta = generarPregunta();
            let paisCorrecto = pregunta.correcto; //Almaceno la respuesta correcta en su propia variable
            
        }
    } catch (error) {
        console.log('Ocurrió un error:', error);
    }
}

cargarPaises ();

//Creo una funcion para generar los 4 paises utilizados en la opcion multiple, incluyendo el pais con la bandera correcta
function generarPregunta () {
    
    let opcionesPregunta = [];

    let paisesDisponibles = buscarDisponibles (paisesConBandera);

    let paisCorrecto = elegirCorrecto(paisesDisponibles);

    opcionesPregunta.push(paisCorrecto);
    paisesUsados.push(paisCorrecto);

    let opcionesIncorrectas = buscarIncorrectos(paisesConBandera, paisCorrecto);

    opcionesIncorrectas.forEach(pais => {
        opcionesPregunta.push(pais);
    });

    let opcionesMezcladas = mezclar(opcionesPregunta);

    let pregunta = {
    opciones: opcionesMezcladas,
    correcto: paisCorrecto
    };

    //muestro en el HTML la bandera a adivinar
    bandera.innerHTML = '<img src="' + pregunta.correcto.flag.url_png + '">';
    mostrarOpciones(pregunta);

    return pregunta;
}


//Busco los paises que todavia no fueron usados como respuesta correcta
function buscarDisponibles(arreglo) {

    let paisesDisponibles = []; //almacena los paises cuyas banderas no se usaron aun

    arreglo.forEach(pais => {
        if (!paisesUsados.includes(pais)) {
            paisesDisponibles.push(pais);
        }
    });
    return paisesDisponibles;
}


//Se determina aleatoriamente el pais correcto y se guarda en la primera posicion del array
function elegirCorrecto (arreglo) { 
    let numeroCorrecto = Math.floor(Math.random()*arreglo.length);
    let paisCorrecto = arreglo[numeroCorrecto];

    return paisCorrecto;
}

//Se determinan los otros paises para las opciones incorrectas,luego se guardan tambien en el array.
function buscarIncorrectos(arreglo, correcto) {
    let opcionesIncorrectas = [];

    while (opcionesIncorrectas.length < 3) {

        let numero = Math.floor(Math.random() * arreglo.length);
        let paisIncorrecto = arreglo[numero];

        let repetido = false;

        opcionesIncorrectas.forEach(pais => {
            if (pais == paisIncorrecto || pais == correcto) {
                repetido = true;
            }
        });

        if (repetido == false) {
            opcionesIncorrectas.push(paisIncorrecto);
        }
    }

    return opcionesIncorrectas;
}

//Mezclo las opciones para que la primera no sea siempre la correcta
function mezclar(arreglo) {
    return [...arreglo].sort(() => Math.random() - 0.5);
}

//Creo 4 botones en el HTML con las opciones. Al hacer click en alguno se deshabilitan todos. Finalmente corroboro la respuesta correcta y dependiendo el resultado se suman puntos o se resta una vida.
function mostrarOpciones(pregunta) { 

    opciones.innerHTML = "";

    //Creo los 4 botones correspondientes a cada pais
    pregunta.opciones.forEach(pais => {
        opciones.innerHTML += '<button type="button" name="' + pais.names.translations.spa.common + '">' + pais.names.translations.spa.common + '</button>';
    });

    let botones = opciones.querySelectorAll('button');

    //Corroboro la respuesta
    botones.forEach(boton => {
        boton.addEventListener('click', function () {

            if (boton.name == pregunta.correcto.names.translations.spa.common) {

                puntos += 100;
                console.log('Correcto');
                console.log('Puntos:', puntos);

            } else {

                vidasJugador -= 1;
                console.log('Incorrecto');
                console.log('Vidas:', vidasJugador);

            }

            //Deshabilito los botones
            botones.forEach(boton => {
                boton.disabled = true;
            });
            
            //habilito el boton para la siguiente pregunta
            botonSiguiente.hidden = false;

        });
    });
}

//Habilito la funcionalidad del boton para la siguiente pregunta
botonSiguiente.addEventListener('click', function () {
    generarPregunta();
    botonSiguiente.hidden = true;