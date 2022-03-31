function idGen(listado) {
    var mayorId = 0
    for (i = 0; i < listado.length; i++) {

        if (listado[i].ID > mayorId) {

            mayorId = listado[i].ID;

        }

    }

    return mayorId + 1

}

function buscarPorId(id, listado) {
    for (i = 0; i < listado.length; i++) {
        if (id = listado[i].ID)
            return listado[i]
    }
    return null
}
module.exports = { idGen, buscarPorId };