[6:25 am, 24/07/2026] Muhammad Haseeb: import { API_BASE_URL } from "../config/config.js";

const APPOINTMENT_API = API_BASE_URL + "/appointments";

export async function getAllAppointments(date, patientName, token) {
  try {
    const name = patientName || "null";
    const response = await fetch(${APPOINTMENT_API}/${date}/${name}/${token});
    if (!response.ok) return [];
    const data = await response.json();
    return data.appointments || data || [];
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

export async function bookAppointment(appointment, token) {
  try {
    const response = await fetch(${APPOINTMENT_API}/${token}, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointme…
[6:26 am, 24/07/2026] Muhammad Haseeb: import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

document.addEventListener("DOMContentLoaded", () => {
  const addDocBtn = document.getElementById("addDocBtn");
  if (addDocBtn) {
    addDocBtn.addEventListener("click", () => openModal("addDoctor"));
  }

  loadDoctorCards();

  const searchBar = document.getElementById("searchBar");
  if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);

  const filterTime = document.getElementById("filterTime");
  if (filterTime) filterTime.addEventListener("change", filterDoctorsOnChange);

  const filterSpecialty = document.getElementById("filterSpecialty");
  if (filterSpecialty) filterSpecialty.addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
  const doctors = await getDoctors();
  renderDoctorCards(doctors);
}

function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = "<p>No doctors found</p>";
    return;
  }

  doctors.forEach((doctor) => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value || null;
  const time = document.getElementById("filterTime").value || null;
  const specialty = document.getElementById("filterSpecialty").value || null;

  const doctors = await filterDoctors(name, time, specialty);
  renderDoctorCards(doctors);
}

window.adminAddDoctor = async function () {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in as admin.");
    return;
  }

  const name = document.getElementById("doctorName").value;
  const specialty = document.getElementById("specialization").value;
  const email = document.getElementById("doctorEmail").value;
  const password = document.getElementById("doctorPassword").value;
  const phone = document.getElementById("doctorPhone").value;

  const checkboxes = document.querySelectorAll('input[name="availability"]:checked');
  const availableTimes = Array.from(checkboxes).map((cb) => cb.value);

  const doctor = { name, specialty, email, password, phone, availableTimes };

  const result = await saveDoctor(doctor, token);

  if (result.success) {
    alert("Doctor added successfully!");
    document.getElementById("modal").style.display = "none";
    loadDoctorCards();
  } else {
    alert(result.message || "Failed to add doctor");
  }
};
