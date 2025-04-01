import { main , panel } from "./Vars_mod.js";

//Modulo de paneles

export function panelActive(e){
    
    console.log("Deberias estar en la seccion: "+this.getAttribute('data-panel'));

    main.classList.toggle('show');
    panel.classList.toggle('show');
    eliminarPaneles(this.getAttribute('data-panel'));

    switch(this.getAttribute('data-panel')){
        case "daily":
            console.log("DAILY");
            
            eliminarPaneles('daily');

            dailyPanel.crearPanel();

            break;
        case "quest":
            console.log("QUEST");
            eliminarPaneles('quest');

            break;
        case "inventory":
            console.log("INVENTORY");
            break;
        case "status":
            console.log("STATUS");
            break;
        case "system":
            console.log("SYSTEM");
            break;

        default:
            console("==== Opcion alternativa ====");
    }
}


function eliminarPaneles(x){
    if(x != "daily"){
        dailyPanel.eliminarPanel();
    }


}

const dailyPanel = {
    titulo: "daily",
    icono: "assets/Flecha.png",
    
    cuerpo:["Auto Daily Quest", "Title Quest: Vector Dungeon"],
    orientacion: "View the missions for today",
    advice: "If the time to do it start, you will be notified",

    opciones: ["Ok", "Cancel"],

    crearPanel(){
        const cabecera = document.createElement('div');
        cabecera.classList.add('cabecera');
        cabecera.classList.add('flexible');
        cabecera.classList.add('muestra');

        const icono = document.createElement('img');
        icono.classList.add('img-title');
        icono.src = "assets/Flecha.png";

        const seccion = document.createElement('section');
        seccion.id = "title";
        seccion.classList.add('title-content');
        seccion.classList.add('flexible');

        const titulo = document.createElement('section');
        titulo.id = "title";
        titulo.classList.add('title');
        titulo.innerHTML = this.titulo;

        panel.appendChild(cabecera);
        seccion.appendChild(titulo);

        cabecera.appendChild(icono);
        cabecera.appendChild(seccion);


        const cuerpo = document.createElement('div');
        cuerpo.id = "cuerpo";
        cuerpo.classList.add('cuerpo');
       // cuerpo.classList.add('flexible');
        cuerpo.classList.add('muestra');

        const texto = document.createElement('span');
        texto.classList.add("text-orientation");
        texto.innerHTML = this.orientacion;

        const contenido = document.createElement('div');
        contenido.id = "cuerpo-contenido";
        contenido.classList.add('cuerpo-contenido');
        contenido.classList.add('flexible');

        this.cuerpo.forEach(opcion => {
            console.log(opcion);

            const mision = document.createElement('section');
            mision.classList.add('list');
            mision.id = "prueba";
            mision.innerHTML = opcion;

            contenido.appendChild(mision);
        });

        cuerpo.appendChild(texto);
        cuerpo.appendChild(contenido);
        panel.appendChild(cuerpo);
        
        const pie = document.createElement('div');
        pie.id = "pie-panel";
        pie.classList.add("flexible");
        pie.classList.add("selection-content");
        
        this.opciones.forEach(multi => {
            console.log(multi);

            const opciones = document.createElement('button');
            opciones.classList.add('selection-btn');
            opciones.innerHTML = multi;

            pie.appendChild(opciones);
        });


        panel.appendChild(pie);
        return panel;




  
    },

    eliminarPanel(){
        panel.removeChild(cuerpo);
        panel.removeChild(pie);
        panel.removeChild(cabecera);

    }
}
