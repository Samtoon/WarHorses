import Nodo from "./nodo.js";
import { crearTablero,pintarTablero, leerTablero, display, Casilla, nFilas, nColumnas} from "./tablero.js";
import valores from "./valoresTablero.json" assert {type: "json"};

class Caballo {
    constructor(fila = 0, columna = 0, max = true) {
        this.fila = fila;
        this.columna = columna;
        this.max = max;
        this.valores = max ? valores.max : valores.min;
        const casilla = new Casilla(fila, columna, this.valores.id);
        casilla.pintarCasilla();
    }
    mover(filas, columnas) {
        let casillas = [];
        const nuevaFila = this.fila + filas;
        const nuevaColumna = this.columna + columnas;
        casillas.push(new Casilla(this.fila, this.columna, this.valores.pintura));
        casillas.push(new Casilla(nuevaFila, nuevaColumna, this.valores.id));
        if (leerTablero(nuevaFila, nuevaColumna) == valores.bonificacion) {
            casillas = casillas.concat(this.efectoBonificacion(nuevaFila, nuevaColumna));
        }
        pintarTablero(casillas);
        this.fila = nuevaFila;
        this.columna = nuevaColumna;
    }
    decidirMovimiento() {
        const filas = Number(prompt("Cuántas filasasasffsf desea moverse?"));
        const columnas = Number(prompt("Cuántas columnas desea moverse?"));
        this.mover(filas,columnas);
    }
    casillaDisponible(fila, columna, nodo = new Nodo()) {
        if (fila >= 0
            && fila < nFilas
            && columna >= 0
            && columna < nColumnas) {
                return leerTablero(fila, columna) == valores.vacio 
                || leerTablero(fila, columna) == valores.bonificacion ? true : false;
        }
        return false;
    }
    efectoBonificacion(fila, columna, nodo = new Nodo()) {
        const casillas = [];
        const pintadasPosibles = [[-1, 0], [1, 0], [0, -1], [0, 1]];
        for (let i = 0; i < pintadasPosibles.length; i++) {
            const filaPintada = fila + pintadasPosibles[i][0];
            const columnaPintada = columna + pintadasPosibles[i][1];
            if (this.casillaDisponible(filaPintada, columnaPintada, nodo)) {
                casillas.push(new Casilla(filaPintada, columnaPintada, this.valores.pintura));
            }
        }
        return casillas;
    }
}

console.log("hola");
export { Caballo };
