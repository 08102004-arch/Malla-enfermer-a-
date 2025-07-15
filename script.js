// Estructura por semestre
const semestres = [
  {
    nombre: "Primer Año - I Semestre",
    ramos: [
      { nombre: "Biología celular e histología", requisitos: [] },
      { nombre: "Anatomía general", requisitos: [] },
      { nombre: "Matemáticas", requisitos: [] },
      { nombre: "Fundamentos de enfermería", requisitos: [] },
      { nombre: "Educación de enfermería", requisitos: [] },
      { nombre: "Electivo de comunicación", requisitos: [] },
    ],
  },
  {
    nombre: "Primer Año - II Semestre",
    ramos: [
      { nombre: "Microbiología y parasitología", requisitos: ["Biología celular e histología"] },
      { nombre: "Química general y orgánica", requisitos: [] },
      { nombre: "Bioestadística", requisitos: ["Matemáticas"] },
      { nombre: "Socioantropología e interculturalidad", requisitos: [] },
      { nombre: "Enfermería basada en evidencia", requisitos: [] },
      { nombre: "Electivo desarrollo pensamiento", requisitos: [] },
    ],
  },
  {
    nombre: "Segundo Año - I Semestre",
    ramos: [
      { nombre: "Fisiología general", requisitos: ["Anatomía general", "Microbiología y parasitología"] },
      { nombre: "Psicología general y del desarrollo", requisitos: [] },
      { nombre: "Bioquímica", requisitos: ["Química general y orgánica"] },
      { nombre: "Enfermería en salud pública", requisitos: [] },
      { nombre: "Gestión del cuidado en Enfermería", requisitos: ["Educación de enfermería", "Microbiología y parasitología", "Enfermería basada en evidencia", "Química general y orgánica", "Anatomía general"] },
      { nombre: "Electivo de comunicación", requisitos: [] },
    ],
  },
  {
    nombre: "Segundo Año - II Semestre",
    ramos: [
      { nombre: "Fisiopatología", requisitos: ["Fisiología general"] },
      { nombre: "Farmacología", requisitos: ["Fisiología general", "Bioquímica"] },
      { nombre: "Gestión en servicios de salud", requisitos: ["Enfermería en salud pública"] },
      { nombre: "Herramientas informáticas", requisitos: ["Enfermería en salud pública"] },
      { nombre: "Integrado de ciclo inicial", requisitos: ["Educación de enfermería", "Socioantropología e interculturalidad", "Bioquímica", "Fisiología general", "Enfermería en salud pública"] },
    ],
  },
  // Agrega los años 3, 4 y 5 aquí si lo deseas ahora o en la próxima entrega
];

const contenedor = document.getElementById("contenedor-malla");
const estado = {};

// Crea los elementos visuales por semestre
semestres.forEach(sem => {
  const bloque = document.createElement("div");
  bloque.className = "semestre";
  const titulo = document.createElement("h2");
  titulo.textContent = sem.nombre;

  const fila = document.createElement("div");
  fila.className = "fila";

  sem.ramos.forEach(ramo => {
    estado[ramo.nombre] = false;

    const div = document.createElement("div");
    div.className = "ramo";
    div.textContent = ramo.nombre;

    if (ramo.requisitos.length === 0) {
      div.classList.add("activo");
    } else {
      const detalle = document.createElement("small");
      detalle.textContent = "Requiere: " + ramo.requisitos.join(", ");
      div.appendChild(detalle);
    }

    div.addEventListener("click", () => {
      if (!div.classList.contains("activo")) return;
      div.classList.toggle("aprobado");
      estado[ramo.nombre] = div.classList.contains("aprobado");
      actualizar();
    });

    fila.appendChild(div);
  });

  bloque.appendChild(titulo);
  bloque.appendChild(fila);
  contenedor.appendChild(bloque);
});

function actualizar() {
  document.querySelectorAll(".ramo").forEach(r => r.classList.remove("activo"));

  semestres.forEach(sem => {
    sem.ramos.forEach(ramo => {
      if (estado[ramo.nombre]) return;

      if (!ramo.requisitos || ramo.requisitos.length === 0) return;

      const habilitado = ramo.requisitos.every(req => estado[req]);
      if (habilitado) {
        const div = [...document.querySelectorAll(".ramo")].find(d => d.textContent.includes(ramo.nombre));
        if (div) div.classList.add("activo");
      }
    });
  });
}

actualizar();
