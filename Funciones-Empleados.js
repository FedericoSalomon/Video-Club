var readlineSync = require('readline-sync');
const { idGen } = require('./FuncionesID');
const bcrypt = require('bcrypt')

function agregarEmpleados(empleados) {
    var nombreE = readlineSync.question(' nombre: ')
    var apellidoE = readlineSync.question('Apellido: ')
    var dnie = readlineSync.question('Nro de DNI: ')
    var pass = readlineSync.question('Ingrese contraseña: ')
    var confirm = readlineSync.question('Confirmar contraseña: ')

    if (confirm === pass) {
        const hash = bcrypt.hashSync(pass, 10)
        var jsonpempleados = {
            nombre: nombreE,
            apellido: apellidoE,
            dni: parseInt(dnie),
            ID: idGen(empleados),
            password: hash
        }
        console.log("Usuario Creado con exito");

        empleados.push(jsonpempleados)
    } else {

        console.log("No coinciden las Contraseña");
    }
}
module.exports = { agregarEmpleados };