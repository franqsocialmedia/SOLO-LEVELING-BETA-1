import { player } from "./Player_mod.js";
import { main , panel , fatigue, wholeBody} from "./Vars_mod.js";

var section;
var span;
var button;

//Modulo de paneles
export function panelActive(e){
    
    console.log("BOTON: "+this.getAttribute('data-panel'));

//    main.classList.toggle('hide');
 //   panel.classList.toggle('hide');
    

    switch(this.getAttribute('data-panel')){
        case "daily":
            console.log("DAILY");
            dailyPanel.crearPanel();
        break;

        case "quest":
            console.log("QUEST");
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

        case "fatigue":
            console.log("FATIGUE");
            fatiguePanel.crearPanel("abrir");
        break;

        case "ok":
            console.log("OK");
            fatiguePanel.crearPanel(this.getAttribute('data-action'));
        break;

        default:
            console("==== Opcion alternativa ====");
    }
}

const fatiguePanel = {
    titulo: "fatigue",
    
    opciones: ["Take a Break", "Hide"],

    crearPanel(x){
        //alert("no");

       switch(x){
            case "abrir":
                panel.classList.toggle("hide");
                bkg.classList.toggle("hide");
                section = document.createElement('section');
                span = document.createElement('span');    
     
                section.setAttribute("data-panel","fatigue"); 
                section.innerHTML = "FATIGUE: ";
                section.classList.add('new-Panel');    

                var sectionContent = document.createElement('section');
                sectionContent.classList.add('new-Panel');        
                sectionContent.setAttribute("data-panel","fatigue"); 
                
                
                span.classList.add("fatigue-porcent_big");
                span.innerHTML = Math.floor(player.fatigue)+"%";

                section.appendChild(span);
                sectionContent.appendChild(section);

            this.opciones.forEach(elemento => {
            
                if(elemento == "Take a Break"){
                    button = document.createElement('button');
                    button.setAttribute("data-panel", "ok");
                    button.setAttribute("data-action", elemento);     
                    button.innerHTML = elemento;
                    
                    if(player.state == "activo"){    
                        button.classList.add('option-btn');
                    }
                    else{            
                        button.classList.add('disabled_option-btn');
                        button.disabled = true;
                    }
                    button.addEventListener('click', panelActive);
                    sectionContent.appendChild(button);
                    panel.appendChild(sectionContent);
                };
                
                if(elemento == "Hide"){
                    button = document.createElement('button');
                    button.setAttribute("data-panel", "ok");
                    button.setAttribute("data-action", elemento);    
                    button.innerHTML = elemento;
                    button.classList.add('option-btn');

                    button.addEventListener('click', panelActive);
                    sectionContent.appendChild(button);
                    panel.appendChild(sectionContent);
                }
                
            });
                
            break;
        
        case "cerrar":        
            panel.classList.toggle("hide");
            bkg.classList.toggle("hide");
        break;
        
        case "Hide":        
            document.querySelector(".new-Panel").remove();

            panel.classList.toggle("hide");
            bkg.classList.toggle("hide");
        break;
       }

        panel.style.width = "80%";
        panel.style.height = "20%";
        panel.style.left ="10%";
        panel.style.top = "40%";

        bkg.style.width = window.innerWidth;
        bkg.style.height = window.innerHeight;
        bkg.style.top = 0;
        bkg.style.left = 0;

    },
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
