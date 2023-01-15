class Nodo {
    constructor (idPadre = 0, padre = null, movimiento = [], casillasAfectadas = [], profundidad = 0, utilidad = Number.POSITIVE_INFINITY, max = true) {
        this.idPadre = idPadre;
        this.padre = padre;
        this.movimiento = movimiento;
        this.casillasAfectadas = casillasAfectadas;
        this.profundidad = profundidad;
        this.utilidad = utilidad;
        this.max = max;
    }
    actualizarPadre() {
        if(this.max) {
            this.padre.utilidad = Math.min(this.padre.utilidad, this.utilidad);
        } else {
            this.padre.utilidad = Math.max(this.padre.utilidad, this.utilidad);
        }
    }
    copiar() {
        return new Nodo(this.idPadre, this.padre, this.movimiento, this.casillasAfectadas, this.profundidad, this.utilidad, this.max);
    }
}

export default Nodo;