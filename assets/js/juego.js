
(()=>{

    let baraja = [];
    const   tipos = ['C','D','H','S'],
            especiales = ['A','J','Q','K'];
    let puntosJugador = 0,
        puntosComputadora = 0;
    
    /* REFERENCIAS DEL HTML */
    const   btnNuevo = document.querySelector('#btnNuevo'),
            btnPedir = document.querySelector('#btnPedir'),
            btnDetener = document.querySelector('#btnDetener'),
            smalls = document.querySelectorAll('small'),
            divCartasJugador = document.querySelector('#jugador-cartas'),
            divCartasComputadora = document.querySelector('#computadora-cartas');
    
    /*  */
    const crearBaraja = () => {
        baraja=[];

        for(let i = 2 ; i <= 10; i++){
            for(tipo of tipos){
                baraja.push(i + tipo);
            }
        }
    
        for(tipo of tipos){
            for(especial of especiales)
            baraja.push(especial + tipo)
        }
    
        baraja = _.shuffle(baraja)
    }

    /* iniciarJuego */
    crearBaraja();
    
    
    /*  */
    const pedirCarta = () => {
        const carta = baraja.pop();
        return carta
    }
    
    /*  */
    const valorCarta = (carta) => {
        let valor = carta.substring(0, carta.length-1);
        return (isNaN(valor))
                ?  (valor === 'K') ? 13 :
                   (valor === 'Q') ? 12 :
                   (valor === 'J') ? 11 : 1 
                :valor * 1  
    }
    
    /*  */
    const turnoComputadora = (puntosMinimos) => {
    
        do {
            
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta(carta);
        smalls[1].innerText = puntosComputadora;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        imgCarta.classList.add('img-fluid');
        divCartasComputadora.append( imgCarta );
    
        if( puntosMinimos > 21) {
            break;
        }
    
        } while((puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );
    
        setTimeout(() => {
            if (puntosComputadora === puntosMinimos) {
                alert('Nadie Gano :C');
            } else if (puntosMinimos > 21) {
                alert('Computadora Gana :C')
            } else if (puntosComputadora > 21) {
                alert('Genial Ganaste :D')
            } else{
                alert('Computadora Gana :C')
            }
        }, 100);
    
        
    }
    
    
    /* EVENTOS */
    btnPedir.addEventListener('click', ()=>{
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta(carta);
        smalls[0].innerText = puntosJugador;
    
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        imgCarta.classList.add('img-fluid');
    
        divCartasJugador.append( imgCarta );
    
        if (puntosJugador > 21) {
            console.warn('Perdiste, Intentalo de nuevo')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        } else if(puntosJugador === 21) {
            console.warn('Genial, Ganaste')
            btnPedir.disabled = true;
            btnDetener.disabled = true;
            turnoComputadora( puntosJugador );
        }
        
    })
    
    btnDetener.addEventListener('click', () => {
        btnDetener.disabled = true;
        btnPedir.disabled = true;
        turnoComputadora( puntosJugador );
    })
    
    btnNuevo.addEventListener('click', () =>{
        crearBaraja();
        puntosComputadora = 0;
        puntosJugador = 0
        btnPedir.disabled = false;
        btnDetener.disabled = false;
        smalls[0].innerText = '0';
        smalls[1].innerText = '0';
        divCartasJugador.innerHTML='';
        divCartasComputadora.innerHTML='';
    
    })
})();




