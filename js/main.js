const divReloj = document.querySelector('.reloj');
const btnIniciar = document.querySelector('.iniciarTemp');
const btnPausar = document.querySelector('.pausarTemp');
const btnDetener = document.querySelector('.detenerTemp');
const horasUser = document.querySelector('.horasUser');
const minutosUser = document.querySelector('.minutosUser');
const segundosUser = document.querySelector('.segundosUser');
const p = document.querySelector('p');
const btnSumar = document.querySelectorAll('.btnSumar');
const btnRestar = document.querySelectorAll('.btnRestar');

const alarma = new Audio('./assets/Alarma.mp3');
let repeticionAlarma;

let horasRestantesIniciales = [0];
let minutosRestantesIniciales = [0];
let segundosRestantesIniciales = [0];

const arrayDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
const arrayMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

setInterval(()=>{
    if(horasUser.innerHTML > '00') {
        horasUser.style.filter = 'brightness(2)'
    } else horasUser.style.filter = 'brightness(0.6)'
    if(minutosUser.innerHTML > '00') {
        minutosUser.style.filter = 'brightness(2)'
    } else minutosUser.style.filter = 'brightness(0.6)'
    if(segundosUser.innerHTML > '00') {
        segundosUser.style.filter = 'brightness(2)'
    } else segundosUser.style.filter = 'brightness(0.6)'
},50)

const getTiempoFaltante = (fechaLimite) => {
    let tiempoActual = new Date();
    let msRestantes = new Date(fechaLimite) - tiempoActual
    let tiempoRestanteEnSeg = (new Date(fechaLimite) - tiempoActual + 1000) / 1000;
    let segundosRestantes = ('0' + Math.floor(tiempoRestanteEnSeg % 60)).slice(-2); 
    let minutosRestantes = ('0' + Math.floor(tiempoRestanteEnSeg / 60 % 60)).slice(-2); 
    let horasRestantes = ('0' + Math.floor(tiempoRestanteEnSeg / 3600 % 24)).slice(-2); 
    let diasRestantes = Math.floor(tiempoRestanteEnSeg / (3600 * 24));
    return {
        msRestantes,
        tiempoRestanteEnSeg,
        segundosRestantes,
        minutosRestantes,
        horasRestantes,
        diasRestantes,
    }
}

btnSumar.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{

        switch(e.target.className) {
            case 'btnSumar sumarHora':
                horasRestantesIniciales.unshift(parseInt(horasUser.innerHTML)+1)

                let hora = parseInt(horasUser.innerHTML)
                let sumarHora = hora + 1;
                if(sumarHora <= 9) {
                    horasUser.innerHTML = '0' + String(sumarHora)
                } else if(sumarHora > 9 &&sumarHora <= 23){
                    horasUser.innerHTML = String(sumarHora)
                } else if(hora === 23){
                    horasUser.innerHTML = '00'
                }
                break;
            case 'btnSumar sumarMinuto':
                minutosRestantesIniciales.unshift(parseInt(minutosUser.innerHTML)+1)

                let minuto = parseInt(minutosUser.innerHTML)
                let sumarMinuto = minuto + 1;
                if(sumarMinuto <= 9) {
                    minutosUser.innerHTML = '0' + String(sumarMinuto)
                } else if(sumarMinuto > 9 && sumarMinuto <= 59){
                    minutosUser.innerHTML = String(sumarMinuto)
                } else if(minuto === 59){
                    minutosUser.innerHTML = '00'
                }
                break;
            case 'btnSumar sumarSegundo':
                segundosRestantesIniciales.unshift(parseInt(segundosUser.innerHTML)+1)

                let segundo = parseInt(segundosUser.innerHTML)
                let sumarSegundo = segundo + 1;
                if (sumarSegundo <= 9) {
                    segundosUser.innerHTML = '0' + String(sumarSegundo)
                } else if(sumarSegundo > 9 && sumarSegundo <= 59){
                    segundosUser.innerHTML = String(sumarSegundo)
                } else if(segundo === 59){
                    segundosUser.innerHTML = '00'
                }
                break;
            }
        })
    })

btnRestar.forEach((btn)=>{
    btn.addEventListener('click', (e)=>{

        switch(e.target.className) {
            case 'btnRestar restarHora':
                horasRestantesIniciales.unshift(parseInt(horasUser.innerHTML)-1)
                let hora = parseInt(horasUser.innerHTML)
                let restarHora = hora - 1;
                if(hora === 0){
                    horasUser.innerHTML = '23'
                } else if(restarHora <= 9) {
                    horasUser.innerHTML = '0' + String(restarHora)
                } else if(restarHora > 9 && restarHora <= 23){
                    horasUser.innerHTML = String(restarHora)
                }
                break;
            case 'btnRestar restarMinuto':
                minutosRestantesIniciales.unshift(parseInt(minutosUser.innerHTML)-1)
                let minuto = parseInt(minutosUser.innerHTML)
                let restarMinuto = minuto - 1;
                if(minuto === 0){
                    minutosUser.innerHTML = '59'
                } else if(restarMinuto <= 9) {
                    minutosUser.innerHTML = '0' + String(restarMinuto)
                } else if(restarMinuto > 9 && restarMinuto <= 59){
                    minutosUser.innerHTML = String(restarMinuto)
                }
                break;
            case 'btnRestar restarSegundo':
                segundosRestantesIniciales.unshift(parseInt(segundosUser.innerHTML)-1)
                let segundo = parseInt(segundosUser.innerHTML)
                let restarSegundo = segundo - 1;
                if(segundo === 0){
                    segundosUser.innerHTML = '59'
                } else if (restarSegundo <= 9) {
                    segundosUser.innerHTML = '0' + String(restarSegundo)
                } else if(restarSegundo > 9 && restarSegundo <= 59){
                    segundosUser.innerHTML = String(restarSegundo)
                }
                break;
            }
        })
    })

