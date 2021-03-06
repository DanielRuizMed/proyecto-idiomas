const data = require("./data/data.json")
const Idioma = require("../src/idioma.js")

module.exports = (req, res) => {
  const { orden = 'ASCENDENTE' } = req.query

  var idioma = new Idioma("español","francés");
  var palabra;
  var significado;
  var cadena="";
  var obj = {};
  var datos=[];

  for(var i = 0; i < data.traducciones.length; i++){
    palabra = data.traducciones[i].palabra;
    significado = data.traducciones[i].significado;
    idioma.aniadirVocab(palabra,significado);
  }

  if(orden == "ASCENDENTE" || orden == "DESCENDENTE"){
    var traduc = idioma.ordenarAlfabeto(orden);
    var clave = "traducciones";
    obj[clave] = []
    traduc.forEach(elemento => {
      // cadena += elemento.getTraduccion();
      datos = {
        palabra: elemento.getPalabra(),
        significado: elemento.getSignificado()
      };

      obj[clave].push(datos);
    });
  }else{
    clave = "ERROR";
    obj[clave] = []
    datos = {
      error: "Debe introducir como parámetro correspondiente al orden un orden válido, es decir ASCENDENTE o DESCENDENTE"
    };
    obj[clave].push(datos);
  }


  res.status(200).send(obj);
}
