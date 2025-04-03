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
        timesleep : '1:00',
        timeout : 16,
        title : "Player",
        money : 0,
        item : ["Control de Jugador","Posion de Energia"],
        bank : ["RD$",0,0,100],
        equipment : ["","","","","","Celular",""], //cabeza, cuello, brazo der, brazo izq, antebrazo, mano, piernas
        dungeon : [],
        agenda : [],
        state : "activo",  //puede ser "ACTIVO" , "DESCANSO" , "DORMIR"
        game_state : [], //stopwatch , timer , rest , daily , boss , fatigued , fainted
        language : "Español", //Esp , En
        }



   