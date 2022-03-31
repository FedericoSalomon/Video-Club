const FuncionesCliente = require('./Funciones-Clientes')
const FuncionesPeliculas = require('./Funciones-Peliculas')
const FuncionesId = require('./FuncionesID')
var readlineSync = require('readline-sync');
const { idGen } = require('./FuncionesID');
const VALOR_ALQUILER = 30.33;
const VALOR_RECARGO = VALOR_ALQUILER * 0.1;
const DIAS_ALQUILER = 3;
var CajaRegistradora = 0


function alquilerPel(empleados, clientes, peliculas, alquileres, logeado) {
    console.clear();
    console.log("-----ALQUILERES------");
    console.log("-1- ALQUILAR ");
    console.log("--------------------");
    console.log("-2- DEVOLVER ");
    var seleccion = parseInt(readlineSync.question('Indique que desea hacer: '))

    if (seleccion === 1) {
        menuAlquileres(empleados, clientes, peliculas, alquileres, logeado);
    } else if (seleccion === 2) {
        devoluciones(empleados, clientes, peliculas, alquileres, logeado);
    }




}

function menuAlquileres(empleados, clientes, peliculas, alquileres, logeado) {

    console.clear()
    console.log("-----ingresar cliente por ------");
    console.log("-1- ID ");
    console.log("--------------------");
    console.log("-2- Nombre ");
    var seleccion = parseInt(readlineSync.question('.......... '))
    var clienteEncontrado = null
    var peliculaEncontrada = null
    var nomclient = null
    var resultadoClientes = []
    var resultadoPeliculas = []

    if (seleccion === 1) {

        while (clienteEncontrado === null) {
            var idCliente = parseInt(readlineSync.question('Indique ID del cliente: '))
            clienteEncontrado = FuncionesId.buscarPorId(idCliente, clientes);
        }

        console.log("Usuario Encontrado: " + clienteEncontrado.nombre);
    } else if (seleccion === 2) {

        while (resultadoClientes.length === 0) {
            nomclient = readlineSync.question('Indique Nombre del cliente: ')
            resultadoClientes = FuncionesCliente.busquedaPorNombre(nomclient, clientes)
        }
        var indexclient = -1

        while (indexclient > resultadoClientes.length || indexclient < 0) {
            console.table(resultadoClientes)
            indexclient = parseInt(readlineSync.question('Indique el indice del cliente: '))
            clienteEncontrado = resultadoClientes[indexclient]

        }
    }
    console.clear()
    console.log("-----ingresar Pelicula por ------");
    console.log("-1- ID ");
    console.log("--------------------");
    console.log("-2- Titulo ");
    seleccion = parseInt(readlineSync.question('.......... '))
    if (seleccion === 1) {

        while (peliculaEncontrada === null) {
            var idPelicula = parseInt(readlineSync.question('Indique ID de la pelicula: '))
            peliculaEncontrada = FuncionesId.buscarPorId(idPelicula, peliculas)
        }
        console.log("Pelicula Encontrada: " + peliculaEncontrada.titulo);
    } else if (seleccion === 2) {
        console.table(peliculas);
        while (resultadoPeliculas.length === 0) {
            var nomPeli = readlineSync.question('Indique Nombre del titulo: ')
            resultadoPeliculas = FuncionesPeliculas.busquedaPorTitulo(nomPeli, peliculas)
        }
        var indexpeli = null;
        do {
            console.table(resultadoPeliculas)
            indexpeli = parseInt(readlineSync.question('Indique el indice de la pelicula: '))
            peliculaEncontrada = resultadoPeliculas[indexpeli]
        }
        while (indexpeli < resultadoPeliculas.length && indexpeli < 0)

    }
    var alquiler = {
        ID: idGen(alquileres),
        idCliente: clienteEncontrado.ID,
        idPelicula: peliculaEncontrada.ID,
        idEmpleado: logeado.ID,
        fechaInicio: Date.now(),
        fechaFin: null,


    }

    if (validarstock(idPelicula, alquileres, peliculas)) {
        alquileres.push(alquiler)
        readlineSync.question('Alquiler exitoso!, ENTER para continuar. ')
    } else {
        console.log('La pelicula no esta disponible: ');
        readlineSync.question('Presione ENTER para continuar: ')
    }
}

function mostrarAlquileres(alquileres, peliculas, clientes, empleados) {
    var controlAlquileres = []
    var tablaAlquileres = []
    for (i = 0; i < alquileres.length; i++) {
        var infoPelicula = FuncionesId.buscarPorId(alquileres[i].idPelicula, peliculas)
        var infocliente = FuncionesId.buscarPorId(alquileres[i].idCliente, clientes)
        var infoEmpleado = FuncionesId.buscarPorId(alquileres[i].idEmpleado, empleados)
        var objetoCompleto = {
            ID: alquileres[i].ID,
            idCliente: alquileres[i].idCliente,
            idPelicula: alquileres[i].idPelicula,
            idEmpleado: alquileres[i].idEmpleado,
            fechaInicio: alquileres[i].fechaInicio,
            fechaFin: alquileres[i].fechaFin,
            Cliente: infocliente,
            Pelicula: infoPelicula,
            Empleado: infoEmpleado

        }
        controlAlquileres.push(objetoCompleto);
    }
    for (i = 0; i < controlAlquileres.length; i++) {

        var tablaCompleta = {
            ID: controlAlquileres[i].ID,
            "Nro cliente": controlAlquileres[i].idCliente,
            "Nombre Cliente": controlAlquileres[i].Cliente.nombre,
            "Nombre Pelicula": controlAlquileres[i].Pelicula.titulo,
        }
        tablaAlquileres.push(tablaCompleta)
    }
    console.table(tablaAlquileres)


    readlineSync.question('Presioone ENTER para continuar ')


}

