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