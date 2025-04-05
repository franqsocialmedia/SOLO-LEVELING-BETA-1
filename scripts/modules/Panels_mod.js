import { player } from "./Player_mod.js";
import { main , panel , fatigue, wholeBody, bkg} from "./Vars_mod.js";

var sectionContent;
var section;
var span;
var button;
var dataElement;
var dataPanel;
var dataAction;
var parentContent;
var panelSelect;
var no = 0;
var panelName;
var newID;

//Modulo de paneles
export function panelActive(e){
if(event){
    dataElement = document.getElementById(this.id);
    dataPanel = dataElement.getAttribute('data-panel');
    dataAction = dataElement.getAttribute('data-action');
}else{
    dataElement = main;
    dataPanel = "main";
    dataAction = "nuevoPanel";
}

    switch(dataPanel){
        case "main":
            console.log("MAIN");
            panelName = mainPanel;

            parentContent = main;
            panelSelect = parentContent.id;
            crearPanel(dataAction);
        break;

        case "daily":
            console.log("DAILY");
            panelName = dailyPanel;

            parentContent = dataElement.parentNode;
            panelSelect = parentContent.id;
            crearPanel(dataAction);
        break;

        case "quest":
            console.log("QUEST");
            panelName = questPanel;

            parentContent = dataElement.parentNode;
            panelSelect = parentContent.id;
            crearPanel(dataAction);
        break;
        
        case "inventory":
            console.log("INVENTORY");
            panelName = inventoryPanel;

            parentContent = dataElement.parentNode;
            panelSelect = parentContent.id;
            crearPanel(dataAction);
        break;
        
        case "status":
            console.log("STATUS");
            panelName = statusPanel;

            parentContent = dataElement.parentNode;
            panelSelect = parentContent.id;
            crearPanel(dataAction);
        break;
        
        case "system":
            console.log("SYSTEM");
            panelName = systemPanel;

            parentContent = dataElement.parentNode;
            panelSelect = parentContent.id;
            crearPanel(dataAction);
        break;

        case "fatigue":
            console.log("FATIGUE");
            panelName = fatiguePanel;

            parentContent = dataElement.parentNode;
            panelSelect = parentContent.id;

//            confirm(parentContent);
  //          confirm(panelSelect);
            crearPanel(dataAction);
        break;

        default:
            console("==== Opcion alternativa ====");
    }
}

function infoPanel(panel , array){

    for(var x=0; x<array.length; x++){
        //confirm(array[x]);
    }
}

//Los paneles segun las secciones estan distribuidas aqui con un Switch que analiza el DataAction del boton. 
function crearPanel(x){
        
       // confirm("Se activo: "+x);
       // confirm("Del panel: "+dataPanel);

       switch(x){
        //El caso nuevoPanel es para crear el panel flotante el cual con la funcion styleAdj se ajustara segun el caso del dataPanel.
            case "nuevoPanel":
                infoPanel(panelName.titulo , panelName.opciones);
                
                section = document.createElement('section');
                span = document.createElement('span');    
                sectionContent = document.createElement('section');

                panelName.contentPanel();
                crearBotones();

                no = no + 1;
            break;
        
            case "Cancel":                   
                parentContent.remove();
                panel.classList.toggle("hide");
                bkg.classList.toggle("hide");
            break;
            
            case "Take a Break":        
                player.state = "descanso";
                dataElement.classList.toggle('disabled_option-btn');
                dataElement.disabled = true;
            break;
            
            case "Hide":        
                parentContent.remove();
                panel.classList.toggle("hide");
                bkg.classList.toggle("hide");
            break;
       }
      panelName.styleAdj();
    };


function crearBotones(){
    //Creacion de botones
    panelName.opciones.forEach(elemento => {

        if(elemento == "Take a Break"){
            button = document.createElement('button');
            button.setAttribute("data-panel", dataElement.getAttribute("data-panel"));
            button.setAttribute("data-action", elemento);     
            button.id = elemento;     
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
            button.setAttribute("data-panel", dataElement.getAttribute("data-panel"));
            button.setAttribute("data-action", elemento);
            button.id = elemento;         
            button.innerHTML = elemento;
            button.classList.add('option-btn');

            button.addEventListener('click', panelActive);
            sectionContent.appendChild(button);
            panel.appendChild(sectionContent);
        }
    });
    }

