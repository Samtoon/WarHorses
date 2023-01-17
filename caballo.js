import graficar from "./movimiento.js";
import Nodo from "./nodo.js";
import { crearTablero, pintarTablero, leerTablero, display, Casilla, nFilas, nColumnas, jugar,jugarSoloMax } from "./tablero.js";
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
        
        if(this.bloqueado){
           console.log("entro a solo caballo" )
            
        }else{
            if(!this.max) {
                jugar();
    
            }
        }
        
    }
    decidirMovimiento(filas,columnas,lista) {
        


        

        
   
        if (!this.atrapado()) {
            
            function contieneMovimiento(filas_, columnas_) {
                for (let i = 0; i < valores.movimientosPosibles.length; i++) {
                    const movimientoEvaluado = valores.movimientosPosibles[i];
                    if (filas_ == movimientoEvaluado[0] && columnas_ == movimientoEvaluado[1]) {
                        
                        return true;
                    }
                }
                return false;
            }

            

            console.log(`El includes es: ${typeof [filas, columnas]} y movimientosPosibles: ${valores.movimientosPosibles[0]}, la comparación es ${[-2, -1] === valores.movimientosPosibles[0]}`);
            
            if (this.casillaDisponible(this.fila + filas, this.columna + columnas) && contieneMovimiento(filas, columnas)) {
               
                this.mover(filas, columnas);
                
            } else {
                //alert("Movimiento inválido");
                //this.bloqueado=true;
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

    añadirListeners(){
        console.log("inicio")
        let fila=this.fila+1;
        let columna=this.columna+1;
        let movDisponible=[];
        movDisponible.push([fila+1,columna-2]);
        movDisponible.push([fila+1,columna+2]);
        movDisponible.push([fila-1,columna-2]);
        movDisponible.push([fila-1,columna+2]);
        movDisponible.push([fila-2,columna-1]);
        movDisponible.push([fila-2,columna+1]);
        movDisponible.push([fila+2,columna-1]);
        movDisponible.push([fila+2,columna+1]);
        let casillasCambiadas=0;

        for(let i=0;i<8;i++){
            let filaD=movDisponible[i][0];
            let columnaD=movDisponible[i][1];
            if(this.casillaDisponible(filaD-1,columnaD-1)){
                casillasCambiadas= casillasCambiadas+1;
                
                document.getElementById((movDisponible[i][0]*10)+movDisponible[i][1]).addEventListener("click",()=>this.decidirMovimiento(movDisponible[i][0]-fila, movDisponible[i][1]-columna,casillasCambiadas));
                document.getElementById((movDisponible[i][0]*10)+movDisponible[i][1]).classList.add("seleccion");
                console.log("pinto opciones");
            }
            
            
        }
        console.log("casillas disponibles"+casillasCambiadas)
        if(casillasCambiadas==0){
            this.bloqueado=true;
            jugarSoloMax();
        }

    }
}

console.log("hola");
export { Caballo };
