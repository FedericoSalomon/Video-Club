var readlineSync = require('readline-sync');
const { idGen } = require('./FuncionesID');

function agregarPersonas(clientes) {
    var nombre = readlineSync.question('Ingrese su nombre: ')
    var apellido = readlineSync.question('Ingrese su apellido: ')
    var documento = readlineSync.question('Ingrese su DNI: ')

    var jsonpersona = {
        nombre: nombre,
        apellido: apellido,
        documento: parseInt(documento),
        ID: idGen(clientes)
    }

    if (validardni(documento, clientes)) {
        clientes.push(jsonpersona)
    } else {
        readlineSync.question('Cliente ya registrado.... ')
    }
    console.clear();
}

function validardni(dni, clientes) {
    for (i = 0; i < clientes.length; i++) {
        if (parseInt(dni) === clientes[i].documento) {
            return false
        }
    }
    return true
}



function busquedaPorNombre(nombClient, clientes) {
    var arraybusqueda = []
    for (i = 0; i < clientes.length; i++) {
        if (clientes[i].nombre.includes(nombClient) || clientes[i].apellido.includes(nombClient)) {
            arraybusqueda.push(clientes[i])
        }


    }
    return arraybusqueda
}



module.exports = { agregarPersonas, busquedaPorNombre }