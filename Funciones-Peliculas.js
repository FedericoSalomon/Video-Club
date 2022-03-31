var readlineSync = require('readline-sync');
const { idGen } = require('./FuncionesID');

function agregarPeliculas(peliculas) {
    var titulo = readlineSync.question('Ingrese el nombre del titulo: ')
    var genero = readlineSync.question('Ingrese el genero: ')
    var copias = readlineSync.question('Nro de copias: ')

    var jsonpelicula = {
        titulo: titulo,
        genero: genero,
        cantCopias: parseInt(copias),
        ID: idGen(peliculas)
    }
    peliculas.push(jsonpelicula)
}


function busquedaPorTitulo(titPel, peliculas) {
    var arraybusqueda = []
    for (i = 0; i < peliculas.length; i++) {
        if (peliculas[i].titulo.includes(titPel)) {
            arraybusqueda.push(peliculas[i])
        }


    }
    return arraybusqueda
}

function mostrarPeliculas(peliculas, alquileres) {
    var stockLive = [];
    for (i = 0; i < peliculas.length; i++) {
        var stockDisponible;
        var cantCopias = peliculas[i].cantCopias
        var cantAlquiladas = 0;
        for (j = 0; j < alquileres.length; j++) {
            if (alquileres[j].idPelicula == peliculas[i].ID && alquileres[j].fechaFin == null) {
                cantAlquiladas++
            }

        }
        stockDisponible = cantCopias - cantAlquiladas;
        var objetoAMostrar = {
            Titulo: peliculas[i].titulo,
            Genero: peliculas[i].genero,
            "Stock disponible": stockDisponible,
            ID: peliculas[i].ID
        }
        stockLive.push(objetoAMostrar);

    }
    return stockLive

}
module.exports = { agregarPeliculas, busquedaPorTitulo, mostrarPeliculas };