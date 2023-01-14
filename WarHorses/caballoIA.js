import { Caballo } from "./caballo.js";

class CaballoIA extends Caballo{
    constructor(fila, columna, max) {
        super (fila, columna, max);
    }
    decidirMovimiento () {
        const movimientosPosibles = [[-2, -1], [-2, 1], [-1, -2], [-1, 2], [1, -2], [1, 2], [2, -1], [2, 1]];
        let index = 0
        while (index < movimientosPosibles.length) {
            if (this.casillaDisponible(this.fila + movimientosPosibles[index][0], this.columna + movimientosPosibles[index][1])){
                index++;
            } else {
                movimientosPosibles.splice(index, 1);
            }
        }
        if (movimientosPosibles.length > 0) {
            const movimientoElegido = movimientosPosibles[Math.floor(Math.random() * movimientosPosibles.length)];
            this.mover(movimientoElegido[0], movimientoElegido[1]);
        } else {
            this.bloqueado = true;
        }
    }
}

export { CaballoIA }