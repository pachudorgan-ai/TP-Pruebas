<h2>Universidad Nacional de las Artes <br>
Lic. en Artes Multimediales <br>
Informatica General 1- Drelichman TM <br>
2026 <br>
Dorgan (44448957), Hochnadel (), La Rosa () <br></h2>

<h2>Documentación del proceso</h2>
<p>  El proyecto comenzó con un encuentro presencial donde pensamos los diferentes juegos que teníamos planeado hacer y también nos decidimos por dividir las diferentes partes del trabajo de la manera más equitativa posible. Por un lado Gabriella se encarga del juego de cartas y la página de puntajes; por otro lado Anita realiza el juego de dados, al igual que el índex y la estructura HTML principal de las páginas (nav, header, footer, etc.). Finalmente Mav se ocupa de el juego de preguntas, la página de información personal y el css general de todas las páginas. Luego de este encuentro cada una comenzó a trabajar por su cuenta, pero manteniendo la comunicación si se necesitaba una ayuda.<p/>

<h3>Página de preguntas:</h3>
<p>  Para la página de preguntas se comenzó por una conversación con la inteligencia artificial (ChatGPT) para ayudar a desarmar la idea en diferentes pasos y un diagrama de flujo que otorgue una linea general o pseudo código y así descomponer el proceso en partes más simples. También a medida que se desarrollaba la conversación se fueron realizando cambios a la idea original para adaptarlo mejor a las posibilidades y los objetivos. La idea original era una trivia de 10 preguntas donde se enseñaba una bandera y se debía adivinar el país; luego se modificó para que el límite de preguntas sean todos los países conseguidos pero que haya un total de 3 vidas que se restan al responder incorrectamente. De esta manera hay dos caminos: perder todas las vidas, donde tu puntaje se da segun la cantidad de preguntas correctas; o adivinar correctamente todos los países y ganar, consiguiendo el puntaje máximo. Esto complejizó el código pero trajo también un sistema de puntaje más interesante. <br>
  
  Los primeros días consistieron en aprender a hacer el pedido a la API correctamente, cómo pedir una lista completa de países y guardarlos en un array. Luego se genero una función para crear la pregunta. Ésta debía: elegir aleatoriamente el país que se consideraría correcto utilizando `Math.random()` junto con `Math.floor()`; guardarlo en una variable para no perderlo, elegir otros 3 países de manera aleatoria tambien para las opciones incorrectas y luego mezclar todas las opciones para que no siempre la primera sea la correcta con un `[...].sort`. Una vez realizada una pregunta, ese país "correcto" no podía volver a aparecer como opción, por lo que se debió crear un array que me indique que paises estan disponibles para usar y otro que diga cuales ya fueron utilizados para no repetirse. <br>
  
  Una vez resuelta la pregunta, se paso a hacer el sistema de vidas, puntos y progreso. Se comienza con tres vidas y 0 puntos. Con un `if` se determina dependiendo del resultado de la pregunta si se suman 100 puntos o se resta una vida. Además se le suma +1 al contador del progreso que indica cuantas preguntas pasaron. Una vez llegadas a las 0 vidas o terminado el array de países, se dejan de generar más preguntas y se pasa a la sección final. Dependiendo el motivo por el cual se terminó el juego se muestra un mensaje distinto (ganaste o perdiste) y se le permite al jugador guardar en el `localStorage` su nombre y puntaje. <br>

  El último paso consistió en ensamblar todo. Primero se mostraria la sección `Inicio` con las reglas de juego. Al clickear el botón `Comenzar` se oculta esta sección y se muestra la siguiente. Se realiza el pedido a la API y se ejecuta la funcion `cargarPregunta()`. Una vez terminado el juego se oculta la sección y se desoculta la final, donde se habilita el `form` para almacenar el nombre y puntaje y se agrega un botón para `Reiniciar`.
</p>