function devoluciones(empleados, clientes, peliculas, alquileres, logeado) {
    console.clear()
    console.log("-----ingresar cliente por ------");
    console.log("-1- ID ");
    console.log("--------------------");
    console.log("-2- Nombre ");
    var seleccion = parseInt(readlineSync.question('.......... '))
    var clienteEncontrado = null
    var alquileresXcliente = []
    var nomclient = null
    var resultadoClientes = []



    if (seleccion === 1) {

        while (clienteEncontrado === null) {
            var idCliente = parseInt(readlineSync.question('Indique ID del cliente: '))
            clienteEncontrado = FuncionesId.buscarPorId(idCliente, clientes);
        }

        console.log("Usuario Encontrado: " + clienteEncontrado.nombre);
    } else if (seleccion === 2) {

        while (resultadoClientes.length === 0) {
            nomclient = readlineSync.question('Indique Nombre del cliente: ')
            resultadoClientes = FuncionesCliente.busquedaPorNombre(nomclient, clientes)
        }
        var indexclient = -1

        while (indexclient > resultadoClientes.length || indexclient < 0) {
            console.table(resultadoClientes)
            indexclient = parseInt(readlineSync.question('Indique el indice del cliente: '))
            clienteEncontrado = resultadoClientes[indexclient]

        }
    }
    for (var i = 0; i < alquileres.length; i++) {
        if (clienteEncontrado.ID == alquileres[i].idCliente) {
            var objetoAmostrar = {
                ID: alquileres[i].ID,
                cliente: clienteEncontrado.nombre,
                Pelicula: FuncionesId.buscarPorId(alquileres[i].idPelicula, peliculas).titulo,
                FechaInicio: alquileres[i].fechaInicio

            }
            alquileresXcliente.push(objetoAmostrar);

        }
    }
    console.table(alquileresXcliente);
    readlineSync.question('Presiones una tecla para continuar');
    var confirm = readlineSync.question('Indique el ID que desea devolver');
    for (i = 0; i < alquileresXcliente.length; i++) {
        if (alquileresXcliente[i].ID == confirm) {
            var diasDeAlquilerMs = (new Date().getTime() - alquileresXcliente[i].FechaInicio);
            var diasDeAlquilers = diasDeAlquilerMs / 1000;
            var diasDeAlquilerMin = diasDeAlquilers / 60;
            var diasDeAlquilerHor = diasDeAlquilerMin / 60;
            var diasDeAlquilerDia = diasDeAlquilerHor / 24;
            var saldo = 0;
            if (diasDeAlquilerDia < DIAS_ALQUILER) {
                saldo = VALOR_ALQUILER
                console.log("Ticket Cliente  ");
                console.log("Alquiler Base:  $" + VALOR_ALQUILER.toFixed(2));
                console.log("El cliente debe abonar:  $" + VALOR_ALQUILER.toFixed(2));

            } else if (diasDeAlquilerDia > DIAS_ALQUILER) {
                var diasRecargo = (diasDeAlquilerDia - DIAS_ALQUILER);
                saldo = (diasRecargo * VALOR_RECARGO) + VALOR_ALQUILER;
                console.log("Ticket Cliente  ");
                console.log("Alquiler Base:  $" + VALOR_ALQUILER.toFixed(2))
                console.log("Dias de recargo:  " + Math.trunc(diasRecargo));
                console.log("Valor dia recargo:  " + VALOR_RECARGO.toFixed(2))
                console.log("El cliente debe abonar:  $" + saldo.toFixed(2));
                readlineSync.question('Presiones una tecla para continuar');
            }
            cierreVta = readlineSync.question("CONFIRMAR DEVOLUCION  S/N");
            if (cierreVta == "S") {

                for (var j = 0; j < alquileres.length; j++) {

                    if (alquileresXcliente[i].ID == alquileres[j].ID) {
                        alquileres[j].fechaFin = new Date().getTime();
                        CajaRegistradora = CajaRegistradora + saldo
                    }

                }
            }

        }

    }




}

function validarstock(idPelicula, alquileres, peliculas) {
    var stockLive = FuncionesPeliculas.mostrarPeliculas(peliculas, alquileres)
    for (i = 0; i < stockLive.length; i++) {
        if (stockLive[i].ID == idPelicula && stockLive[i]["Stock disponible"] > 0)
            return true
    }
    return false
}
//*resultadoClientes[indexclient].ID comparar con tablaalquileres[i].id




module.exports = { alquilerPel, mostrarAlquileres, devoluciones }