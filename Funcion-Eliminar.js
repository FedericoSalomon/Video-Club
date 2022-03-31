var readlineSync = require('readline-sync');

function eliminar(listado) {

    console.table(listado);
    var idDel = readlineSync.question('Ingrese el id que desea eliminar')
    var verifica = parseInt(idDel);
    var idInexistente = false

    if (isNaN(verifica)) {
        console.log("Opcion no valida");
        readlineSync.question('Presione ENTER para continuar');
    } else {
        for (i = 0; i < listado.length; i++) {
            if (listado[i].ID === verifica) {
                idInexistente = true
                console.log("desea eliminar a : " + listado[i].ID + "?");
                var end = readlineSync.question("S / N : ");
                if (end === "S") {
                    listado.splice(i, 1);
                } else if (end !== "S" & end !== "N") {
                    console.log("Respuesta invalida!!");
                }
            }
        }
        if (idInexistente === false) {
            console.log("ID Inexistente!");
        }
    }
}
module.exports = { eliminar }