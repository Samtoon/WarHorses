import { Caballo } from "./caballo.js";
import Nodo from "./nodo.js";
import { Casilla, leerTablero, max, min } from "./tablero.js";
import valores from "./valoresTablero.json" assert {type: "json"};

class CaballoIA extends Caballo {
    constructor(fila = 0, columna = 0, max = true, dificultad = 1) {
        super(fila, columna, max);
        this.dificultad = dificultad;
        this.malPodados = 0;
    }
    decidirMovimiento() {
        let podarHasta = -1;
        this.ciclosEvitados = 0;
        this.arbolMinimax = [];
        
        const movimientosPosibles = valores.movimientosPosibles;
        this.arbolMinimax.push(new Nodo(0, 0, null, [], [], 0, this.max ? Number.NEGATIVE_INFINITY : Number.POSITIVE_INFINITY, this.max));
        const nodosPendientes = [0];
        let index = 1;
        // while (nodosPendientes.length > 0) {
        //     expandir(this.arbolMinimax, this.arbolMinimax[nodosPendientes[0]].profundidad < this.dificultad * 2 - 1 ? false : true);
        //     nodosPendientes.shift();
        // }
        //let nodoFinal = null;
        while (this.arbolMinimax.length > 1 || !this.arbolMinimax[0].terminal) {
            while (!this.arbolMinimax[this.arbolMinimax.length - 1].terminal) {
                expandir(this.arbolMinimax, this.arbolMinimax[this.arbolMinimax.length - 1].profundidad == this.dificultad * 2 - 1);
            }
            while (this.arbolMinimax[this.arbolMinimax.length - 1].terminal && this.arbolMinimax.length > 1) {
                analizar(this.arbolMinimax[this.arbolMinimax.length - 1], this.dificultad);
                this.arbolMinimax.pop();
                while (podarHasta != -1) {
                    if (this.arbolMinimax[this.arbolMinimax.length - 1].id == podarHasta) {
                        podarHasta = -1;
                    } else {
                        if (!descendiente(this.arbolMinimax[this.arbolMinimax.length - 1], podarHasta)) {
                            console.log("Yo era bueno, nooooooooo");
                            this.malPodados++;
                        }
                        this.arbolMinimax.pop();
                    }
                }
                // if (podarHasta != -1) {
                //     let index = 0;
                //     while (index < this.arbolMinimax.length) {
                //         if (descendiente(this.arbolMinimax[this.arbolMinimax.length - 1], podarHasta)) {
                //         this.arbolMinimax.pop();
                //         }
                //         index++;
                //     }
                //     podarHasta = -1;
                // }

            }
        }
        if (this.arbolMinimax[0].movimiento.length > 0) {
            //console.log("Mi utilidad es de " + this.arbolMinimax[0].utilidad);
            this.mover(this.arbolMinimax[0].movimiento[0], this.arbolMinimax[0].movimiento[1]);
            
        } else {
            this.bloqueado = true;
        }
        // if (this.arbolMinimax.length < 2) {
        //     this.bloqueado = true;
        // }
        // else {
        //     while (this.arbolMinimax[this.arbolMinimax.length - 1].profundidad != 1) {
        //         analizar(this.arbolMinimax[this.arbolMinimax.length - 1], this.dificultad);
        //         this.arbolMinimax.pop();
        //     }
        //     for (let i = this.arbolMinimax.length - 1; i > 0; i--) {
        //         analizar(this.arbolMinimax[i]);
        //     }
        //     const utilidadFinal = this.arbolMinimax[0].utilidad;
        //     //console.log("Mi utilidad es de " + utilidadFinal);
        //     this.arbolMinimax.shift();

        //     index = 0;
        //     while (index < this.arbolMinimax.length) {
        //         if (this.arbolMinimax[index].utilidad != utilidadFinal) {
        //             this.arbolMinimax.splice(index, 1);
        //         } else {
        //             index++;
        //         }
        //     }
        //     const nodoFinal = this.arbolMinimax[Math.floor(Math.random() * this.arbolMinimax.length)];
        //     if (nodoFinal.movimiento.length > 0) {
        //         this.mover(nodoFinal.movimiento[0], nodoFinal.movimiento[1]);
        //     } else {
        //         this.bloqueado = true;
        //     }

        //}
        function expandir(arbolMinimax = [], terminales = true) {
            const nodo = arbolMinimax[arbolMinimax.length - 1];
            if (nodo.padre != null) {
                nodo.alfa = nodo.padre.alfa;
                nodo.beta = nodo.padre.beta;
            }
            let esteril = true;
            let terminal = terminales;
            const caballo = nodo.max ? max : min;

            for (let i = 0; i < movimientosPosibles.length; i++) {
                let nuevaFila = caballo.fila + movimientosPosibles[i][0];
                let nuevaColumna = caballo.columna + movimientosPosibles[i][1];
                if (nodo.profundidad > 1) {
                    const abuelo = nodo.padre.casillasAfectadas[0];
                    nuevaFila = abuelo.fila + movimientosPosibles[i][0];
                    nuevaColumna = abuelo.columna + movimientosPosibles[i][1];
                }
                if (caballo.casillaDisponible(nuevaFila, nuevaColumna, nodo)) {
                    let casillas = [new Casilla(nuevaFila, nuevaColumna, caballo.valores.id)];
                    if (leerTablero(nuevaFila, nuevaColumna) == valores.bonificacion) {
                        casillas = casillas.concat(caballo.efectoBonificacion(nuevaFila, nuevaColumna, nodo));
                    }
                    esteril = false;
                    arbolMinimax.push(new Nodo(index, nodo.id, nodo, movimientosPosibles[i], casillas, nodo.profundidad + 1, -nodo.utilidad, !nodo.max, terminal, nodo.alfa, nodo.beta));
                    if (!terminal) {
                        nodosPendientes.push(index);
                    }
                    index++;
                }
            }
            if (esteril) {
                //console.log(`El nodo ${nodo.id} es estéril`);
                const fila = nodo.profundidad > 1 ? nodo.padre.casillasAfectadas[0].fila : caballo.fila;
                const columna = nodo.profundidad > 1 ? nodo.padre.casillasAfectadas[0].columna : caballo.columna;
                terminal = nodo.esteril ? true : terminal;
                arbolMinimax.push(new Nodo(index, nodo.id, nodo, [], [new Casilla(fila, columna, caballo.valores.id)], nodo.profundidad + 1, -nodo.utilidad, !nodo.max, terminal, nodo.alfa, nodo.beta));
                if (!terminal) {
                    nodosPendientes.push(index);
                }
                index++;
            }
            nodo.esteril = esteril;
        }
        function analizar(nodo = new Nodo(), dificultad) {
            // if (nodo.padre != null) {
            //     nodo.alfa = nodo.padre.alfa;
            //     nodo.beta = nodo.padre.beta;
            // }
            if (!Number.isFinite(nodo.utilidad)) {
                let pintadasMax = max.puntaje;
                let pintadasMin = min.puntaje;
                let nodoActual = nodo;
                while (nodoActual.padre != null) {
                    let valor = nodoActual.casillasAfectadas.length;
                    if (nodoActual.padre.esteril) {
                        valor -= 100;
                    }
                    if (nodoActual.max) {
                        pintadasMin += valor;
                    } else {
                        pintadasMax += valor;
                    }
                    nodoActual = nodoActual.padre;
                }
                nodo.utilidad = pintadasMax - pintadasMin;

            }
            if (nodo.actualizarPadre()) {
                podarHasta = nodo.padre.id;
            }
        }
        function descendiente(nodo, id) {
            let nodoActual = nodo;
            while (nodoActual.padre != null) {
                if (nodoActual.padre.id == id) {
                    return true;
                }
                nodoActual = nodoActual.padre;
            }
            return false;
        }
        /* let index = 0
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
        } */

    }
    casillaDisponible(fila, columna, nodo = new Nodo()) {
        if (super.casillaDisponible(fila, columna)) {
            let nodoActual = nodo.copiar();
            while (nodoActual.padre != null) {
                for (let i = 0; i < nodoActual.casillasAfectadas.length; i++) {
                    if (nodoActual.casillasAfectadas[i].fila == fila &&
                        nodoActual.casillasAfectadas[i].columna == columna) {
                        this.ciclosEvitados++;
                        return false;
                    }
                }
                nodoActual = nodoActual.padre.copiar();
            }
            return true;
        }
        this.ciclosEvitados++;
        return false;
    }
}

export { CaballoIA }