btnIniciar.addEventListener('click', ()=>{
    alarma.pause()
    
    let tiempoActual = new Date();
    let diaActual = tiempoActual.getDay();
    let mesActual = tiempoActual.getMonth();
    let fechaActual = tiempoActual.getDate();
    let anioActual = tiempoActual.getFullYear();
    let horaActual = tiempoActual.getHours();
    let minutosActual = tiempoActual.getMinutes();
    let segundosActual = tiempoActual.getSeconds();

    let horasRestantesParse = parseInt(horasUser.innerHTML);
    let horasRestantes = horaActual + horasRestantesParse;

    let minutosRestantesParse = parseInt(minutosUser.innerHTML);
    let minutosRestantes = minutosActual + minutosRestantesParse;

    let segundosRestantesParse = parseInt(segundosUser.innerHTML); 
    let segundosRestantes = segundosActual + segundosRestantesParse;

    if(horasRestantesParse !== 0 ||
        minutosRestantesParse !== 0 ||
        segundosRestantesParse !== 0 ) {
             btnIniciar.style.display = 'none';
             btnPausar.style.display = '';
             btnSumar.forEach((btn)=>{
                 btn.style.display = 'none'
             })
             btnRestar.forEach((btn)=>{
                 btn.style.display = 'none'
             })
        }

    if(horasUser.innerHTML !== '00' ||
       minutosUser.innerHTML !== '00' || 
       segundosUser.innerHTML !== '00') {
        if(segundosRestantes > 59) {
            segundosRestantes = segundosRestantes - 60;
            minutosRestantes = minutosRestantes + 1;
        }
        if(minutosRestantes > 59) {
            minutosRestantes = minutosRestantes - 60;
            horasRestantes = horasRestantes + 1;
        }
        if(horasRestantes > 23) {
            horasRestantes = horasRestantes - 24;
            diaActual = diaActual + 1;
            fechaActual = fechaActual + 1;
        }

        let rejolInt = setInterval(() => {

            let reloj = getTiempoFaltante(`${arrayDays[diaActual]} ${arrayMonths[mesActual]} ${String(fechaActual)} ${String(anioActual)} ${String(horasRestantes)}:${String(minutosRestantes)}:${String(segundosRestantes)} GMT-0300`)
            
            console.log(reloj)
            horasUser.innerHTML = `${reloj.horasRestantes}`
            minutosUser.innerHTML = `${reloj.minutosRestantes}`
            segundosUser.innerHTML = `${reloj.segundosRestantes}`
            
            if(reloj.segundosRestantes == 0 &&
                reloj.minutosRestantes == 0 &&
                reloj.horasRestantes == 0){
                 clearInterval(rejolInt)
                 alarma.play();
                repeticionAlarma = setTimeout(()=>{
                    alarma.play()
                },4000)

                 btnIniciar.style.display = '';
                 btnPausar.style.display = 'none';
                
                setTimeout(()=>{
                    btnSumar.forEach((btn)=>{
                        btn.style.display = ''
                    })
                    btnRestar.forEach((btn)=>{
                        btn.style.display = ''
                    })
                },500)
             }
        }, 1000);
        clearTimeout(repeticionAlarma)

        btnPausar.addEventListener('click',()=>{
            clearInterval(rejolInt)
            btnPausar.style.display = 'none';
            btnIniciar.style.display = '';
        });

        btnDetener.addEventListener('click',()=>{
            clearInterval(rejolInt)
            alarma.pause()
            clearTimeout(repeticionAlarma)
            btnIniciar.innerHTML = "Iniciar";
            btnSumar.forEach((btn)=>{
                btn.style.display = ''
            })

            btnRestar.forEach((btn)=>{
                btn.style.display = ''
            })
            if(horasRestantesIniciales[0] <= 9) {
                horasUser.innerHTML = '0'+`${horasRestantesIniciales[0]}`
            } else horasUser.innerHTML = `${horasRestantesIniciales[0]}`

            if(minutosRestantesIniciales[0] <= 9) {
                minutosUser.innerHTML = '0'+`${minutosRestantesIniciales[0]}`
            } else minutosUser.innerHTML = `${minutosRestantesIniciales[0]}`

            if(segundosRestantesIniciales[0] <= 9) {
                segundosUser.innerHTML = '0'+`${segundosRestantesIniciales[0]}`
            } else segundosUser.innerHTML = `${segundosRestantesIniciales[0]}`

            btnIniciar.style.display = '';
            btnPausar.style.display = 'none';
        })
    }
})