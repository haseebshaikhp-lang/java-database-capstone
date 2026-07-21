import { getAllAppointments } from './services/appointmentRecordService.js';
import { createPatientRow } from './components/patientRows.js';

const tableBody = document.getElementById("patientTableBody");
let selectedDate = new Date().toISOString().split('T')[0];
const token = localStorage.getItem("token");
let patientName = null;

document.getElementById("searchBar").addEventListener("input", (e) => {
  const value = e.target.value.trim();
  patientName = value.length > 0 ? value : "null";
  loadAppointments();
});

document.getElementById("todayButton").addEventListener("click", () => {
  selectedDate = new Date().toISOString().split('T')[0];
  document.getElementById("datePicker").value = selectedDate;
  loadAppointments();
});

document.getElementById("datePicker").addEventListener("change", (e) => {
  selectedDate = e.target.value;
  loadAppointments();
});

async function loadAppointments() {
  try {
    const appointments = await getAllAppointments(selectedDate, patientName, token);

    tableBody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
      const row = document.createElement("tr");
      row.innerHTML = <td colspan="5">No Appointments found for today.</td>;
      tableBody.appendChild(row);
      return;
    }

    appointments.forEach(appointment => {
      const patient = {
        id: appointment.patientId,
        name: appointment.patientName,
        phone: appointment.patientPhone,
        email: appointment.patientEmail
      };

      const row = createPatientRow(patient, appointment);
      tableBody.appendChild(row);
    });

  } catch (error) {
    console.error("Failed to load appointments:", error);
    tableBody.innerHTML = "";
    const row = document.createElement("tr");
    row.innerHTML = <td colspan="5">Error loading appointments. Try again later.</td>;
    tableBody.appendChild(row);
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderContent === "function") {
    renderContent();
  }
  document.getElementById("datePicker").value = selectedDate;
  loadAppointments();
});