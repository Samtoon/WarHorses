//import valores from "valoresTablero.json" assert {type: "json"};
tablero=[[3,0,0,0,0,0,0,0],
         [0,0,0,0,0,0,3,0],
         [0,0,0,0,3,0,0,0],
         [0,0,0,0,0,0,0,0],
         [0,5,0,2,0,0,0,0],
         [0,0,0,5,0,4,0,1],
         [4,5,0,0,0,0,0,0],
         [0,0,0,0,0,0,0,0]]

let idCasilla;

function pintarTablero(tablero){
    for(let i=0;i<8;i++){
        for(let j=0;j<8;j++){
            idCasilla= (j+1)*10+(i+1)+"";
            switch(parseInt(tablero[j][i])){

                case 1:

                    document.getElementById(idCasilla).innerHTML='<img src="recursos/caballo.png" height="98px">';
                    document.getElementById(idCasilla).className = "box red"
                    break;
                case 3:

                    document.getElementById(idCasilla).className = "box red"
                    break;
                case 2:

                    document.getElementById(idCasilla).innerHTML='<img src="recursos/caballo.png" height="98px">';
                    document.getElementById(idCasilla).className = "box yellow"
                    break;
                case 4:
                    
                    document.getElementById(idCasilla).className = "box yellow"
                    break;
                case 5:
                
                    document.getElementById(idCasilla).innerHTML='<img src="recursos/bonus.png" height="98px">';
                    break;


            }
        }
    }
}

pintarTablero(tablero);