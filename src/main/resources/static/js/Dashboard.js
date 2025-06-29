document.addEventListener("DOMContentLoaded", function () {
  validarSesion();
  actualizarFecha();
  contarRecursos();
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
  document
    .querySelectorAll(".section-content")
    .forEach((sec) => sec.classList.add("hidden"));
  document.getElementById(sectionId).classList.remove("hidden");
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
  fetch("http://localhost:8080/api/recursos/contar")
    .then((response) => response.json())
    .then((data) => {
      document.getElementById("totalRecursos").textContent = data;
    })
    .catch((error) => console.error("Error al contar recursos:", error));
}

function crearRecurso() {
  const recurso = {
    nombre: document.getElementById("nombreRecurso").value,
    categoria: document.getElementById("categoriaRecurso").value,
    codigo: document.getElementById("codigoRecurso").value,
    cantidad: document.getElementById("cantidadRecurso").value,
    minimo: document.getElementById("minimoRecurso").value,
    ubicacion: document.getElementById("ubicacionRecurso").value,
    descripcion: document.getElementById("descripcionRecurso").value,
    estado: true,
  };

  fetch("http://localhost:8080/api/recursos", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(recurso),
  })
    .then((response) => response.json())
    .then((data) => alert("Recurso creado: " + data.id))
    .catch((error) => console.error("Error al crear recurso:", error));
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

function registrarPrestamo() {
  const prestamo = {
    recursoId: parseInt(document.getElementById("recursoPrestamo").value),
    cantidad: parseInt(document.getElementById("cantidadPrestamo").value),
    nombreSolicitante: document.getElementById("solicitantePrestamo").value,
    destino: document.getElementById("destinoPrestamo").value,
    usuarioId: JSON.parse(localStorage.getItem("usuarioLogueado")).id,
  };

  fetch(
    "http://localhost:8080/api/solicitudes/registrar?recursoId=" +
      prestamo.recursoId +
      "&cantidad=" +
      prestamo.cantidad +
      "&nombreSolicitante=" +
      encodeURIComponent(prestamo.nombreSolicitante) +
      "&destino=" +
      encodeURIComponent(prestamo.destino) +
      "&usuarioId=" +
      prestamo.usuarioId,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) =>
      alert("Préstamo registrado con código: " + data.codigoSolicitud)
    )
    .catch((error) => console.error("Error en préstamo:", error));
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
      "&usuarioId=" +
      usuarioId,
    {
      method: "POST",
    }
  )
    .then((response) => response.json())
    .then((data) => alert("Reporte generado de tipo: " + tipo))
    .catch((error) => console.error("Error al generar reporte:", error));
}
