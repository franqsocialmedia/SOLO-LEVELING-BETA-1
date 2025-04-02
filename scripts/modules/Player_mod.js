//Modulo de jugador

   export const player = {
        name : "Jugador",
        type_class : ["caballero","asesino","mago","elfo","necromancer","barbaro"], 
        level : 1,
        ability : [1,1,1,1,1,1,0],
        hp : 2000,
        mp : 1600,
        fatigue : 0,
        emotion : ["Emocionado","Bien","Meh","Triste","Molesto","Enfermo/Accidentado"],
        mode : ["Balanceado","Fitness","Pro","Espiritual","Estudio","Sistema"],
        timeup : '10:20',
        timesleep : '2:00',
        timeout : 16,
        title : "Player",
        money : 0,
        item : ["Control de Jugador","Posion de Energia"],
        bank : ["RD$",0,0,100],
        equipment : ["","","","","","Celular",""], //cabeza, cuello, brazo der, brazo izq, antebrazo, mano, piernas
        dungeon : [],
        agenda : [],
        state : "activo",  //puede ser "ACTIVO" o "DESCANSO"
        }



   export function lifeCalc(up,sleep){
      var horaInicial = up;
      var horaFinal = sleep;

      var inicio = horaInicial.split(":");
      var fin = horaFinal.split(":");
         
      var inicioMinutos = (parseInt(inicio[0]) * 60) + parseInt(inicio[1]);
      var finMinutos = (parseInt(fin[0]) * 60) + parseInt(fin[1]);
         
         if (finMinutos < inicioMinutos) {
               finMinutos += 24 * 60; // Añadir un día en minutos
            }
   
// Calcular diferencia
      var diferencia = finMinutos - inicioMinutos;
      
// Convertir diferencia a horas y minutos
      var horas = Math.floor(diferencia / 60);
      
      player.timeout = horas;
      player.hp = horas *100;
      player.mp = horas *80;
      
    hpBar.setAttribute('max',player.hp);
    //hpBar.setAttribute('value',player.hp);
    mpBar.setAttribute('max',player.mp);
    //mpBar.setAttribute('value',player.mp);
     }