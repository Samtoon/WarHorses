import { Caballo } from "./caballo.js";
import { CaballoIA } from "./caballoIA.js";
import valores from "./valoresTablero.json" assert {type: "json"};
import graficar from "./movimiento.js";

class Casilla {
    constructor(fila, columna, valor = 0) {
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
    }
    pintarCasilla() {
        tablero[this.fila][this.columna] = this.valor;
    }
}
const tablero = [];
const movDisponible=[];
const filaMax = 2;
const columnaMax = 2;
const filaBono = 3;
const columnaBono = 0;
const nFilas = 8;
const nColumnas = 8;
let max;
let min;

function crearTablero() {
    for (let j = 0; j < nFilas; j++) {
        tablero.push([]);
        for (let i = 0; i < nColumnas; i++) {
            tablero[j].push(valores.vacio);
        }
    }
    
    function adyacente(fila, columna) {
        const adyacentes = [[-1, -1,], [-1, 0], [-1, 1], [0, 1], [1, 1], [1, 0], [1, -1], [0, -1]];
        for (let i = 0; i < adyacentes.length; i++) {
            const filaEvaluada = fila + adyacentes[i][0];
            const columnaEvaluada = columna + adyacentes[i][1];
            if (filaEvaluada >= 0 &&
                filaEvaluada < nFilas &&
                columnaEvaluada >= 0 &&
                columnaEvaluada < nColumnas) {
                    if (leerTablero(filaEvaluada, columnaEvaluada) != valores.vacio) {
                        return true
                    }
                }
        }
        return false;
    }
    let fila = Math.floor(Math.random() * nFilas);
    let columna = Math.floor(Math.random() * nColumnas);
    for (let i = 0; i < 5; i++) {
        while (leerTablero(fila, columna) != valores.vacio || adyacente(fila, columna)) {
            fila = Math.floor(Math.random() * nFilas);
            columna = Math.floor(Math.random() * nColumnas);
        }
        //console.log(`Fila elegida ${fila}, Columna elegida ${columna}`);
        switch (i) {
            case 0:
                max = new CaballoIA(fila, columna, true, 1);
                break;
            case 1:
                min = new Caballo(fila, columna, false);
                break;
            default:
                tablero[fila][columna] = valores.bonificacion;
                
                //console.log("Bonificación en [" + columna + "," + fila + "]");
        }
    }
}

function pintarTablero(casillas) {
    const nCasillas = casillas.length
    for (let i = 0; i < nCasillas; i++) {
        casillas[i].pintarCasilla();
    }
   
}

function tableroLleno() {
    for (let j = 0; j < tablero.length; j++) {
        for (let i = 0; i < tablero[0].length; i++) {
            if (tablero[j][i] == valores.vacio) {
                return false;
            }
        }
    }
    return true;
}

const leerTablero = (fila, columna) => tablero[fila][columna];

function display() {
    let puntajeMin = 0;
    let puntajeMax = 0;
    console.log("\n");
    for (let j = 0; j < tablero.length; j++) {
        let fila = "";
        for (let i = 0; i < tablero[0].length; i++) {
            fila += tablero[j][i] + "   ";
            if (tablero[j][i] == max.valores.pintura) {
                puntajeMax += 1;
            } else if (tablero[j][i] == min.valores.pintura) {
                puntajeMin += 1;
            }
        }
         console.log(j + " | " + fila);
    }
     console.log("Puntaje Min: " + puntajeMin);
     console.log("Puntaje Max:" + puntajeMax);
     max.puntaje = puntajeMax;
     min.puntaje = puntajeMin;
     presentarPuntajes(puntajeMax+1,puntajeMin+1);
     
    return puntajeMax - puntajeMin;
    
}


crearTablero();
console.log("gola");
graficar(tablero);
console.log("gola");
display();


let victoriasMax = 0;
let victoriasMin = 0;
let empates = 0;
const date1 = new Date();

