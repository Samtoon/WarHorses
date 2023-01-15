import { Caballo } from "./caballo.js";
import { CaballoIA } from "./caballoIA.js";
import valores from "./valoresTablero.json" assert {type: "json"};

const tablero = [];
const filaMax = 2;
const columnaMax = 2;
const filaBono = 3;
const columnaBono = 0;
const nFilas = 5;
const nColumnas = 5;
let max;
let min;
class Casilla {
    constructor (fila, columna, valor = 0) {
        this.fila = fila;
        this.columna = columna;
        this.valor = valor;
    }
    pintarCasilla () {
        tablero[this.fila][this.columna] = this.valor;
    }
}
function crearTablero () {
    for (let j = 0; j < nFilas; j++) {
        tablero.push([]);
        for (let i = 0; i < nColumnas; i++) {
            tablero[j].push(valores.vacio);
        }
    }
    let fila = Math.floor(Math.random() * nFilas);
    let columna = Math.floor(Math.random() * nColumnas);
    for (let i = 0; i < 5; i++) {
        while (leerTablero(fila, columna) != valores.vacio) {
            fila = Math.floor(Math.random() * nFilas);
            columna = Math.floor(Math.random() * nColumnas);
        }
        switch(i) {
            case 0:
                max = new CaballoIA(filaMax, columnaMax, true, 2);
                break;
            case 1:
                min = new Caballo(fila, columna, false);
                break;
            default:
                tablero[fila][columna] = valores.bonificacion;
                console.log("Bonificación en ["+columna+","+fila+"]");
        }
    }
    tablero[filaBono][columnaBono] = valores.bonificacion;
}

function pintarTablero (casillas) {
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

function display () {
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
        console.log(fila);
    }
    console.log("Puntaje Min: " + puntajeMin);
    console.log("Puntaje Max:" + puntajeMax);
}
crearTablero();
display();
while(!max.bloqueado || !min.bloqueado) {
    max.decidirMovimiento();
    min.decidirMovimiento();
    display();
}
display();


export { crearTablero, pintarTablero, leerTablero, nFilas, nColumnas, display, Casilla, tableroLleno, max, min};