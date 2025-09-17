document.addEventListener("DOMContentLoaded", function () {
  showSection(localStorage.getItem("ultimaSeccion") || "dashboard");
  validarSesion();
  actualizarFecha();
  contarRecursos();
  contarAlertasDeStockMinimo();
  contarPrestamosPendientes();
  agregarAlertaStockMinimo();
  listarRecursos();
  cargarRecursos();
});

document.addEventListener("click", function (event) {
  if (event.target.matches("#cerrarSesion")) {
    cerrarSesion();
  }
});

function validarSesion() {
  const user = localStorage.getItem("usuarioLogueado");
  if (!user) {
    window.location.href = "/html/Login.html";
  }
  const usuario = JSON.parse(user);
  document.getElementById("rolUS").textContent = usuario.rol;
  document.getElementById("nombreUS").textContent = usuario.nombreUsuario;
}

function showSection(sectionId) {
  // Ocultar todas las secciones antes de mostrar la seleccionada

  document
    .querySelectorAll(".section-content")
    .forEach((sec) => sec.classList.add("hidden"));

  // Mostrar la sección seleccionada
  if (!document.getElementById(sectionId)) {
    console.error("Sección no encontrada:", sectionId);
    return;
  }
  document.getElementById(sectionId).classList.remove("hidden");
  localStorage.setItem("ultimaSeccion", sectionId);
}

function cerrarSesion() {
  // Eliminar el usuario logueado del localStorage y redirigir al login
  const user = localStorage.getItem("usuarioLogueado");
  if (!user) {
    window.location.href = "/html/Login.html";
    return;
  }
  localStorage.removeItem("usuarioLogueado");
  window.location.href = "/html/Login.html";
}

function actualizarFecha() {
  const hoy = new Date().toLocaleDateString();

  const fecha1 = document.getElementById("fecha-actual");
  if (fecha1) fecha1.textContent = hoy;

  const fecha2 = document.getElementById("fecha-actual-stock");
  if (fecha2) fecha2.textContent = hoy;

  const fecha3 = document.getElementById("fecha-actual-reportes");
  if (fecha3) fecha3.textContent = hoy;
}

function contarRecursos() {
  fetch("http://localhost:8080/api/recursos/contar/todosLosRecursos")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("totalRecursos").textContent = data;
    })
    .catch((error) => console.error("Error al contar recursos:", error));
}

function contarAlertasDeStockMinimo() {
  fetch("http://localhost:8080/api/recursos/contar/alertaStock")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("alertasStock").textContent = data;
    })
    .catch((error) =>
      console.error("Error al contar alertas de stock mínimo:", error)
    );
}

function contarPrestamosPendientes() {
  fetch("http://localhost:8080/api/solicitudes/pendientes")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("prestamosPendientes").textContent = data;
    })
    .catch((error) =>
      console.error("Error al contar préstamos pendientes:", error)
    );
}

function agregarAlertaStockMinimo() {
  fetch("http://localhost:8080/api/recursos/listarStockMinimo")
    .then((response) => response.json())
    .then((data) => {
      const listaAlertas = document.getElementById("contenedor-alertas");
      listaAlertas.innerHTML = "";
      let cant = 0;

      data.forEach((recurso) => {
        if (cant < 2) {
          const div = document.createElement("div");
          div.className =
            "flex items-start p-3 border border-yellow-200 rounded-lg bg-yellow-50";

          const icon = document.createElement("i");
          icon.className =
            "fas fa-exclamation-circle text-yellow-500 mt-1 mr-3";
          const div2 = document.createElement("div");

          const nombre = document.createElement("p");
          nombre.className = "font-medium text-yellow-800";
          nombre.textContent = recurso.nombre;

          const stock = document.createElement("p");
          stock.className = "text-sm text-yellow-700";
          stock.textContent = ` Stock actual: ${recurso.cantidad} - Mínimo: ${recurso.minimo}`;

          div2.appendChild(nombre);
          div2.appendChild(stock);

          div.appendChild(icon);
          div.appendChild(div2);

          listaAlertas.appendChild(div);
          cant++;
        }
      });

      if (data.length === 0) {
        listaAlertas.innerHTML = "<li>No hay alertas de stock mínimo.</li>";
      }
    })
    .catch((error) => console.error("Error al crear alerta de stock:", error));
}

