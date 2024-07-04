document.addEventListener("DOMContentLoaded", function () {
  const añadirNoticia = document.getElementById("enviar");
  const formulario = document.getElementById("formulario");
  const cerrarBtn = document.getElementById("cerrar");

  //mostrar el contendor con el formulario
  añadirNoticia.addEventListener("click", function () {
    formulario.classList.toggle("active");

    //si el id es editar lo cambia de nuevo por agregar
    const botonFormulario = formulario.querySelector("button");
    if (botonFormulario.id === "editar") {
      botonFormulario.id = "agregar";
    }
  });

  //para cerrar el formulario con la x
  cerrarBtn.addEventListener("click", function () {
    formulario.classList.remove("active");
  });

  ///función para agregar la noticia al HTML
  function agregarNoticiaHTML(noticia, id) {
    const section = document.querySelector(
      id ? `.not_${id}` : ".noticias .noticia"
    );
    if (section) {
      if (id) {
        //actualizar artículo existente
        section.innerHTML = `
          <h2>${noticia.nombre}</h2>
          <p>${noticia.contenido}</p>
        `;
      } else {
        //agregar nuevo artículo
        const newSection = section.cloneNode(true);
        newSection.classList.remove("noticia-template");
        newSection.querySelector(".nombre").textContent = noticia.nombre;
        newSection.querySelector(".contenido").textContent = noticia.contenido;
        newSection.dataset.id = noticias.length;
        section.parentNode.insertBefore(newSection, section.nextSibling);
      }
    } else {
      console.error(`El artículo con ID ${id} no se encontró en el DOM.`);
    }
  }

  //formulario para agregar las noticias
  const formularioNoticia = document.getElementById("formularioNoticia");

  formularioNoticia.addEventListener("submit", function (event) {
    event.preventDefault(); //evita que se envíe el formulario por defecto

    const nombreNoticia = document.getElementById("nombreNoticia").value;
    const contenidoNoticia = document.getElementById("contenidoNoticia").value;

    //verificamos que los campos no estén vacíos
    if (nombreNoticia.trim() !== "" && contenidoNoticia.trim() !== "") {
      //creamos objeto con los datos de la noticia
      const noticia = {
        nombre: nombreNoticia,
        contenido: contenidoNoticia,
      };

      //obetenmos el array de noticias del localStorage
      let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

      //agregamos la nueva noticia al array
      noticias.push(noticia);

      //guardamos el array nuevo de noticias en el local storage
      localStorage.setItem("noticias", JSON.stringify(noticias));

      // Limpiar los campos del formulario
      formularioNoticia.reset();

      //agregamos la clase active para que aprezca
      formulario.classList.add("active");

      // Agregar la noticia al HTML
      agregarNoticiaHTML(noticia, noticias.length);

      //alerta si la noticias es agregada con exito
      alert("Noticia agregada");
      formulario.classList.remove("active"); // Cerrar el formulario
    }
  });

  //obtenemos las ntocias del local storage
  let noticias = JSON.parse(localStorage.getItem("noticias")) || [];

  //agregamos las noticias al html
  noticias.forEach((noticia, index) => {
    agregarNoticiaHTML(noticia, index + 1);
  });
});

