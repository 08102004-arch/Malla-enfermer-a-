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
      { nombre: "Electivo de desarrollo del pensamiento", requisitos: [] },
    ],
  },
  {
    nombre: "Segundo Año - I Semestre",
    ramos: [
      { nombre: "Fisiología general", requisitos: ["Anatomía general", "Microbiología y parasitología"] },
      { nombre: "Psicología general y del desarrollo", requisitos: [] },
      { nombre: "Bioquímica", requisitos: ["Química general y orgánica"] },
      { nombre: "Enfermería en salud pública", requisitos: [] },
      {
        nombre: "Gestión del cuidado en Enfermería",
        requisitos: [
          "Educación de enfermería",
          "Microbiología y parasitología",
          "Enfermería basada en evidencia",
          "Química general y orgánica",
          "Anatomía general"
        ]
      },
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
      {
        nombre: "Integrado de ciclo inicial",
        requisitos: [
          "Educación de enfermería",
          "Socioantropología e interculturalidad",
          "Bioquímica",
          "Fisiología general",
          "Enfermería en salud pública"
        ]
      },
    ],
  },
  {
    nombre: "Tercer Año - I Semestre",
    ramos: [
      { nombre: "Gestión del cuidado de la mujer", requisitos: [] },
      { nombre: "Calidad en la gestión del cuidado", requisitos: ["Gestión en servicios de salud"] },
      {
        nombre: "Gestión del cuidado adulto y adulto mayor",
        requisitos: [
          "Farmacología",
          "Fisiopatología",
          "Gestión del cuidado en Enfermería",
          "Integrado de ciclo inicial"
        ]
      },
      {
        nombre: "Gestión del cuidado en comunidades I",
        requisitos: [
          "Farmacología",
          "Fisiopatología",
          "Gestión del cuidado en Enfermería",
          "Integrado de ciclo inicial"
        ]
      },
      { nombre: "Enfermería adulto mayor", requisitos: [] },
      { nombre: "Electivo de Ética", requisitos: [] },
    ],
  },
  {
    nombre: "Tercer Año - II Semestre",
    ramos: [
      { nombre: "Bioética", requisitos: ["Electivo de Ética"] },
      {
        nombre: "Metodología de la investigación",
        requisitos: [
          "Bioestadística",
          "Herramientas informáticas",
          "Enfermería basada en evidencia"
        ]
      },
      { nombre: "Gestión del cuidado en salud mental", requisitos: [] },
      { nombre: "Cuidados paliativos y procesos de morir", requisitos: ["Enfermería adulto mayor"] },
    ],
  },
  {
    nombre: "Cuarto Año - I Semestre",
    ramos: [
      { nombre: "Proyecto de la investigación I", requisitos: ["Metodología de la investigación"] },
      { nombre: "Gestión del cuidado en urgencias", requisitos: ["Gestión del cuidado adulto y adulto mayor"] },
      { nombre: "Gestión del cuidado del niño y adolescente", requisitos: ["Gestión del cuidado adulto y adulto mayor"] },
      { nombre: "Gestión del cuidado en comunidades II", requisitos: ["Gestión del cuidado en comunidades I"] },
      { nombre: "Electivo de desarrollo personal", requisitos: [] },
    ],
  },
  {
    nombre: "Cuarto Año - II Semestre",
    ramos: [
      { nombre: "Proyecto de la investigación II", requisitos: ["Proyecto de la investigación I"] },
      { nombre: "Integrado de ciclo intermedio", requisitos: ["TODOS"] },
      { nombre: "Electivo de responsabilidad social", requisitos: [] },
    ],
  },
  {
    nombre: "Quinto Año - I y II Semestre",
    ramos: [
      { nombre: "Práctica profesional I", requisitos: ["TODOS"] },
      { nombre: "Práctica profesional II", requisitos: ["TODOS"] },
      { nombre: "Seminario de integración de enfermería", requisitos: ["TODOS"] },
    ],
  },
];

// Generar visual
const contenedor = document.getElementById("contenedor-malla");
const estado = {};

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

      if (ramo.requisitos.includes("TODOS")) {
        const aprobados = Object.values(estado).every(e => e);
        if (aprobados) {
          const div = [...document.querySelectorAll(".ramo")].find(d => d.textContent.includes(ramo.nombre));
          if (div) div.classList.add("activo");
        }
        return;
      }

      const habilitado = ramo.requisitos.every(req => estado[req]);
      if (habilitado) {
        const div = [...document.querySelectorAll(".ramo")].find(d => d.textContent.includes(ramo.nombre));
        if (div) div.classList.add("activo");
      }
    });
  });
}

actualizar();
