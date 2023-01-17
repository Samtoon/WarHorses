import valores from "./valoresTablero.json" assert {type: "json"};
const tablero=[[3,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,3,0],
         [0,0,0,0,3,0,0,0],
         [0,0,0,0,0,0,0,0],
         [0,5,0,2,0,0,0,0],
         [0,0,0,5,0,4,0,1],
         [4,5,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0]]

let idCasilla;

function graficar(tablero){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            idCasilla= (j+1)*10+(i+1)+"";
            switch(parseInt(tablero[j][i])){

                case valores.max.id:

                    document.getElementById(idCasilla).innerHTML='<img src="recursos/caballo.png" height="98px">';
                    document.getElementById(idCasilla).className = "box red"
                    break;
                case valores.max.pintura:

                    document.getElementById(idCasilla).className = "box red"
                    break;
                case valores.min.id:

                    document.getElementById(idCasilla).innerHTML='<img src="recursos/caballo.png" height="98px">';
                    document.getElementById(idCasilla).className = "box yellow"
                    break;
                case valores.min.pintura:
                    
                    document.getElementById(idCasilla).className = "box yellow"
                    break;
                case valores.bonificacion:
                
                    document.getElementById(idCasilla).innerHTML='<img src="recursos/bonus.png" height="98px">';
                    break;
                
                case valores.vacio:
                    
                    document.getElementById(idCasilla).className = "box black"
                    break;




            }
        }
    }
}

//pintarTablero(tablero);
export default graficar