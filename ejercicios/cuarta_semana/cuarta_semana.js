function direccionDeOrden(dir) {
  if (dir == "mayor") {
    return 0;
  } else if (dir == "menor") {
    return 1;
  } else {
    document.write('Por favor, introduce "mayor" o "menor"');
  }
}

let arrayDesordenado = [6];
for (let i = 0; i < 6; i++) {
  let num = Math.floor(Math.random() * 7) + 1;
  arrayDesordenado[i] = num;
}

function ordenar(mayor) {
  arrayDesordenado.sort(function (a, b) {
    return b - a;
  });
  if (mayor == 1) {
    devolucion.innerHTML = arrayDesordenado;
  } else {
    devolucion.innerHTML = arrayDesordenado.reverse();
  }
}

let orla = [];
leerXML();

function leerXML() {
  // lee desde GitHub.
  var xhr = new XMLHttpRequest();
  xhr.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      miFuncion(this);
    }
  };
  xhr.open(
    "GET",
    "https://adrianruiz26.github.io/CMV-publico/datos.xml",
    true
  );
  xhr.send();
}

function miFuncion(xml) {
  var i;
  var xmlNombre;
  var xmlFoto;
  var xmlDetalle;
  var elemento = [];
  var tabla = "";
  var cont = 0;
  var xmlDoc = xml.responseXML;
  var x = xmlDoc.getElementsByTagName("elemento");
  // obtenemos algo como     x =[{USR1},{USR2},...,{CANDIDO}]

  //tabla es una variable String que contiene codigo HTML para poder mostrar en pantalla el XML con formato tabla
  

  
  for (i = 0; i < x.length; i++) {
    // leo las etiquetas que me interesan del objeto
    xmlNombre = x[i].getElementsByTagName("nombre")[0].childNodes[0].nodeValue;
    xmlFoto = x[i].getElementsByTagName("foto")[0].childNodes[0].nodeValue;
    xmlDetalle = x[i].getElementsByTagName("detalle")[0].childNodes[0].nodeValue;
    // actualizo la tabla de visualización

      tabla += "<div class='contenedorImagenes'> <div class='contenedorImagenes2'><div class='flip-box-front'> <img class='imagenes' src='"+xmlFoto +"'><div class='subtitulo'>" + xmlNombre +"</div></div><div class='flip-box-back'><span>" + xmlDetalle + "</span></div></div></div></div>";
      elemento = [xmlNombre, xmlFoto];
      orla.push(elemento);
      cont++;
    
    

    
    
    // actualizo el array bidimensional con los usuarios registrados
    
  }

  document.getElementById("mensaje").innerHTML = tabla;
  
  

  // muestro en consola el array de usuarios orla
  orla.forEach((elemento) => {
    elemento.forEach((datos) => {
      console.log(datos);
    });
  });
}

function ordenarFotos() {
  //Ordenamos  la matriz
  orla.sort((elemento1, elemento2) =>
    elemento2[1].localeCompare(elemento1[1])
  );
  let tabla = "";
  orla.forEach((elemento) => {
    elemento.forEach((datos) => {
      tabla = "<table><tr><th>Nombre</th><th>Foto</th></tr>";
      for (let i = 0; i < orla.length; i++) {
        // leo las etiquetas que me interesan del objeto
        let xmlNombre = orla[i][0];
        let xmlFoto = orla[i][1];
        // actualizo la tabla de visualización
        tabla += "<tr><td>" + xmlNombre + "</td><td><img src='" + xmlFoto + "'></img></td></tr>";
        // actualizo el array bidimensional con los usuarios registrados
      }
      tabla += "</table>";
    });
  });
  document.getElementById("mensaje").innerHTML = tabla;
}