function listarRecursos() {
  fetch("http://localhost:8080/api/recursos/activos")
    .then((response) => response.json())
    .then((data) => {
      const tabla = document.getElementById("tabla-recursos");

      data.forEach((recurso) => {
        const columna = document.createElement("tr");

        const id = document.createElement("td");
        id.textContent = recurso.id;
        id.style = "display: none;";
        id.id = "id-recurso-" + recurso.id;

        //const codigo = document.createElement("td");
       // codigo.textContent = recurso.codigo;
        //codigo.className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

        const nombre = document.createElement("td");
        nombre.textContent = recurso.nombre;
        nombre.className = "px-6 py-4 whitespace-nowrap text-sm font-medium";

        const categoria = document.createElement("td");
        categoria.textContent = recurso.categoria;
        categoria.className =
          "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

        const stock = document.createElement("td");
        stock.textContent = recurso.cantidad;
        stock.className = "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

        const minimo = document.createElement("span");
        minimo.textContent = " (Alerta)";
        minimo.className = "text-yellow-600 font-bold ml-1";

        const ubicacion = document.createElement("td");
        ubicacion.textContent = recurso.ubicacion;
        ubicacion.className =
          "px-6 py-4 whitespace-nowrap text-sm text-gray-500";

        const acciones = document.createElement("td");
        acciones.className = "px-6 py-4 whitespace-nowrap text-sm font-medium";

        const ver = document.createElement("button");
        ver.className = "text-blue-600 hover:text-blue-900 mr-3";
        const verIcon = document.createElement("i");
        verIcon.className = "fas fa-eye";
        ver.appendChild(verIcon);

        const editar = document.createElement("button");
        editar.addEventListener("click", function () {
          showResourceForm("modificar");
          document.getElementById("modificar-rec-id").value = recurso.id;
          document.getElementById("modificar-rec-nombre").value =
            recurso.nombre;
          document.getElementById("modificar-rec-cat").value =
            recurso.categoria.toLowerCase();
          //document.getElementById("modificar-rec-cod").value = recurso.codigo;
          document.getElementById("modificar-rec-cant").value =
            recurso.cantidad;
          document.getElementById("modificar-rec-min").value = recurso.minimo;
          document.getElementById("modificar-rec-ubicacion").value =
            recurso.ubicacion;
          document.getElementById("modificar-rec-desc").value =
            recurso.descripcion;
        });
        editar.className = "text-yellow-600 hover:text-yellow-900 mr-3";
        const editarIcon = document.createElement("i");
        editarIcon.className = "fas fa-edit";
        editar.appendChild(editarIcon);

        const eliminar = document.createElement("button");
        eliminar.className = "text-red-600 hover:text-red-900";
        eliminar.addEventListener("click", function () {
          if (confirm("¿Estás seguro de dar de baja este recurso?")) {
            fetch(
              "http://localhost:8080/api/recursos/" + recurso.id + "/darDeBaja",
              {
                method: "PATCH",
              }
            )
              .then((response) => response.json())
              .then((data) => reloadPage())
              .catch((error) =>
                console.error("Error al dar de baja el recurso:", error)
              );
            reloadPage();
          }
        });
        const eliminarIcon = document.createElement("i");
        eliminarIcon.className = "fas fa-trash";
        eliminar.appendChild(eliminarIcon);

        columna.appendChild(id);
        //columna.appendChild(codigo);
        columna.appendChild(nombre);
        columna.appendChild(categoria);
        recurso.cantidad <= recurso.minimo ? stock.appendChild(minimo) : null;
        columna.appendChild(stock);
        columna.appendChild(ubicacion);

        acciones.appendChild(ver);
        acciones.appendChild(editar);
        acciones.appendChild(eliminar);

        columna.appendChild(acciones);

        tabla.appendChild(columna);
      });
    });
}

function reloadPage() {
  // Recargar la página para reflejar los cambios
  window.location.reload();
}

