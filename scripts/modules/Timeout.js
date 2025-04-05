import { player } from "./Player_mod.js";
import { hpBar , mpBar , goUp ,  goSleep , fatigue , fatigueIcon, hpInfo, mpInfo, fatigueBig} from "./Vars_mod.js";
import { Fatiguetimer, Lifetimer, Motivationtimer, timer } from "../script.js";

var hora = new Date();
var horaActual = hora.getHours();

let reductionLifeRate;
let reductionMotivationRate;
let fatigueRate;

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

      export function currentStatusPlayer(up,sleep){
            // Obtener valores de los inputs
        var horaInicial = up;
        var horaFinal = sleep;
        var horaActual = whatTime();

        // Convertir a minutos para facilitar el cálculo
        var ahora = horaActual.split(":");
        var inicio = horaInicial.split(":");
        var fin = horaFinal.split(":");
        
        var inicioMinutos = (parseInt(inicio[0]) * 60) + parseInt(inicio[1]);
        var finMinutos = (parseInt(fin[0]) * 60) + parseInt(fin[1]);
        var ahoraMinutos = (parseInt(ahora[0]) * 60) + parseInt(ahora[1]);
        
        if (finMinutos < ahoraMinutos) {
            finMinutos += 12 * 60; // Añadir un día en minutos
            }

        // Calcular diferencia
        var diferencia = finMinutos - ahoraMinutos;
        
        // Convertir diferencia a horas y minutos
        var horas = Math.floor(diferencia / 60);
        var minutos = diferencia % 60;

        var lifePoints = 100 * horas;
        var motivationPoints = 80 * horas;
        
        hpBar.setAttribute('max', lifePoints);
        hpBar.setAttribute('value', lifePoints);
        hpInfo.innerHTML = hpBar.value+" / "+hpBar.max;

        mpBar.setAttribute('max', motivationPoints);
        mpBar.setAttribute('value', motivationPoints);
        mpInfo.innerHTML = mpBar.value+" / "+mpBar.max;
    
        player.hp = lifePoints;
        player.mp = motivationPoints;
        player.timeout = horas;
        fatigue.innerHTML = player.fatigue;
        
        console.log("HORA ACTUAL: "+(Math.floor(ahoraMinutos/60)));
        console.log("UP: "+player.timeup +" | SLEEP: "+ player.timesleep);
        console.log("MAX TIME: "+player.timeout +" hrs "+ minutos+" mint");
        console.log("-----------------------");
       // console.log("HP ORIGINAL: "+player.hp);
        console.log("HP: "+hpBar.value+" / "+player.hp);
       // console.log("MP ORGINAL: "+player.mp);
        console.log("MP: "+mpBar.value+" / "+player.mp);
        console.log("FATIGUE: "+player.fatigue);
        console.log("---------------------");

        
        reductionLifeRate = ((hpBar.max/player.timeout) / 60) / 60; // 0.0002777777777777778;
        //alert("reduccion de vida es de: "+reductionLifeRate);
        //alert(hpBar.max);

        reductionMotivationRate = ((mpBar.max/player.timeout) / 60) / 60; // 0.04938271604938271;
        //alert("reduccion de motivacion es de: "+reductionMotivationRate);

        fatigueRate = 100 / (25 * 60); // 0.06666666666666667;
        //alert("reduccion de fatiga es de: "+fatigueRate);
      
    }

//Funcion para obtener la hora actual
export function whatTime(){
    
    var now = new Date();
    var hour = now.getHours();
    var mint = now.getMinutes();

    if(hour > 12){
        hour = hour - 12;
    }
    //alert(hour+":"+mint);
    return hour+":"+mint;

}


//Revision por click!
hpBar.addEventListener('click', porcentaje);
mpBar.addEventListener('click', porcentaje);
    
export function porcentaje(){
    var now = new Date();
    var hour = now.getHours();
    
    if (hour < player.timeout){
        hour = hour + 12;
    }    
    var total = hour - player.timeout;

}

export function startTheGame(){
    var now = new Date();
    var hour = now.getHours();
    
    if (hour < player.timeout){
        hour = hour + 12;
    }    

    var total = hour - player.timeout;
    player.timeout = total;
    
    currentStatusPlayer(goUp,goSleep);
}

 // Función para actualizar la barra de progreso
 export function updateProgressBar() {

    const percentageHP = player.hp;
    const percentageMP = player.mp;
    fatigue.innerHTML = Math.floor(player.fatigue);

    hpBar.setAttribute('value', percentageHP);
    mpBar.setAttribute('value', percentageMP);
    
    hpInfo.innerHTML = Math.floor(hpBar.value)+" / "+hpBar.max;
    mpInfo.innerHTML = Math.floor(mpBar.value)+" / "+mpBar.max;

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
        motivationReduction();
    }
}

export function lifeReduction(){

    contextReduction();

    switch(player.state){
        case "activo":
            player.hp = hpBar.value - reductionLifeRate;
        break;
        case "descanso":
            player.hp = hpBar.value - reductionLifeRate;
        break;
        case "dormir":
            player.hp = hpBar.value + reductionLifeRate;
        break;
    }

    updateProgressBar();

    // Si llega a cero, detener el temporizador
    if (hpBar.value < 1) {
        clearInterval(Lifetimer);
        console.log("HP LLEGO A CERO. Procede a descansar");
        player.state = "dormir";
    }
}

export function motivationReduction(){

    contextReduction();

    player.mp = mpBar.value - reductionMotivationRate;

    updateProgressBar();

    // Si llega a cero, detener el temporizador
    if (mpBar.value < 1) {
        clearInterval(Motivationtimer);
        console.log("MP LLEGO A CERO. Debes hacer misiones");
        player.state = "descanso";
    }
}

export function fatigueReduction(){

    contextReduction();

    switch(player.state){
        case "activo":
            player.fatigue = player.fatigue + fatigueRate;
            fatigue.innerHTML = Math.floor(player.fatigue);
        break;

        case "descanso":
            if(player.fatigue < 1){
                player.fatigue = 0;
            }else{
                player.fatigue = player.fatigue - fatigueRate;
            }
            fatigue.innerHTML = Math.floor(player.fatigue);
        break;

        case "dormir":
            if(player.fatigue < 1){
                player.fatigue = 0;
            }else{
                player.fatigue = player.fatigue - fatigueRate;
            }
            fatigue.innerHTML = Math.floor(player.fatigue);
        break;
    }
    

    updateProgressBar();

    // Si llega a cero, detener el temporizador
    if (fatigue.value >= 100) {
        clearInterval(Fatiguetimer);
        console.log("FATIGA LLEGO AL 100%. No podras luchar");
        player.state = "descanso";
    }
}
