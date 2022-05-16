
// connect to Moralis server
const serverUrl = "https://ybti6j0ifytt.usemoralis.com:2053/server";
const appId = "0np0WyOOP6jqbTliWwZ1OOv1x7dgg92mrsao3oio";
Moralis.start({ serverUrl, appId });

// Dirección del contrato
const direccion_contrato="0xe56cd1b9f4d7D8C8A75a2536b2b16Fce30d391C6";
const abi_contrato=[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"owner","type":"address"},{"indexed":true,"internalType":"address","name":"spender","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Approval","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Paused","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"from","type":"address"},{"indexed":true,"internalType":"address","name":"to","type":"address"},{"indexed":false,"internalType":"uint256","name":"value","type":"uint256"}],"name":"Transfer","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"address","name":"account","type":"address"}],"name":"Unpaused","type":"event"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"agregarAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"},{"internalType":"address","name":"spender","type":"address"}],"name":"allowance","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"approve","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burn","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnFrom","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"burnearAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"decimals","outputs":[{"internalType":"uint8","name":"","type":"uint8"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"subtractedValue","type":"uint256"}],"name":"decreaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"spender","type":"address"},{"internalType":"uint256","name":"addedValue","type":"uint256"}],"name":"increaseAllowance","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"mintearAdmin","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"name","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"paused","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"ponerPausa","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"quitarPausa","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"soyAdmin","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"symbol","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalSupply","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transfer","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"}],"name":"transferFrom","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"nonpayable","type":"function"}];
          
async function login() {
    let user = Moralis.User.current();
    if (!user) {
      user = await Moralis.authenticate();
      await Moralis.enableWeb3();
    }
    console.log("logged in user:", user);
}

async function logOut() {
    await Moralis.User.logOut();
    console.log("logged out");
}

async function enlaceUltimaTransaccion(resultado) {
    
    cadena=JSON.stringify(resultado);
    cadena=cadena.split(",");
    hash=cadena[0].split(":")[1];
    hash=hash.split('"').join('');
    console.log("El hash es:",hash);

    enlace = "https://ropsten.etherscan.io/tx/";

    enlace=enlace.concat(hash);

    console.log("El enlace para ver la transaccion es:",enlace);

    document.getElementById("enlace-transaccion").href=enlace;

    alert("Llamada a la función del smart contract con éxito, espere unos segundos para que la operación se realice en"+
    " la blockchain\nPuede acceder a la transaccion en Etherscan con el enlace para acceder a la última transacción.");

}


// Funcion para verificar si eres Admin
async function soyAdmin() {

    let options = {
        contractAddress:direccion_contrato,
        functionName:"soyAdmin",
        abi:abi_contrato,
        params:{
        }
    }

    resultado = await Moralis.executeFunction(options);

    if(resultado == true){
        document.getElementById("texto-verificar-admin").value="SÍ eres admin";
    }
    else{
        document.getElementById("texto-verificar-admin").value="NO eres admin";
    }
    
    console.log("Resultado:",resultado);

}


// Funcion para comprobar el saldo de una cartera
async function saldoCartera() {

    numero_cartera=document.getElementById("direccion-usuario").value;

    let options = {
        contractAddress:direccion_contrato,
        functionName:"balanceOf",
        abi:abi_contrato,
        params:{
            account : numero_cartera
        }
    }

    numero = await Moralis.executeFunction(options);

    numero_tokens=numero.toNumber()/100
    
    console.log("El numero de tokens de la cartera introducida es: ", numero_tokens);
    
    document.getElementById("saldo-direccion").value=numero_tokens;
    

}

// Funcion para comprobar el saldo total de la red
async function saldoTotal() {


    let options = {
        contractAddress:direccion_contrato,
        functionName:"totalSupply",
        abi:abi_contrato,
        params:{
        }
    }

    numero = await Moralis.executeFunction(options);

    numero_tokens=numero.toNumber()/100
    
    console.log("El numero de tokens de toda la red es: ", numero_tokens);
    
    document.getElementById("saldo-red").value=numero_tokens;
    

}