function crearRecurso() {
  const recurso = {
    nombre: document.getElementById("registro-rec-nombre").value,
    categoria: document.getElementById("registro-rec-cat").value.toUpperCase(),
    //codigo: document.getElementById("registro-rec-cod").value,
    cantidad: document.getElementById("registro-rec-cant").value,
    minimo: document.getElementById("registro-rec-min").value,
    ubicacion: document.getElementById("registro-rec-ubicacion").value,
    descripcion: document.getElementById("registro-rec-desc").value,
    estado: true,
  };

  fetch("http://localhost:8080/api/recursos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recurso),
  })
    .then((response) => response.json())
    .then((data) => reloadPage())
    .catch((error) => console.error("Error al crear recurso:", error));
}

function modificarRecurso() {
  const recurso = {
    nombre: document.getElementById("modificar-rec-nombre").value,
    categoria: document.getElementById("modificar-rec-cat").value.toUpperCase(),
    //codigo: document.getElementById("modificar-rec-cod").value,
    cantidad: document.getElementById("modificar-rec-cant").value,
    minimo: document.getElementById("modificar-rec-min").value,
    ubicacion: document.getElementById("modificar-rec-ubicacion").value,
    descripcion: document.getElementById("modificar-rec-desc").value,
    estado: true,
  };
  const recursoId = document.getElementById("modificar-rec-id").value;
  fetch("http://localhost:8080/api/recursos/" + recursoId, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recurso),
  })
    .then((response) => response.json())
    .then((data) => reloadPage())
    .catch((error) => console.error("Error al modificar recurso:", error));
}

function generarReporteStockMinimoPDF(recursos) {
  try {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);

    if (recursos.length === 0) {
      doc.text("No hay recursos con stock menor al mínimo.", 14, 20);
      doc.save("reporte_recursos_stock_minimo.pdf");
      return;
    }

    doc.text("Reporte de Recursos con stock menor al minimo", 14, 20);

    const columns = [
      "ID",
      "Nombre",
      "Descripción",
      //"Código",
      "Cantidad",
      "Mínimo",
      "Ubicación",
      "Estado",
      "Categoría",
    ];
    const rows = recursos.map((rec) => [
      rec.id,
      rec.nombre,
      rec.descripcion,
      //rec.codigo,
      rec.cantidad,
      rec.minimo,
      rec.ubicacion,
      rec.estado ? "Activo" : "Inactivo",
      rec.categoria,
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
      styles: { fontSize: 10 },
      headStyles: { fillColor: [41, 128, 185] },
    });

    doc.save("reporte_recursos_stock_minimo.pdf");
  } catch (error) {
    console.error("Error generando el PDF:", error);
  }
}

async function generarReporteInventarioPDF(recursos) {
  try {
    const categoriaSeleccionada =
      document.getElementById("filtro-categoria").value;

    if (categoriaSeleccionada === "") {
      alert("Por favor seleccione una categoría.");
      return;
    } 

    const recursosFiltrados = recursos.filter(
      (rec) =>
        rec.categoria.toUpperCase() === categoriaSeleccionada.toUpperCase()
    );

    if (recursosFiltrados.length === 0) {
      alert("No hay recursos registrados para esta categoría.");
      return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(16);
    doc.text(`Reporte de Inventario - Categoría: ${categoriaSeleccionada}`, 14, 20);

    const columns = [
      "ID",
      "Nombre",
      "Cantidad",
      "Mínimo",
      "Ubicación",
      "Estado",
    ];
    const rows = recursosFiltrados.map((rec) => [
      rec.id,
      rec.nombre,
      rec.cantidad,
      rec.minimo,
      rec.ubicacion,
      rec.estado ? "Activo" : "Inactivo",
    ]);

    doc.autoTable({
      head: [columns],
      body: rows,
      startY: 30,
      styles: { fontSize: 8 },
      headStyles: { fillColor: [46, 204, 113] }, // Verde
    });

    doc.save(`reporte_inventario_${categoriaSeleccionada.toLowerCase()}.pdf`);
  } catch (error) {
    console.error("Error generando el PDF:", error);
  }
}


function cargarRecursos(){
  fetch("http://localhost:8080/api/recursos/activos")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      
      const selectRecurso = document.getElementById("select-recurso");
      selectRecurso.innerHTML = ""; // Limpiar opciones previas
      const optionDefault = document.createElement("option");
      optionDefault.value = "";
      optionDefault.textContent = "-- Seleccione un recurso --";
      selectRecurso.appendChild(optionDefault);
      data.forEach((recurso) => {
        const optionPrestamo = document.createElement("option");
        optionPrestamo.value = recurso.id;
        optionPrestamo.textContent = recurso.nombre;
        selectRecurso.appendChild(optionPrestamo);
      });
    })
    .catch((error) => console.error("Error al cargar recursos:", error));
}