//funcion para mostrar mas de las noticias en el cuadro grande
document.addEventListener("DOMContentLoaded", function () {
  const cuadroGrande = document.getElementById("cuadroGrande");
  const cerrarCuadroBtn = document.getElementById("cerrarCuadro");
  const saberMasBtns = document.querySelectorAll(".saber_mas");

  //creamos un array con las noticias
  const noticias = [
    {
      titulo:
        "El pueblo latinoamericano más lindo del mundo está en el Oriente Antioqueño.",
      contenido:
        "La clasificación publicada por el portal turístico ‘Time Out’ destacó al colorido pueblo paisa como uno de los más vistosos, siendo el único territorio latinoamericano en un listado en el que predominaron los pueblos europeos. Llamaron especial atención las fachadas de sus viviendas Y es que los pueblos mágicos en Colombia se unen bajo un mismo estándar de calificación a varios de los destacados caseríos y pequeñas poblaciones de Suiza, Australia, Japón, Italia, y algunos países de Asia y el Caribe, destacados por su belleza. Ese es el caso de Guatapé, en el Oriente Antioqueño que en la actual publicación de Time Out sobre los “pueblos más bellos del mundo”, el pintoresco pueblo resultó distinguido como el número once de los 16 pueblos de mayor belleza. Se destacó como el único representante de América Latina en figurar entre una selección de pueblos atractivos de casi todos los continentes, pero especialmente en Europa.",
      imagen: "img/not_1.jpeg",
      audio: "",
    },
    {
      titulo:
        "Marinilla ahora es uno de los municipios de mayor competitividad turística del país.",

      contenido:
        "Marinilla ahora es una potencia del turismo nacional! Así se concluye luego de que este municipio del Oriente Antioqueño apareciera en el top 20 del ranking nacional de competitividad turística del Centro de Pensamiento Turístico de Colombia, conformado por la Asociación Hotelera y Turística de Colombia (Cotelco) y la Fundación Universitaria Cafam (Unicafam). Por primera vez, Marinilla figura en este prestigioso ranking que evalúa a 330 municipios con vocación turística en en todo el país, evidenciando así su creciente relevancia en el panorama turístico nacional. Con este logro, Marinilla reafirma su al turismo como un sector clave en su desarrollo, destacando su encanto natural, cultural y gastronómico que lo convierten en un verdadero municipio con gran atractivo para conocer y visitar. ",
      imagen: "",
      audio: "",
    },
    {
      titulo:
        "Los planes imperdibles para disfrutar la Semana Santa en Antioquia.",
      contenido:
        "Para los que vienen en un plan religioso y desean conocer las costumbres culturales de la región, se recomienda visitar San Pedro de los Milagros, Marinilla, Girardota, Carolina del Príncipe, Santa Fe de Antioquia, Concepción, Jericó y Jardín. O por el contrario si lo que desea es degustar de la comida local, no puede perderse la ruta gastronómica de ‘Los Siete Golpes del Paisa’, que comprende un recorrido por 80 restaurantes de cinco municipios del Oriente antioqueño: El Retiro, La Ceja, Carmen de Viboral, Marinilla y Rionegro. Estos ‘siete golpes’ son: Los tragos, el desayuno, la media mañana, el almuerzo, el algo, la comida y la merienda. Estos reúnen tres grupos de alimentos que son infaltables en la cocina antioqueña: el maíz, los lácteos y el cerdo.",
      imagen: "img/noticia_3.jpeg",
      audio: "audio/WhatsApp Audio 2024-03-16 at 7.04.09 PM.mp4",
    },
    {
      titulo:
        "Reactivación del turismo en Medellín y Antioquia se potencia en Anato.",
      contenido:
        "La ciudad-región presentará su oferta turística conjuntamente con 10 empresarios con quienes se proyectan alrededor de 200 citas con potenciales compradores nacionales e internacionales. El objetivo es la comercialización de productos y servicios turísticos y fomentar la generación de negocios que le aporten a la reactivación económica. Complementando la oferta turística que presentará la ciudad-región y los empresarios en la Vitrina de Anato, estará presente el silletero, Ganador Absoluto en la categoría Artística, Francisco Orlando Quintero Londoño. Se llevarán también otras activaciones artísticas y culturales representativas de Medellín como una pareja de tango y trovadores.",
      imagen: "",
      audio: "",
    },
  ];

  //mostramos la noticia seleccionada
  function mostrarNoticia(id) {
    const noticia = noticias[id - 1]; //como los indices comienzan de cero se resta unos
    const contenidoCuadro = cuadroGrande.querySelector(".contenido-cuadro");

    // Crear elementos para la noticia
    const titulo = document.createElement("h2");
    titulo.textContent = noticia.titulo;

    const contenido = document.createElement("p");
    contenido.textContent = noticia.contenido;

    const imagen = document.createElement("img");
    imagen.src = noticia.imagen;
    imagen.alt = noticia.titulo;

    const audio = document.createElement("audio");
    if (noticia.audio) {
      audio.src = noticia.audio;
      audio.controls = true;
    }

    //limpiar contenido anterior
    contenidoCuadro.innerHTML = "";

    //agregamos los elementos al contenido del cuadro grande
    contenidoCuadro.appendChild(titulo);
    contenidoCuadro.appendChild(contenido);
    if (noticia.imagen) {
      //si tiene el array trae imagen crea el espacio para la imagen si no no
      contenidoCuadro.appendChild(imagen);
    }
    if (noticia.audio) {
      //lo mismo que el de la imagen
      contenidoCuadro.appendChild(audio);
    }

    //mstrar el cuadro grande con la noticia seleccionada
    cuadroGrande.classList.add("saber");
  }

  //cerrar el cuadro con los saber mas
  function cerrarCuadro() {
    cuadroGrande.classList.remove("saber");
  }

  //agregamos eventos a los botones "Saber más"
  saberMasBtns.forEach((btn) => {
    btn.addEventListener("click", function () {
      const id = btn.id.split("_")[1]; //obtenemos el número de noticia del ID
      mostrarNoticia(id);
    });
  });

  //evento al botón "Cerrar"
  cerrarCuadroBtn.addEventListener("click", cerrarCuadro);
});
