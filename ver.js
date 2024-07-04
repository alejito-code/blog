function editarNoticia(id) {
  const noticias = JSON.parse(localStorage.getItem("noticias")) || [];
  const noticiaAEditar = noticias[id];

  if (noticiaAEditar) {
    //cambiamos el id y el texto del botón del formulario a editar
    formularioNoticia.querySelector("button").id = "editar";
    formularioNoticia.querySelector("button").innerText = "Editar Noticia";

    //mostramos el formulario que editará el contenido
    formulario.classList.add("active");

    //guardamos el id (importante para que al editar edite ese mismo id)
    formularioNoticia.dataset.id = id;

    //llamamos los valores existentes en el local storage en el formulario
    formularioNoticia.nombreNoticia.value = noticiaAEditar.nombre;
    formularioNoticia.contenidoNoticia.value = noticiaAEditar.contenido;

    //evento al boton editar
    formularioNoticia.addEventListener("submit", function (event) {
      event.preventDefault();

      //obtenemos el id que guardamos anteriormente
      const idOriginal = formularioNoticia.dataset.id;

      //obtenemos los nuevos datos
      const nombreNoticia = formularioNoticia.nombreNoticia.value;
      const contenidoNoticia = formularioNoticia.contenidoNoticia.value;

      //verificamos que no estén vacíos los campos
      if (nombreNoticia.trim() !== "" && contenidoNoticia.trim() !== "") {
        // Actualiza la noticia en el array de noticias
        noticias[idOriginal].nombre = nombreNoticia;
        noticias[idOriginal].contenido = contenidoNoticia;

        //guardamos la noticia actualizada en el local storage
        localStorage.setItem("noticias", JSON.stringify(noticias));

        //actualizamos el elemento HTML correspondiente a la noticia editada
        const noticiaElement = document.querySelector(`.not_${idOriginal + 1}`);
        if (noticiaElement) {
          noticiaElement.innerHTML = `
            <h2>${nombreNoticia}</h2>
            <p>${contenidoNoticia}</p>
          `;
        }

        //ocultamos el formulario
        formulario.classList.remove("active");

        //limpiamos los campos del formulario después de actualizar la noticia
        formularioNoticia.reset();

        //mostramos éxito
        alert("Noticia actualizada exitosamente.");
      }
    });
  }
}

//evento click en el botón editar
document.getElementById("editar-btn").addEventListener("click", function () {
  const noticias = JSON.parse(localStorage.getItem("noticias")) || [];

  if (noticias.length > 0) {
    //obtenemos el id
    const id = noticias.length - 1;

    editarNoticia(id);
  } else {
    alert("No hay noticias en el almacenamiento local.");
  }
});

//evento click para editar
formularioNoticia.addEventListener("submit", function (event) {
  event.preventDefault();

  //obtenemos el id y lo guardamos (importante para editar la noticias correcta)
  const idOriginal = formularioNoticia.dataset.id;

  //obtenemos los valores antiguos
  const nombreNoticia = formularioNoticia.nombreNoticia.value;
  const contenidoNoticia = formularioNoticia.contenidoNoticia.value;

  //verificamos que los campos no estén vacíos
  if (nombreNoticia.trim() !== "" && contenidoNoticia.trim() !== "") {
    //llamamos la ultima noticia almacenada
    const noticias = JSON.parse(localStorage.getItem("noticias")) || [];

    noticias[idOriginal].nombre = nombreNoticia;
    noticias[idOriginal].contenido = contenidoNoticia;

    //volvemos a guardar las nuevas noticias actualizadas
    localStorage.setItem("noticias", JSON.stringify(noticias));

    //actualizamos el html correspondiente al id del local storage
    const noticiaElement = document.querySelector(`.not_${idOriginal + 1}`);
    if (noticiaElement) {
      noticiaElement.innerHTML = `
        <h2>${nombreNoticia}</h2>
        <p>${contenidoNoticia}</p>
      `;
    }

    //volvemos a ocultar el formulario
    formulario.classList.remove("active");

    //lo limpiamos despues de editar la noticia
    formularioNoticia.reset();

    // Mostrar mensaje de éxito
    alert("Noticia actualizada exitosamente.");

    //recargamos la pagina automaticamente
    setTimeout(function () {
      location.reload();
    }, 800); //tiempo de recarga de la pagina
  }
});

function eliminarNoticia() {
  const noticias = JSON.parse(localStorage.getItem("noticias")) || [];

  if (noticias.length > 0) {
    // Usamos .pop para borrar la última noticia agregada
    noticias.pop();

    // Mostramos mensaje de éxito
    alert("Noticia eliminada exitosamente.");

    // Recargar la página después de un breve tiempo
    setTimeout(function () {
      location.reload();
    }, 1000); // 1000 milisegundos = 1 segundo
  } else {
    alert("No hay noticias para eliminar en el almacenamiento local.");
  }

  // Volvemos a guardar las noticias
  localStorage.setItem("noticias", JSON.stringify(noticias));

  // Actualizamos la interfaz
  mostrarNoticias();
}

// Evento click en el botón eliminar
document
  .getElementById("eliminar-btn")
  .addEventListener("click", eliminarNoticia);
