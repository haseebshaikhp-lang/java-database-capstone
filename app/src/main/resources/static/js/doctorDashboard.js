cat > /home/project/capstone/app/src/main/resources/static/js/doctorDashboard.js << 'EOF'
// doctorDashboard.js - page logic for the Doctor Dashboard

import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

const tableBody = document.getElementById("patientTableBody");
let selectedDate = new Date().toISOString().split('T')[0];
const token = localStorage.getItem("token");
let patientName = null;

document.getElementById("searchBar")?.addEventListener("input", (e) => {
  const value = e.target.value.trim();
  patientName = value.length > 0 ? value : "null";
  loadAppointments();
});

document.getElementById("todayButton")?.addEventListener("click", () => {
  selectedDate = new Date().toISOString().split('T')[0];
  const datePicker = document.getElementById("datePicker");
  if (datePicker) datePicker.value = selectedDate;
  loadAppointments();
});

document.getElementById("datePicker")?.addEventListener("change", (e) => {
  selectedDate = e.target.value;
  loadAppointments();
});

async function loadAppointments() {
  try {
    const appointments = await getAllAppointments(selectedDate, patientName, token);
    tableBody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
      tableBody.innerHTML = <tr><td colspan="5">No Appointments found for today.</td></tr>;
      return;
    }

    appointments.forEach(appointment => {
      const patient = {
        id: appointment.patient.id,
        name: appointment.patient.name,
        phone: appointment.patient.phone,
        email: appointment.patient.email
      };
      const row = createPatientRow(patient, appointment.id, appointment.doctorId);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
    tableBody.innerHTML = <tr><td colspan="5">Error loading appointments. Try again later.</td></tr>;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (typeof renderContent === "function") renderContent();
  loadAppointments();
});
EOF
echo done