function iniciarjuego(dificultad) {

    switch(dificultad){
        case 1:
            document.getElementById("facil").classList.add("oprimido")
            break;
        case 2:
            document.getElementById("medio").classList.add("oprimido")
            break;
        case 3:
            document.getElementById("dificil").classList.add("oprimido")
            break;
    }
       

    
    max.dificultad = dificultad; 
        display()
        graficar(tablero);
        max.decidirMovimiento();
        graficar(tablero);
        display()
        min.añadirListeners();   
}

function jugar(){
   if(!min.bloqueado){
        display()
        graficar(tablero);
        max.decidirMovimiento();
        graficar(tablero);
        display()
        min.añadirListeners(); 
   }else{
        console.log("entro a jugar")
        max.decidirMovimiento();
        display()
        graficar(tablero);
   }
        
        console.log("rojo Bloqueado: "+max.bloqueado)
        console.log("amarillo Bloqueado: "+min.bloqueado)
        if(max.bloqueado&&min.bloqueado){
            if(display()>0){
                console.log("gano rojo");
                document.getElementById("fin").innerHTML="<h1 class='lines-effect'>Ganador: Caballo rojo</h1>"
            }else if(display()<0){
                console.log("gano amarillo");
                document.getElementById("fin").innerHTML="<h1 class='lines-effect'>Ganador: Caballo amarillo</h1>"
            }else{
                document.getElementById("fin").innerHTML="<h1 class='lines-effect'>Fin del juego: Empate</h1>"

            }
        }
        
        
}

function jugarSoloMax(){
   
    while(!max.bloqueado){
        display()
    graficar(tablero);
    max.decidirMovimiento();
    
    console.log("entro a solo tablero ")
    }
    
    
    if(max.bloqueado&&min.bloqueado){
        if(display()>0){
            console.log("gano rojo");
            document.getElementById("fin").innerHTML="<h1 class='lines-effect'>Ganador: Caballo rojo</h1>"
        }else if(display()<0){
            console.log("gano amarillo");
            document.getElementById("fin").innerHTML="<h1 class='lines-effect'>Ganador: Caballo amarillo</h1>"
        }else{
            document.getElementById("fin").innerHTML="<h1 class='lines-effect'>Fin del juego: Empate</h1>"

        }
    }
    
    
}



function presentarPuntajes(puntajeRojo,puntajeAmarillo){
    document.getElementById("pr").innerHTML="<h2 class='lines-effect'>Casillas Rojas:   "+puntajeRojo+"</h2>";
    document.getElementById("pa").innerHTML="<h2 class='lines-effect'>Casillas Amarillas:   "+puntajeAmarillo+"</h2>";;
    let libres=64-(puntajeRojo+puntajeAmarillo);
    document.getElementById("pl").innerHTML="<h2 class='lines-effect'>Casillas Libres:   "+libres+"</h2>";;
}




// for (let i = 1; i <= 1000; i++) {
//     while (!max.bloqueado || !min.bloqueado) {
//     max.decidirMovimiento();
//     display();
//     min.decidirMovimiento();
//     display();
//     }
//     const resultado = display();
//     if (resultado > 0) {
//     victoriasMax++;
//     } else if (resultado < 0) {
//     victoriasMin++;
//     } else {
//     empates++;
//     }
//     while (tablero.length > 0) {
//         tablero.pop();
//     }
//     crearTablero();
//     console.log(`Ganadas Max: ${victoriasMax/i}, Ganadas Min: ${victoriasMin/i}, Empates: ${empates/i}, No Partidas: ${i}, mal podados: ${max.malPodados + min.malPodados}`);

// }
const date2 = new Date();
const diff = date2 - date1; //milliseconds interval
console.log("Tardé " + diff + " milisegundos." );

document.getElementById("facil").addEventListener("click",()=>iniciarjuego(1));
document.getElementById("medio").addEventListener("click",()=>iniciarjuego(2));
document.getElementById("dificil").addEventListener("click",()=>iniciarjuego(3));

export { crearTablero, pintarTablero, leerTablero, nFilas, nColumnas, display, Casilla, tableroLleno, max, min, iniciarjuego,jugar,jugarSoloMax };