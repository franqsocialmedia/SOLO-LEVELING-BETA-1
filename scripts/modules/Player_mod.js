//Modulo de jugador

   export const player = {
        name : "Jugador",
        type_class : ["caballero","asesino","mago","elfo","necromancer","barbaro"], 
        level : 1,
        ability : [1,1,1,1,1,1,0],
        hp : 1000,
        mp : 800,
        fatigue : 0,
        emotion : ["Emocionado","Bien","Meh","Triste","Molesto","Enfermo/Accidentado"],
        mode : ["Balanceado","Fitness","Pro","Espiritual","Estudio","Sistema"],
        timeup : '7:00',
        timesleep : '23:00',
        timeout : 7,
        title : "Player",
        money : 0,
        item : ["Control de Jugador","Posion de Energia"],
        bank : ["RD$",0,0,100],
        equipment : ["","","","","","Celular",""], //cabeza, cuello, brazo der, brazo izq, antebrazo, mano, piernas
        dungeon : [],
        agenda : [],
        state : "descanso",  //puede ser "ACTIVO" o "DESCANSO"
        
    
        }