class Nodo {
    constructor (id = 0, idPadre = 0, padre = null, movimiento = [], casillasAfectadas = [], profundidad = 0, utilidad = Number.POSITIVE_INFINITY, max = true, terminal = false) {
        this.id = id;
        this.idPadre = idPadre;
        this.esteril = false;
        this.profundidad = profundidad;
        this.utilidad = utilidad;
        this.max = max;
        this.terminal = terminal;
        this.padre = padre;
        this.movimiento = movimiento;
        this.casillasAfectadas = casillasAfectadas;
    }
    actualizarPadre() {
        if(this.padre != null) {
            if(this.max) {
                this.padre.utilidad = Math.min(this.padre.utilidad, this.utilidad);
            } else {
                this.padre.utilidad = Math.max(this.padre.utilidad, this.utilidad);
            }
            this.padre.terminal = true;
            if (this.padre.padre == null && this.padre.utilidad == this.utilidad) {
                this.padre.movimiento = this.movimiento;
            }
        }
    }
    copiar() {
        return new Nodo(this.id, this.idPadre, this.padre, this.movimiento, this.casillasAfectadas, this.profundidad, this.utilidad, this.max);
    }
}

export default Nodo;