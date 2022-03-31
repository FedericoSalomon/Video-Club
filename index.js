const bcrypt = require('bcrypt')
const fs = require('fs'); //import File system
const clienteService = require("./Funciones-Clientes");
var readlineSync = require('readline-sync');
const { agregarPeliculas, mostrarPeliculas } = require('./Funciones-Peliculas');
const { agregarEmpleados } = require('./Funciones-Empleados');
const { eliminar } = require('./Funcion-Eliminar');
const { alquilerPel, mostrarAlquileres } = require('./Funciones-Alquileres');
const { table } = require('console');


var rawdata = fs.readFileSync('DB.json') // carga archivo en memoria
var data = JSON.parse(rawdata); // conversion a JSON
var clientes = data.clientes;
var peliculas = data.peliculas;
var empleados = data.empleados;
var alquileres = data.alquileres;
if (peliculas === undefined) {
    peliculas = [];
}
var logeado = null;
readlineSync.question('Carga exitosa. ENTER para comenzar');




function loopAgregarUser() {
    var nwuser = "SI";
    while (nwuser == "SI") {
        clienteService.agregarPersonas(clientes);
        nwuser = readlineSync.question('Desea agregar otro usuario? SI/NO')
    }
}

function Inicio() {
    var respuesta = ""

    do {
        console.clear();
        console.log("-----Menu-Principal------");
        console.log("-1- Agregar Clientes");
        console.log("--------------------");
        console.log("-2- Mostrar Users");
        console.log("------------");
        console.log("-3-Agregar peliculas");
        console.log("------------");
        console.log("-4- Ver Titulos");
        console.log("------------");
        console.log("-5- Agregar Empleados");
        console.log("------------");
        console.log("-6- Eliminar");
        console.log("------------");
        console.log("-7- Alquilar pelicula");
        console.log("------------");
        console.log("-8- Mostrar alquileres")
        console.log("------------");
        console.log("-0- Salir");
        respuesta = readlineSync.question('Que desea hacer?');

        if (respuesta === "1") {
            loopAgregarUser();
        } else if (respuesta === "2") {
            console.table(clientes);
            readlineSync.question('presione ENTER para continuar...');
        } else if (respuesta === "3") {
            agregarPeliculas(peliculas);
        } else if (respuesta === "4") {
            console.table(mostrarPeliculas(peliculas, alquileres));
            readlineSync.question('presione ENTER para continuar...');
        } else if (respuesta === "5") {
            agregarEmpleados(empleados)
            readlineSync.question('presione ENTER para continuar...');
        } else if (respuesta === "6") {
            borrar();
        } else if (respuesta === "7") {
            alquilerPel(empleados, clientes, peliculas, alquileres, logeado);
        } else if (respuesta === "8") {
            var stock = mostrarAlquileres(alquileres, peliculas, clientes, empleados);
            console.table(stock)


            readlineSync.question('presione ENTER para continuar...');
        } else if (respuesta === "0") {
            readlineSync.question('Saliendo del programa...');
        } else {
            readlineSync.question('opcion incorrecta presione ENTER para continuar...');
        }


    }
    while (respuesta != 0)



}

function borrar() {
    console.clear();
    console.log("----Seleccione que desea eliminar------");
    console.log("-1- Clientes");
    console.log("--------------------");
    console.log("-2- Peliculas");
    console.log("------------");
    console.log("-3-Empleados");
    console.log("------------");
    console.log("-4-salir");

    respuesta = readlineSync.question('...???...');
    if (respuesta === "1") {
        eliminar(clientes);
    } else if (respuesta === "2") {
        eliminar(peliculas);
    } else if (respuesta === "3") {
        eliminar(empleados);
    } else if (respuesta !== "1" & respuesta !== "2" & respuesta !== "3") {
        console.log("Opcion incorrecta");
    } else if (respuessta === "4") {
        inicio();
    }
}

function login() {
    var user = parseInt(readlineSync.question('Ingrese su ID'));
    var pass = readlineSync.question('Ingrese su contraseña');
    for (i = 0; i < empleados.length; i++) {
        if (empleados[i].ID === user && bcrypt.compareSync(pass, empleados[i].password)) {
            return empleados[i];

        }
    }
    console.error("Contraseña incoorrecta");
    return null

}



while (logeado === null) {
    //logeado = login()
    logeado = true

}

Inicio();

console.clear();
console.log("Guardando");
readlineSync.question('Guardado exitoso. ENTER para salir');
var end = {
    empleados: empleados,
    peliculas: peliculas,
    clientes: clientes,
    alquileres: alquileres
}
var data = JSON.stringify(end); //conversion de JSON a string
fs.writeFileSync('DB.json', data); // Guardando contenido en archivo