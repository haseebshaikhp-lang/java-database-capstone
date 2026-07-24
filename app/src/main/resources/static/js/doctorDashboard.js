// doctorDashboard.js - page logic for the Doctor Dashboard

import { getAppointments } from "./services/appointmentRecordService.js";

const tableBody = document.getElementById("patientTableBody");
const searchBar = document.getElementById("searchBar");
const dateFilter = document.getElementById("dateFilter");
const todayBtn = document.getElementById("todayBtn");

let currentDate = new Date().toISOString().split("T")[0];

async function loadPatients() {
  const token = localStorage.getItem("token");
  try {
    const appointments = await getAppointments(token, currentDate);
    renderPatients(appointments, searchBar.value.trim().toLowerCase());
  } catch (err) {
    renderNoPatientRecord(tableBody, 5);
  }
}

function renderPatients(appointments, filterText) {
  tableBody.innerHTML = "";

  const filtered = filterText
    ? appointments.filter(a => a.patientName.toLowerCase().includes(filterText))
    : appointments;

  if (!filtered || filtered.length === 0) {
    renderNoPatientRecord(tableBody, 5);
    return;
  }

  filtered.forEach(patient => tableBody.appendChild(createPatientRow(patient)));
}

searchBar.addEventListener("input", loadPatients);

todayBtn.addEventListener("click", () => {
  currentDate = new Date().toISOString().split("T")[0];
  dateFilter.value = currentDate;
  loadPatients();
});

dateFilter.addEventListener("change", () => {
  currentDate = dateFilter.value;
  loadPatients();
});

document.addEventListener("DOMContentLoaded", loadPatients);
