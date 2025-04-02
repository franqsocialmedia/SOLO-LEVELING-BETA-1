import { player } from "./Player_mod.js";
import { hpBar , mpBar , reductionLifeRate , reductionMotivationRate , fatigueRate , fatigue , fatigueIcon} from "./Vars_mod.js";
import { Lifetimer, timer } from "../script.js";


var hora = new Date();
var horaActual = hora.getHours();

//Modulo para el tiempo

    function fatiga_status(){
            if(player.state == "activo"){
                
                    player.fatigue =+ fatigueRate; //resta por segundo

                if(player.fatigue > 50 && player.fatigue < 70){
                    //CODIGO ********** notificacion de fatiga
                    console.error("Faltan al rededor de 10 minutos para antes de fatigarte. Termina rapido la misión o descansa unos 10 minutos");
                }

                
                if(player.fatigue > 70 && player.fatigue < 90){
                    //CODIGO ********** notificacion de fatiga
                    console.error("Estás llegando a tu limite, al rededor de 5 minutos no podrás moverte. Descansa o culmina de inmediato la misión");
                }

                if(player.fatigue >= 100){
                    //CODIGO ********** notificacion de fatiga
                    console.error("Tu fatiga es extrema! Ya no podrás hacer nada hasta recuperarte al menos hasta un 50% o fallar la misión");
                }
            }
        }

      export function daytime(up,sleep){
            // Obtener valores de los inputs
            var horaInicial = up;
            var horaFinal = sleep;

            player.timeup = horaInicial;
            player.timesleep = horaFinal;
            
            // Convertir a minutos para facilitar el cálculo
            var inicio = horaInicial.split(":");
            var fin = horaFinal.split(":");
            
            var inicioMinutos = (parseInt(inicio[0]) * 60) + parseInt(inicio[1]);
            var finMinutos = (parseInt(fin[0]) * 60) + parseInt(fin[1]);
            
            // Si la hora final es menor, asumimos que es del día siguiente
            if (finMinutos < inicioMinutos) {
                finMinutos += 24 * 60; // Añadir un día en minutos
            }
            
            // Calcular diferencia
            var diferencia = finMinutos - inicioMinutos;
            
            // Convertir diferencia a horas y minutos
            var horas = Math.floor(diferencia / 60);
            var minutos = diferencia % 60;

        var lifePoints = 100 * horas;
        var motivationPoints = 100 * (horas/3);

        player.hp = lifePoints;
        player.mp = motivationPoints;
        fatigue.innerHTML = player.fatigue;

        //document.getElementById('hpBar').setAttribute("max", lifePoints);
        //document.getElementById('mpBar').setAttribute("max", motivationPoints);
        
        player.timeout = horas;

        console.log("Estas despierto al rededor de: "+horas +" horas y "+ minutos+" minutos");
        console.log("La cantidad de vida que posees es: "+player.hp);
        console.log("Tu motivacion es de: "+player.mp);
        console.log("la fatiga esta en: "+player.fatigue);

    }

//Funcion para obtener la hora actual
function whatTime(){
    
    var now = new Date();
    var hour = now.getHours();
    var mint = now.getMinutes();

    const amPm = hour >= 12 ? 'PM' : 'AM';
    hour = hour % 12 || 12; // Convierte 0 en 12 para el formato de 12 horas

   // alert(hour+":"+mint);
    return hour+":"+mint;

}