// Funcion para comprobar si la red está pausada o no
async function consultarPausa() {


    let options = {
        contractAddress:direccion_contrato,
        functionName:"paused",
        abi:abi_contrato,
        params:{
        }
    }

    resultado = await Moralis.executeFunction(options);

    if(resultado == true){
        document.getElementById("estado-red").value="La red SÍ está pausada";
    }
    else{
        document.getElementById("estado-red").value="La red NO está pausada";
    }
    
    console.log("Resultado:",resultado);
       

}

// Funcion para mintear tokens a una dirección si eres administrador
async function mintearAdmin() {

    numero_cartera=document.getElementById("direccion-mint").value;
    numero_tokens=document.getElementById("numero-mint").value;

    numero_tokens = parseInt(numero_tokens);

    if(isNaN(numero_tokens)){
        alert("Has introducido un valor no numérico");
        return;
    }

    let options = {
        contractAddress:direccion_contrato,
        functionName:"mintearAdmin",
        abi:abi_contrato,
        params:{
            account : numero_cartera,
            amount: numero_tokens
        }
    }

    resultado = await Moralis.executeFunction(options);

    
    enlaceUltimaTransaccion(resultado);

}

// Funcion para mintear tokens a una dirección si eres administrador
async function burnearAdmin() {

    numero_cartera=document.getElementById("direccion-burn").value;
    numero_tokens=document.getElementById("numero-burn").value;

    numero_tokens = parseInt(numero_tokens);

    if(isNaN(numero_tokens)){
        alert("Has introducido un valor no numérico");
        return;
    }

    let options = {
        contractAddress:direccion_contrato,
        functionName:"burnearAdmin",
        abi:abi_contrato,
        params:{
            account : numero_cartera,
            amount: numero_tokens
        }
    }

    resultado = await Moralis.executeFunction(options);

    
    enlaceUltimaTransaccion(resultado);

}

// Funcion para pausar/despausar la red si eres administrador
async function elegirPausaAdmin() {

    eleccionPausa = document.getElementsByName('seleccion-pausa');


    if (eleccionPausa[0].checked){
        console.log("La eleccion es PAUSAR");
        funcion="ponerPausa";

    }
    else{
        console.log("La eleccion es DESPAUSAR");
        funcion="quitarPausa";
    }

    let options = {
        contractAddress:direccion_contrato,
        functionName:funcion,
        abi:abi_contrato,
        params:{
        }
    }

    resultado = await Moralis.executeFunction(options);

    
    enlaceUltimaTransaccion(resultado);


}

// Funcion para mandar tus tokens a otra direccion
async function mandarTokens() {

    numero_cartera=document.getElementById("direccion-mandar").value;
    numero_tokens=document.getElementById("numero-mandar").value;

    numero_tokens = parseInt(numero_tokens);

    if(isNaN(numero_tokens)){
        alert("Has introducido un valor no numérico");
        return;
    }

    let options = {
        contractAddress:direccion_contrato,
        functionName:"transfer",
        abi:abi_contrato,
        params:{
            to : numero_cartera,
            amount: numero_tokens
        }
    }

    resultado = await Moralis.executeFunction(options);

    
    enlaceUltimaTransaccion(resultado);

}


// Funcion para añadir un nuevo administrador si eres administrador
async function agregarAdmin() {

    numero_cartera=document.getElementById("direccion-admin").value;


    let options = {
        contractAddress:direccion_contrato,
        functionName:"agregarAdmin",
        abi:abi_contrato,
        params:{
            account : numero_cartera,
        }
    }

    resultado = await Moralis.executeFunction(options);

    
    enlaceUltimaTransaccion(resultado);

}


//ASIGNAR A LOS BOTONES LAS FUNCIONES CORRESPONDIENTES

document.getElementById("btn-login").onclick = login;
document.getElementById("btn-logout").onclick = logOut;
document.getElementById("btn-verificar-admin").onclick = soyAdmin;
document.getElementById("btn-leer").onclick = saldoCartera;
document.getElementById("btn-saldo-red").onclick = saldoTotal;
document.getElementById("btn-esdado-red").onclick = consultarPausa;
document.getElementById("btn-mint").onclick = mintearAdmin;
document.getElementById("btn-burn").onclick = burnearAdmin;
document.getElementById("btn-pausa").onclick = elegirPausaAdmin;
document.getElementById("btn-mandar").onclick = mandarTokens;
document.getElementById("btn-admin").onclick = agregarAdmin;

//Fin del documento s
