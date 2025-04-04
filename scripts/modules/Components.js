import { player } from "./Player_mod.js";
import { panel } from "./Vars_mod.js";

export var counter;
//Components

export const stopwatch = {

    hours : 0,
    mint : 0,
    seg : 0,
    show : 0,

    count (s) {
        if(this.seg >= 59){
            this.seg = 0;
            if(this.mint >= 59){
                this.mint = 0;
                if(this.hours >= 23){
                    this.hours = 0;
                }else{
                    this.hours = +1;
                }
            }else{
                this.mint = +1;
            }
        }else{
            this.seg = + 1;
        }
    },
    show(){
     
            var reloj = document.createElement('div');
            reloj.class = "cuerpo-contenido";
            reloj.classList.add("flexible");

            var tiempo = document.createElement('section');
            tiempo.class = "list";
            tiempo.innerHTML = "<b>SIIIII</b>"

            reloj.appendChild(tiempo);
            panel.appendChild(reloj);
            panel.classList.toggle('show');

            return panel;
        
        
    }
    ,
    set(){
        
            this.show = 1;   
            counter = setInterval(this.count,1000);
        
    }
}

// Función para seleccionar texto por número e idioma
export function seleccionarTexto(textId, language, callback) {
    const xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (this.readyState == 4) {
            if (this.status == 200) {
                const contenido = this.responseText;
                const resultado = buscarTexto(contenido, textId, language);
                callback(resultado);
            } else {
                callback({
                    exito: false, 
                    mensaje: "Error al cargar el archivo answers.txt"
                });
            }
        }
    };
    xhr.open("GET", "./assets/answers.txt", true);
    xhr.send();
}

// Función para buscar el texto específico
export function buscarTexto(contenido, textId, language) {
    // Validar idioma
    const idiomasValidos = ["espanol", "ingles", "portugues"];
    if (!idiomasValidos.includes(language)) {
        return {
            exito: false,
            mensaje: "Idioma no válido"
        };
    }
    
    // Validar ID del texto
    const textIdNum = parseInt(textId);
    if (isNaN(textIdNum) || textIdNum < 1) {
        return {
            exito: false,
            mensaje: "ID de texto inválido"
        };
    }
    
    // Buscar bloque de texto
    const patronBloque = new RegExp(`# TEXTO ${textIdNum}[^#]*`, "i");
    const bloqueMatch = contenido.match(patronBloque);
    
    if (!bloqueMatch) {
        return {
            exito: false,
            mensaje: "Texto no encontrado"
        };
    }
    
    const bloque = bloqueMatch[0];
    
    // Buscar texto en el idioma deseado
    const patronIdioma = new RegExp(`${language}:\\s*(.*)`, "i");
    const idiomaMatch = bloque.match(patronIdioma);
    
    if (!idiomaMatch || idiomaMatch.length < 2) {
        return {
            exito: false,
            mensaje: "Idioma no encontrado para este texto"
        };
    }
    
    return {
        exito: true,
        texto: idiomaMatch[1]
    };
}

var text = player.level;
var language = player.language;
var result;

function whichtext(txt,lang,res) {
    const textoId = txt;
    const idioma = lang;
    const resultado = document.getElementById(res);
    
    resultado.textContent = "Buscando...";
    
    seleccionarTexto(textoId, idioma, function(res) {
        if (res.exito) {
            resultado.textContent = res.texto;
        } else {
            resultado.textContent = "Error: " + res.mensaje;
        }
    });
}

export function searchText(e){
//    alert(this.getAttribute('id'));

    switch (this.getAttribute('data-panel')){
        case "fatigue":
            text = 1;
            result = "details";
            //alert("CLICK!");
        break;
    }
    whichtext(text,language,result);

// Configurar el evento del botón
   
}