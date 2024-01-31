let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento,texto) {
    let elemntoHTML = document.querySelector(elemento);
    elemntoHTML.innerHTML = texto;
    return;
/* es una forma de optimizar y hacerlo más eficiente; se usa unicamente un document para agregar el titulo y el parrafo del juego
ya que anteriormente estaba así:

let titulo = document.querySelector('h1');
titulo.innerHTML = 'juego del número secreto';

let parrafo = document.querySelector('p');
parrafo.innerHTML = 'indica un número del 1 al 10';

asi ya no tenemos que repetir el codigo, y solo usar uno
la variable elemento es 'h1' y 'p' ; la variable texto es 'juego del número secreto' y 'indica un número del 1 al 10' 
*/
}
//esto es para darle uso al boton "intentar" al momento de ingresar el numero
function verificarIntento() { 
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value); //parseInt para que los numeros generados no sean strings
    
    console.log(intentos);
    if (numeroDeUsuario === numeroSecreto){
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`);
        document.getElementById('reiniciar').removeAttribute('disabled');//esto sirve para que al momento de acertar el voton de 'nuevo juego se avilite y cambia el num secreto
    
    }else {
        //el usuario no acerto
        if (numeroDeUsuario > numeroSecreto) {
            asignarTextoElemento('p','El número secreto es menor');//en una funcion se puede llamar a otra funcion
        }else {
            asignarTextoElemento('p','El número secreto es mayor');
        }
        intentos++;
        limpiarCaja();
    }
    return;
}
function limpiarCaja() { //esta funcion es para cuando se dijite el numero si no lo acerto se limpie la caja en automatico para volver a ponerotro
    document.querySelector('#valorUsuario').value = '';
/* # es para que querySelector sepa que lo quieres por un id; valorUsuario esta en el imput del html
'' es para indicar vacio*/
}

//para que a cada inicio de partida el numero aleatorio no se repita 
function generarNumeroSecreto() {
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(numeroGenerado);
    console.log(listaNumerosSorteados);
    //si ya sorteamos todos los numeros
    if (listaNumerosSorteados.length == numeroMaximo){
        asignarTextoElemento('p','Ya se sortearon todos los números posibles');
    }else {
        //si el numero generado esta incluido en la lista 
        if (listaNumerosSorteados.includes(numeroGenerado)){
            return generarNumeroSecreto();
        
        } else {
            listaNumerosSorteados.push(numeroGenerado);
            return numeroGenerado;
        }
    }
}
function condicionesIniciales(){
    //como la funcion espera que le mandes un elemnto y un texto, se lo mandas de esta manera:
    asignarTextoElemento('h1','Juego del número secreto!');
    asignarTextoElemento('p',`indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 1;
}

function reiniciarJuego(){//es como si generaramos un loop del juego
    //limpiar caja
    limpiarCaja();
    //indicar mensaje de intervalos de numeros
    //generar el numero aleatorio
    //inicializar el numero intentos
    condicionesIniciales();
    //desabilitar el boton de nuevo juego
    document.querySelector('#reiniciar').setAttribute('disabled','true');
}
condicionesIniciales();
