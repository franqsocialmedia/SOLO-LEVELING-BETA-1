/*
    El siguiente paso es crear listas de informacion y lograr mostrarlas en un panel diferente. La logica es crear panel al seleccionar la seccion y destruirla al dale a cancelar u ok.

    Esta 1ra etapa de la aplicacion finaliza con la creacion de las misiones diarias segun el Modo (la poca lista de tareas que yo haya puesto para entonces) y la realizacion o no de las mismas.

    La 2da etapa finaliza cuando se pueda crear una mazmorra correctamente (por titulo y secreta) junto a la penalizacion. Y a su vez los rewards que se obtienen al ganar.

    La 3ra etapa finaliza cuando el inventario puede conseguir objetos y usarlos, establecer el banco y equipar herramientas.

    La 4ta etapa finaliza con la distribucion de las puntos de habilidad, los ajustes del Systema y los estados del jugador (enfermo, feliz, envenedado, etc)

    La 5ta etapa concluye con las misiones agendadas + mazmorras segun el titulo, la creacion de enemigos segun su tipo y la creacion del Boss Monster

    La 6ta etapa culmida con la musica fragmentada que se activa segun el dia y las secciones (inicio, ingame, dungeon y boss monster) + la experiencia que proveen

    La 7ma etapa es el pulido visual de la app, para que pueda ser responsive.

    La 8va etapa es lograr guardar a tu jugador en el LocalStorage y acceder a el cada vez que inicias el juego. Probando que todo queda como se ha dejado. Mas un reporte de estado del jugador en Consola.

    la 9na etapa es el ajuste del algoritmo para que los rewards, los titulos, las habilidades, las misiones secretas y las misiones diarias sean suficientemente efectivas en su randomizacion dando prioridad a una cosa mas que a otra, segun el nivel, clase, titulo y modo en que se juega.

    La 10ma y ultima etapa es la expansion de las misiones diarias, titulos, habilidades, rewards, items, misiones secretas y Boss Monsters para dar suficientes variantes del mismo. De esta forma habra mucho mas dinamica y novedad del juego 
    + convertirlo en una APK para Android + crear los paneles de ayuda segun la seccion y panel en el que se encuentre.

    Ya lo que restaria despues de todo esto es ajustar los bugs y errores; mejorar los graficos; para finalmente hacerle una campaña completa de promocion multimedia.

*/    
    
    import { hpBar , mpBar , dailyBtn , statusBtn , questBtn , inventoryBtn , modeBtn , fatigueBtn , adviceBtn , iteractionBtn , helpBtn} from "./modules/Vars_mod.js";
    import { player } from "./modules/Player_mod.js";
    import { panelActive } from "./modules/Panels_mod.js";
    import { updateProgressBar , daytime , reduceValue, lifeReduction  } from "./modules/Timeout.js";
    import { stopwatch , counter } from "./modules/Components.js";
    
    daytime('10:20','02:10');
    export var timer;
    export var Lifetimer;

    Lifetimer = setInterval(lifeReduction,1000);
    console.log("PLAYER STATE: "+ player.state);

// CAMBIAR POR EL INICIO DE LAS MISIONES
    helpBtn.addEventListener('click' , stateChanger);
    stateChanger();

    adviceBtn.addEventListener('click' , stopwatch.count);

    

    function stateChanger(){

        if (player.state == "activo"){
    
            player.state = "descanso";
            console.log("---- MODO: DESCANSO");

            Lifetimer = setInterval(lifeReduction, 1000);
            updateProgressBar();
    
        }else if(player.state == "descanso"){
    
            player.state = "activo";
            console.log("---- MODO: ACTIVO EN UNA MISION");
    
            timer = setInterval(reduceValue, 1000);
            updateProgressBar();
        }
    }


    hpBar.setAttribute('max',player.hp);
    hpBar.setAttribute('value',player.hp);
    mpBar.setAttribute('max',player.mp);
    mpBar.setAttribute('value',player.mp)

    dailyBtn.addEventListener('click', panelActive);
    statusBtn.addEventListener('click', panelActive);
    questBtn.addEventListener('click', panelActive);
    inventoryBtn.addEventListener('click', panelActive);

    modeBtn.addEventListener('click', panelActive);
    fatigueBtn.addEventListener('click', panelActive);
    adviceBtn.addEventListener('click', panelActive);

    iteractionBtn.addEventListener('click', panelActive);
    helpBtn.addEventListener('click', panelActive);


        