//Aqui estan cada panel o seccion como objeto y su contenido.
const fatiguePanel = {
    titulo: "fatigue",
    opciones: ["Take a Break", "Hide"],

    styleAdj (){
        
        panel.style.width = "80%";
        panel.style.height = "20%";
        panel.style.left ="10%";
        panel.style.top = "40%";

        bkg.style.width = window.innerWidth;
        bkg.style.height = window.innerHeight;
        bkg.style.top = 0;
        bkg.style.left = 0;
    },
    contentPanel (){
        
        panel.classList.remove("hide");
        bkg.classList.remove("hide");

        section.setAttribute("data-panel",dataPanel); 
        section.innerHTML = dataPanel.toUpperCase()+": ";
        section.classList.add('new-Panel');    

        newID = sectionContent.tagName + "_" + no;
        sectionContent.classList.add('new-Panel');        
        sectionContent.id = newID;     
        sectionContent.setAttribute("data-panel",dataPanel); 
        
        span.classList.add("fatigue-porcent_big");
        span.innerHTML = Math.floor(player.fatigue)+"%";

        section.appendChild(span);
        sectionContent.appendChild(section);
    }
}

const mainPanel = {
    titulo: "daily",
    icono: "assets/Flecha.png",
    
    cuerpo:["Auto Daily Quest", "Title Quest: Vector Dungeon"],
    orientacion: "View the missions for today",
    advice: "If the time to do it start, you will be notified",

    opciones: ["Ok", "Cancel"],

    styleAdj (){
        
        panel.style.width = "80%";
        panel.style.height = "20%";
        panel.style.left ="10%";
        panel.style.top = "40%";

        bkg.style.width = window.innerWidth;
        bkg.style.height = window.innerHeight;
        bkg.style.top = 0;
        bkg.style.left = 0;
    },
    contentPanel (){
        
       // panel.classList.remove("hide");
        //bkg.classList.remove("hide");

        section.setAttribute("data-panel",dataPanel); 
        section.innerHTML = dataPanel.toUpperCase()+": ";
        section.classList.add('new-Panel');    

        newID = sectionContent.tagName + "_" + no;
        sectionContent.classList.add('new-Panel');        
        sectionContent.id = newID;     
        sectionContent.setAttribute("data-panel",dataPanel); 
        
        span.classList.add("fatigue-porcent_big");
        span.innerHTML = Math.floor(player.fatigue)+"%";

        section.appendChild(span);
        sectionContent.appendChild(section);
    }
}

const dailyPanel = {
    titulo: "daily",
    icono: "assets/Flecha.png",
    
    cuerpo:["Auto Daily Quest", "Title Quest: Vector Dungeon"],
    orientacion: "View the missions for today",
    advice: "If the time to do it start, you will be notified",

    opciones: ["Ok", "Cancel"],
}

const questPanel = {
    titulo: "quest",
    icono: "assets/Flecha.png",
    
    cuerpo:["Auto Daily Quest", "Title Quest: Vector Dungeon"],
    orientacion: "View the missions for today",
    advice: "If the time to do it start, you will be notified",

    opciones: ["Ok", "Cancel"],
}

const inventoryPanel = {
    titulo: "inventory",
    icono: "assets/Flecha.png",
    
    cuerpo:["Auto Daily Quest", "Title Quest: Vector Dungeon"],
    orientacion: "View the missions for today",
    advice: "If the time to do it start, you will be notified",

    opciones: ["Ok", "Cancel"],
}

const statusPanel = {
    titulo: "status",
    icono: "assets/Flecha.png",
    
    cuerpo:["Auto Daily Quest", "Title Quest: Vector Dungeon"],
    orientacion: "View the missions for today",
    advice: "If the time to do it start, you will be notified",

    opciones: ["Ok", "Cancel"],
}

const systemPanel = {
    titulo: "system",
    icono: "assets/Flecha.png",
    
    cuerpo:["Auto Daily Quest", "Title Quest: Vector Dungeon"],
    orientacion: "View the missions for today",
    advice: "If the time to do it start, you will be notified",

    opciones: ["Ok", "Cancel"],
}