<h4>Uso de la API</h4>
<p>  Para realizar el juego de preguntas se utilizó la API llamada REST Countries (https://restcountries.com/). Esta brinda datos como el nombre del país, su bandera, capital, región, población y otros datos relacionados. En este proyecto se utilizan principalmente el nombre del país en español y la URL de su bandera. La información de cada país llega dentro de un objeto al cual se puede acceder a sus propediades. Para realizar un pedido a través de Js, se utiliza un fetch () con el siguiente endpoint: "https://api.restcountries.com/countries/v5". Se necesita de una API Key individual gratuita, la cual debe aclararse dentro de la solicitud con el header "Authorization": "Bearer " + key; y a pesar de tener algunas limitaciones es bastante permisiva. Como la API devuelve los países en grupos, se realizan varias consultas utilizando los parámetros offset y limit. El parámetro limit determina cuántos países se solicitan en cada consulta, mientras que offset indica desde qué posición comenzar. <br>
  Una vez recibida la información, los datos son recorridos mediante forEach(). Durante este proceso se crea dentro de un array, un objeto para cada país que contiene únicamente la información necesaria para la trivia, principalmente: el nombre y el URL del PNG de la bandera. El procesamiento de los datos permite que la trivia no tenga que trabajar constantemente con toda la información que proporciona la API, sino solamente con los datos necesarios para el funcionamiento del juego. La información obtenida de REST Countries se utiliza para generar las preguntas de la trivia. En cada pregunta se selecciona un país como respuesta correcta, al igual que su bandera correspondiente; y se obtienen otros tres países para utilizarlos como respuestas incorrectas. De esta manera, el jugador recibe cuatro opciones de banderas.
</p>

<h3>Juego de cartas — Memotest</h3>

<p>
    El juego consiste en un memotest de temática naturaleza. El jugador debe encontrar
    todas las parejas de cartas iguales, eligiendo un nivel de dificultad que determina
    la cantidad de cartas del tablero.
</p>

<h4>Estructura HTML</h4>

<p>Se creó la estructura de la página del juego, incluyendo:</p>

<ul>
    <li>Una sección de presentación con las instrucciones.</li>
    <li>Un formulario para ingresar el nombre del jugador y seleccionar el nivel.</li>
    <li>Un botón para comenzar la partida.</li>
    <li>Una sección con los datos de la partida: intentos, parejas encontradas y nivel elegido.</li>
    <li>Un contenedor para generar las cartas dinámicamente.</li>
    <li>Un botón para reiniciar el juego.</li>
</ul>

<p>El nivel se selecciona mediante un <code>select</code> con tres opciones:</p>

<ul>
    <li>Fácil: 6 pares (12 cartas).</li>
    <li>Medio: 8 pares (16 cartas).</li>
    <li>Difícil: 10 pares (20 cartas).</li>
</ul>

<h4>Generación del mazo</h4>

<p>
    En JavaScript se creó la función <code>generarMazo()</code>, que genera las cartas
    según la cantidad de pares seleccionada. Se utiliza un <code>while</code> para
    completar el mazo y <code>Math.random()</code> junto con <code>Math.floor()</code>
    para seleccionar imágenes al azar. También se controla que cada imagen aparezca
    como máximo dos veces para formar las parejas.
</p>

<p>
    Cada carta se guarda en un array aparte como un objeto con un identificador de imagen (el número de la imagen), la ruta de la
    imagen y los estados de la carta (visible u oculta) y de la pareja(true si se encontró y false si aún no).
</p>

<h4>Inicio de la partida</h4>

<p>
    Al presionar <strong>“Comenzar partida”</strong>, se obtiene el nombre y el nivel
    seleccionado mediante <code>querySelector()</code>. Antes de comenzar se verifica
    que el jugador haya ingresado un nombre y seleccionado un nivel.
</p>

<p>
    Mediante un <code>switch</code> se genera la cantidad de cartas correspondiente al
    nivel elegido. Las imágenes se agregan al tablero utilizando <code>innerHTML</code>
    dentro de un ciclo <code>for</code>.
</p>

<p>
    Una vez iniciada la partida, se deshabilita el campo de configuración y se habilita
    el botón de reinicio.
</p>

<h4>Comparación de cartas</h4>

<p>
    Se creó la función <code>sonIguales()</code>, que compara los identificadores de
    las imágenes seleccionadas. Si coinciden, las cartas pasan a estado visible y se
    incrementa la cantidad de parejas encontradas.
</p>

<h4>Reinicio</h4>

<p>
    El botón <strong>“Reiniciar juego”</strong> elimina las cartas del tablero,
    reinicia los contadores y vuelve a habilitar el formulario para comenzar una
    nueva partida.
</p>

<h3>Declaración del uso de IA</h3>
- Ayuda para pensar los juegos
- 
<h4>Mav Dorgan:</h4>
<p>Declaro el uso de Inteligencia Artificial a través de la aplicación ChatGPT. La IA fue utilizada en primer lugar como ayuda para deconstruir la página en pseudocódigo a modo de guía y buscar mejorar la idea original. Luego se le encargó la lectura del documento de la API para sacar los términos y puntos principales, y saber realizar el pedido correctamente. En cuanto a la hora de programar, fue utilizada como un apoyo secundario a la hora de resolver problemas, para evitar estar tiempo innecesario resolviendo un mismo problema. Fue utilizada como soporte y ayuda cuando no se podían resolver errores en el código Js por propia cuenta. En todos los casos primero se escribió el código por mi cuenta y luego utilizaba la IA en caso de encontrar un obstáculo que no se podía resolver.</p>

<h4>Gabriella La Rosa:</h4>
<p>
    Declaro el uso de Inteligencia Artificial a través de las aplicaciones ChatGPT y Claude.
    <strong>ChatGPT:</strong> La utilicé para la redacción de la documentación y de esta declaración,
    la organización de las ideas del juego, la definición de sus funcionalidades y la división del
    problema general en etapas para facilitar la programación. También generé un pseudocódigo que
    me sirvió para orientarme y estructurar el paso a paso del algoritmo.
    <strong>Claude:</strong> La usé para comprender conceptos, consultar dudas y analizar posibles
    errores en el código. También sirvió como apoyo para explorar distintas formas de resolver los
    problemas que surgían durante el desarrollo. Además, la utilicé para generar comentarios
    en partes del código donde se me había pasado agregarlos, editar los textos de los commits para
    que quedaran más claros y mejor redactados, y detectar y corregir posibles bugs que quedaron
    luego de haber escrito el código.
</p>
