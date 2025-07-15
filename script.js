const ramos = [
  { nombre: "Biología celular e histología", requisitos: [] },
  { nombre: "Anatomía general", requisitos: [] },
  { nombre: "Matemáticas", requisitos: [] },
  { nombre: "Fundamentos de enfermería", requisitos: [] },
  { nombre: "Educación en enfermería", requisitos: [] },
  { nombre: "Microbiología y parasitología", requisitos: ["Biología celular e histología"] },
  { nombre: "Química general y orgánica", requisitos: [] },
  { nombre: "Bioestadística", requisitos: ["Matemáticas"] },
  { nombre: "Socioantropología e interculturalidad", requisitos: [] },
  { nombre: "Enfermería basada en evidencia", requisitos: [] },
  { nombre: "Fisiología general", requisitos: ["Anatomía general", "Microbiología y parasitología"] },
  { nombre: "Psicología general y del desarrollo", requisitos: [] },
  { nombre: "Bioquímica", requisitos: ["Química general y orgánica"] },
  { nombre: "Enfermería en salud pública", requisitos: [] },
  { nombre: "Gestión del cuidado en enfermería", requisitos: ["Anatomía general", "Educación en enfermería", "Microbiología y parasitología", "Enfermería basada en evidencia", "Química general y orgánica"] },
  { nombre: "Fisiopatología", requisitos: ["Fisiología general"] },
  { nombre: "Farmacología", requisitos: ["Bioquímica", "Fisiología general"] },
  { nombre: "Gestión en servicios de salud", requisitos: ["Enfermería en salud pública"] },
  { nombre: "Herramientas informáticas", requisitos: ["Enfermería en salud pública"] },
  { nombre: "Integrado de ciclo inicial", requisitos: ["Educación en enfermería", "Socioantropología e interculturalidad", "Bioquímica", "Fisiología general", "Enfermería en salud pública"] },
  { nombre: "Gestión del cuidado adulto/mayor", requisitos: ["Gestión del cuidado en enfermería", "Farmacología", "Fisiopatología", "Integrado de ciclo inicial"] },
  { nombre: "Gestión del cuidado comunidades I", requisitos: ["Gestión del cuidado en enfermería", "Farmacología", "Fisiopatología", "Integrado de ciclo inicial"] },
  { nombre: "Gestión del cuidado mujer", requisitos: [] },
  { nombre: "Calidad en la gestión del cuidado", requisitos: ["Gestión en servicios de salud"] },
  { nombre: "Enfermería adulto mayor", requisitos: [] },
  { nombre: "Bioética", requisitos: ["Electivo de Ética"] },
  { nombre: "Metodología de la investigación", requisitos: ["Bioestadística", "Herramientas informáticas", "Enfermería basada en evidencia"] },
  { nombre: "Gestión cuidado salud mental", requisitos: [] },
  { nombre: "Cuidados paliativos", requisitos: ["Enfermería adulto mayor"] },
  { nombre: "Proyecto investigación I", requisitos: ["Metodología de la investigación"] },
  { nombre: "Gestión del cuidado urgencias", requisitos: ["Gestión del cuidado adulto/mayor"] },
  { nombre: "Gestión cuidado niño/adolescente", requisitos: ["Gestión del cuidado adulto/mayor"] },
  { nombre: "Gestión del cuidado comunidades II", requisitos: ["Gestión del cuidado comunidades I"] },
  { nombre: "Proyecto investigación II", requisitos: ["Proyecto investigación I"] },
  { nombre: "Integrado de ciclo intermedio", requisitos: ["TODOS"] },
  { nombre: "Práctica profesional I", requisitos: ["TODOS"] },
  { nombre: "Práctica profesional II", requisitos: ["TODOS"] },
  { nombre: "Seminario integración enfermería", requisitos: ["TODOS"] },
];

const malla = document.getElementById("malla");
const estado = {};

function crearRamo(ramo) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo.nombre;
  if (ramo.requisitos.length === 0) {
    div.classList.add("activo");
  }

  if (ramo.requisitos.length > 0 && !ramo.requisitos.includes("TODOS")) {
    const req = document.createElement("small");
    req.textContent = `Requiere: ${ramo.requisitos.join(", ")}`;
    div.appendChild(req);
  }

  div.addEventListener("click", () => {
    if (!div.classList.contains("activo")) return;

    div.classList.toggle("aprobado");
    estado[ramo.nombre] = div.classList.contains("aprobado");

    actualizarRamos();
  });

  malla.appendChild(div);
  return div;
}

function actualizarRamos() {
  document.querySelectorAll(".ramo").forEach(div => div.classList.remove("activo"));

  ramos.forEach((ramo, i) => {
    const div = malla.children[i];
    if (estado[ramo.nombre]) return; // ya aprobado

    if (ramo.requisitos.includes("TODOS")) {
      const todosAprobados = ramos.every(r => estado[r.nombre]);
      if (todosAprobados) div.classList.add("activo");
      return;
    }

    const requisitosOk = ramo.requisitos.every(req => estado[req]);
    if (requisitosOk) div.classList.add("activo");
  });
}

// Inicializa
ramos.forEach(ramo => {
  estado[ramo.nombre] = false;
  crearRamo(ramo);
});

actualizarRamos();
