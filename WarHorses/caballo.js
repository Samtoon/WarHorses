import Nodo from "./nodo.js";
import { crearTablero, pintarTablero, leerTablero, display, Casilla, nFilas, nColumnas } from "./tablero.js";
import valores from "./valoresTablero.json" assert {type: "json"};

class Caballo {
    constructor(fila = 0, columna = 0, max = true) {
        this.fila = fila;
        this.columna = columna;
        this.max = max;
        this.valores = max ? valores.max : valores.min;
        const casilla = new Casilla(fila, columna, this.valores.id);
        casilla.pintarCasilla();
        this.puntaje = 0;
        this.bloqueado = false;
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
        if (!this.atrapado()) {
            function contieneMovimiento(filas, columnas) {
                for (let i = 0; i < valores.movimientosPosibles.length; i++) {
                    const movimientoEvaluado = valores.movimientosPosibles[i];
                    if (filas == movimientoEvaluado[0] && columnas == movimientoEvaluado[1]) {
                        return true;
                    }
                }
                return false;
            }
            const filas = Number(prompt("Cuántas filas desea moverse?"));
            const columnas = Number(prompt("Cuántas columnas desea moverse?"));
            console.log(`El includes es: ${typeof [filas, columnas]} y movimientosPosibles: ${valores.movimientosPosibles[0]}, la comparación es ${[-2, -1] === valores.movimientosPosibles[0]}`);
            if (this.casillaDisponible(this.fila + filas, this.columna + columnas) && contieneMovimiento(filas, columnas)) {
                this.mover(filas, columnas);
            } else {
                alert("Movimiento inválido");
                this.decidirMovimiento();
            }
        }
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
    atrapado() {
        for (let i = 0; i < valores.movimientosPosibles.length; i++) {
            if (this.casillaDisponible(this.fila + valores.movimientosPosibles[i][0], this.columna + valores.movimientosPosibles[i][1])) {
                return false;
            }
        }
        this.bloqueado = true;
        return true;
    }
}

console.log("hola");
export { Caballo };
