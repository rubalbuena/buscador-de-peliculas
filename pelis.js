const fs = require("fs");
function getPeliculas() {
    const jsonPeliculas = fs.readFileSync(__dirname +"/pelis.json");
    const parsePeliculas = JSON.parse(jsonPeliculas);
    return parsePeliculas;
}
exports.getSort = function(argumentoDeConsola) {
    if (argumentoDeConsola.length === 0){
        console.table(getPeliculas()) 
        return ;
    }
    const pelisPorTitulo = getPeliculas().sort((a, b) => a.title.localeCompare(b.title));
    const pelisPorTag = getPeliculas().sort((a, b) => a.tags - b.tags);
    const peliPorRating = getPeliculas().sort((a, b) => a.rating - b.rating);
    const resultado = argumentoDeConsola[1].toLowerCase();
    if (argumentoDeConsola[0].toLowerCase().startsWith("--sort")){
        if (resultado === "title"){
        console.table(pelisPorTitulo);
    }else if (resultado === "rating"){
        console.table(peliPorRating);
    }else if(resultado === "tag"){
        console.table(pelisPorTag);
    }
    }
    const pelisTag = getPeliculas().filter(pelicula =>{
        return pelicula.tags.includes(argumentoDeConsola[1].toLowerCase());
    });
    if (argumentoDeConsola[0].toLowerCase().startsWith("--tag")){
        console.table(pelisTag);
    } 
    const argumento = argumentoDeConsola[1].toLowerCase();
    const peliDeTitulo = getPeliculas().filter(pelicula =>{
        return pelicula.title.includes(argumento);
    });
    if (argumentoDeConsola[0].toLowerCase().startsWith("--search")){
        console.table(peliDeTitulo)
        
    } 
}   