//Funcion para establecer la barra acorde a la hora de dormir y despertarse
export function yourCurrentHP(up,sleep){
    // Obtener valores de los inputs
    var horaInicial = up;
    var horaFinal = sleep;

    // Convertir a minutos para facilitar el cálculo
    var ahora = whatTime().split(":");
    //alert(ahora);
    var inicio = horaInicial.split(":");
    var fin = horaFinal.split(":");
    
    var inicioMinutos = (parseInt(inicio[0]) * 60) + parseInt(inicio[1]);
    var finMinutos = (parseInt(fin[0]) * 60) + parseInt(fin[1]);
    var ahoraMinutos = (parseInt(ahora[0]) * 60) + parseInt(ahora[1]);
    
    if (finMinutos < inicioMinutos) {
        finMinutos += 24 * 60; // Añadir un día en minutos
        }
    
    finMinutos = finMinutos - inicioMinutos;


    if (finMinutos < ahoraMinutos) {
        finMinutos += 12* 60; // Añadir un día en minutos
    }

    // Calcular diferencia
    var diferencia = finMinutos - ahoraMinutos;

    
    // Convertir diferencia a horas y minutos
    var horas = Math.floor(diferencia / 60);


var lifePoints = 100 * horas;
var motivationPoints = 100 * (horas/3);


player.hp = lifePoints;
player.mp = motivationPoints;
fatigue.innerHTML = player.fatigue;

hpBar.setAttribute('value', lifePoints);
mpBar.setAttribute('value', motivationPoints);

player.timeout = horas;

}

//Revision por click!
hpBar.addEventListener('click', porcentaje);
mpBar.addEventListener('click', porcentaje);
    
function porcentaje(){
alert(Math.round(this.value) +" / "+this.max);
}

 // Función para actualizar la barra de progreso
 export function updateProgressBar() {

    const percentageHP = player.hp;
    const percentageMP = player.mp;
    fatigue.innerHTML = Math.floor(player.fatigue);

    hpBar.setAttribute('value', percentageHP);
    mpBar.setAttribute('value', percentageMP);

}

function contextReduction(){

    horaActual = hora.getHours();

    // Reducir el valor y actualizar la barra. Segun el momento del dia o la situacion
    if (parseInt(player.timesleep.split(":")) <= horaActual){
        horaActual = 24 - horaActual;
        horaActual = horaActual + parseInt(player.timesleep.split(":"));
    }else{
        horaActual = parseInt(player.timesleep.split(":")) - horaActual;
    }
    
    if(horaActual < 3){
        reductionLifeRate = reductionLifeRate * 1.5;
        reductionMotivationRate = reductionMotivationRate * 1.5;
        fatigueRate = fatigueRate / 1.5;

        console.log("Quedan menos de 3 horas para cerrar las misiones de hoy");
    }
}

// Función para reducir el valor
export function reduceValue() {

    contextReduction();

//Reduccion standard
    player.hp = hpBar.value - reductionLifeRate;
    player.mp = mpBar.value - reductionMotivationRate;
    fatigue.innerHTML = Math.floor(player.fatigue);

    if(player.state == "activo" && player.fatigue < 100){
        player.fatigue = player.fatigue + fatigueRate;
        fatigue.innerHTML = Math.floor(player.fatigue);
    }else{
        if(player.state == "descanso" && player.fatigue > 0){
            player.fatigue = player.fatigue - fatigueRate;
            fatigue.innerHTML = Math.floor(player.fatigue);
        }
        
        if(player.state == "activo" && player.fatigue >= 100){
            alert("LA FATIGA ES MAXIMA!!");         
            fatigue.innerHTML = Math.floor(player.fatigue);
            player.state = "descanso";
        }
        
    }
    updateProgressBar();
    fatigueIcon.style.background = "conic-gradient(var(--base2-color) 0% "+(100-player.fatigue)+"%, #ff5733 0% 100%)";

    console.log("BARRAS DE ESTADO:");
    console.log("HP: "+player.hp);
    console.log("MP: "+player.mp);
    console.log("Fatigue: "+player.fatigue);
    console.log(" ********************** ");
    console.log(" ---------------------- ");

    // Si llega a cero, detener el temporizador
    if (hpBar.value < 1 || player.state == "descanso") {
        clearInterval(timer);
        lifeReduction();
    }
}

export function lifeReduction(){

    contextReduction();

    player.hp = hpBar.value - reductionLifeRate;

    updateProgressBar();

    // Si llega a cero, detener el temporizador
    if (hpBar.value < 1 || player.state == "activo") {
        clearInterval(Lifetimer);
    }
}
