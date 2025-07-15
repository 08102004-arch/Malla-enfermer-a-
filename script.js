// Lista de ramos y sus requisitos
const ramos = [
  { nombre: "Biología celular e histología", requisitos: [] },
  { nombre: "Anatomía general", requisitos: [] },
  { nombre: "Matemáticas", requisitos: [] },
  { nombre: "Fundamentos de enfermería", requisitos: [] },
  { nombre: "Educación de enfermería", requisitos: [] },
  { nombre: "Electivo de comunicación", requisitos: [] },
  { nombre: "Microbiología y parasitología", requisitos: ["Biología celular e histología"] },
  { nombre: "Química general y orgánica", requisitos: [] },
  { nombre: "Bioestadística", requisitos: ["Matemáticas"] },
  { nombre: "Socioantropología e interculturalidad", requisitos: [] },
  { nombre: "Enfermería basada en evidencia", requisitos: [] },
  { nombre: "Electivo desarrollo pensamiento", requisitos: [] },
  { nombre: "Fisiología general", requisitos: ["Anatomía general", "Microbiología y parasitología"] },
  { nombre: "Psicología general y del desarrollo", requisitos: [] },
  { nombre: "Bioquímica", requisitos: ["Química general y orgánica"] },
  { nombre: "Enfermería en salud pública", requisitos: [] },
  { nombre: "Gestión del cuidado en Enfermería", requisitos: ["Educación de enfermería", "Microbiología y parasitología", "Enfermería basada en evidencia", "Química general y orgánica", "Anatomía general"] },
  { nombre: "Fisiopatología", requisitos: ["Fisiología general"] },
  { nombre: "Farmacología", requisitos: ["Fisiología general", "Bioquímica"] },
  { nombre: "Gestión en servicios de salud", requisitos: ["Enfermería en salud pública"] },
  { nombre: "Herramientas informáticas", requisitos: ["Enfermería en salud pública"] },
  { nombre: "Integrado de ciclo inicial", requisitos: ["Educación de enfermería", "Socioantropología e interculturalidad", "Bioquímica", "Fisiología general", "Enfermería en salud pública"] },
  { nombre: "Gestión cuidado adulto y adulto mayor", requisitos: ["Farmacología", "Fisiopatología", "Gestión del cuidado en Enfermería", "Integrado de ciclo inicial"] },
  { nombre: "Gestión del cuidado en comunidades I", requisitos: ["Farmacología", "Fisiopatología", "Gestión del cuidado en Enfermería", "Integrado de ciclo inicial"] },
  { nombre: "Gestión del cuidado de la mujer", requisitos: [] },
  { nombre: "Calidad en la gestión del cuidado", requisitos: ["Gestión en servicios de salud"] },
  { nombre: "Enfermería adulto mayor", requisitos: [] },
  { nombre: "Electivo de Ética", requisitos: [] },
  { nombre: "Bioética", requisitos: ["Electivo de Ética"] },
  { nombre: "Metodología de la investigación", requisitos: ["Bioestadística", "Herramientas informáticas", "Enfermería basada en evidencia"] },
  { nombre: "Gestión del cuidado salud mental", requisitos: [] },
  { nombre: "Cuidados paliativos y procesos de morir", requisitos: ["Enfermería adulto mayor"] },
  { nombre: "Proyecto investigación I", requisitos: ["Metodología de la investigación"] },
  { nombre: "Gestión del cuidado en urgencias", requisitos: ["Gestión cuidado adulto y adulto mayor"] },
  { nombre: "Gestión del cuidado niño y adolescente", requisitos: ["Gestión cuidado adulto y adulto mayor"] },
  { nombre: "Gestión del cuidado en comunidades II", requisitos: ["Gestión del cuidado en comunidades I"] },
  { nombre: "Proyecto investigación II", requisitos: ["Proyecto investigación I"] },
  { nombre: "Integrado de ciclo intermedio", requisitos: ["TODOS"] },
  { nombre: "Electivo de responsabilidad social", requisitos: [] },
  { nombre: "Práctica profesional I", requisitos: ["TODOS"] },
  { nombre: "Práctica profesional II", requisitos: ["TODOS"] },
  { nombre: "Seminario de integración", requisitos: ["TODOS"] },
];

const malla = document.getElementById("malla");
const estado = {};

// Crear cada cuadro visual
function crearRamo(ramo) {
  const div = document.createElement("div");
  div.className = "ramo";
  div.textContent = ramo.nombre;
  if (ramo.requisitos.length === 0) div.classList.add("activo");

  if (ramo.requisitos.length > 0 && !ramo.requisitos.includes("TODOS")) {
    const detalle = document.createElement("small");
    detalle.textContent = "Requiere: " + ramo.requisitos.join(", ");
    div.appendChild(detalle);
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

// Lógica para activar ramos desbloqueados
function actualizarRamos() {
  document.querySelectorAll(".ramo").forEach(div => div.classList.remove("activo"));

  ramos.forEach((ramo, i) => {
    const div = malla.children[i];
    if (estado[ramo.nombre]) return;

    if (ramo.requisitos.includes("TODOS")) {
      const aprobados = ramos.every(r => estado[r.nombre]);
      if (aprobados) div.classList.add("activo");
      return;
    }

    const listos = ramo.requisitos.every(req => estado[req]);
    if (listos) div.classList.add("activo");
  });
}

// Inicializa la interfaz
ramos.forEach(r => {
  estado[r.nombre] = false;
  crearRamo(r);
});
actualizarRamos();