function registrarMovimiento() {
  const movimiento = {
    tipo: document.querySelector('input[name="tipo_movimiento"]:checked').value,
    cantidad: parseInt(document.getElementById("cantidadMovimiento").value),
    motivo: document.getElementById("motivoMovimiento").value,
    recursoId: parseInt(document.getElementById("recursoMovimiento").value),
    usuarioId: JSON.parse(localStorage.getItem("usuarioLogueado")).id,
  };

  fetch("http://localhost:8080/api/movimientos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(movimiento),
  })
    .then((response) => response.json())
    .then((data) => alert("Movimiento registrado"))
    .catch((error) => console.error("Error en movimiento:", error));
}

function registrarSolicitud() {
  const solicitud = {
    recursoId: parseInt(document.getElementById("select-recurso").value),
    cantidad: parseInt(document.getElementById("solicitud-cantidad").value),
    nombreSolicitante: document.getElementById("solicitud-nombre").value,
    destino: document.getElementById("solicitud-destino").value,
    tipo: document.getElementById("solicitud-tipo").value,
    usuarioId: JSON.parse(localStorage.getItem("usuarioLogueado")).id,
  };

  fetch(
    "http://localhost:8080/api/solicitudes/registrar?idRecurso=" +
      solicitud.recursoId +
      "&idUsuario=" +
      solicitud.usuarioId,
    {
      method: "POST",
      body: JSON.stringify(solicitud),
      headers: { "Content-Type": "application/json" },
    }
  )
    .then((response) => response.json())
    .then((data) =>
      alert("Préstamo registrado con código: " + data.codigoSolicitud)
    )
    .catch((error) => console.error("Error en préstamo:", error));

    reloadPage();
}

function registrarDevolucion() {
  const codigo = document.getElementById("codigoDevolucion").value;
  const usuarioId = JSON.parse(localStorage.getItem("usuarioLogueado")).id;

  fetch(
    "http://localhost:8080/api/solicitudes/devolucion?codigoSolicitud=" +
      encodeURIComponent(codigo) +
      "&usuarioId=" +
      usuarioId,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) => alert("Devolución registrada"))
    .catch((error) => console.error("Error en devolución:", error));
}

function generarReporte(tipo) {
  const usuarioId = JSON.parse(localStorage.getItem("usuarioLogueado")).id;

  fetch(
    "http://localhost:8080/api/reportes/generar?tipo=" +
      tipo +
      "&idUsuario=" +
      usuarioId,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) => {
      switch (tipo) {
        case "stock_minimo":
          generarReporteStockMinimoPDF(data);
          break;
        case "inventario":
          generarReporteInventarioPDF(data);
          break;

        default:
          break;
      }
    })
    .catch((error) => console.error("Error al generar reporte:", error));
}

// Mostrar/ocultar formularios en gestión de recursos
function showResourceForm(action) {
  document.getElementById("form-nuevo-recurso").classList.add("hidden");
  if (action === "nuevo") {
    document.getElementById("form-nuevo-recurso").classList.remove("hidden");
  }
  if (action === "modificar") {
    document
      .getElementById("form-modificar-recurso")
      .classList.remove("hidden");
  }
}

// Mostrar/ocultar formularios en préstamos
function showLoanForm(action) {
  
  
  if (action === "prestamo") {
    document.getElementById("form-prestamo").classList.remove("hidden");
    document.getElementById("form-devolucion").classList.add("hidden");
    cargarRecursos();
  } else {
    document.getElementById("form-prestamo").classList.add("hidden");
    document.getElementById("form-devolucion").classList.remove("hidden");
    cargarRecursos();
  }
}

// Mostrar/ocultar formularios en usuarios
function showUserForm(action) {
  if (action === "nuevo") {
    document.getElementById("form-nuevo-usuario").classList.remove("hidden");
  }
}
