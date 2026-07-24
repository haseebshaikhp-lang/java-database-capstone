import { getAllAppointments } from "./services/appointmentRecordService.js";
import { createPatientRow } from "./components/patientRows.js";

let selectedDate = new Date().toISOString().split("T")[0];
const token = localStorage.getItem("token");
let patientName = null;

document.addEventListener("DOMContentLoaded", () => {
  const searchBar = document.getElementById("searchBar");
  if (searchBar) {
    searchBar.addEventListener("input", () => {
      patientName = searchBar.value.trim() || "null";
      loadAppointments();
    });
  }

  const todayButton = document.getElementById("todayButton");
  if (todayButton) {
    todayButton.addEventListener("click", () => {
      selectedDate = new Date().toISOString().split("T")[0];
      const datePicker = document.getElementById("datePicker");
      if (datePicker) datePicker.value = selectedDate;
      loadAppointments();
    });
  }

  const datePicker = document.getElementById("datePicker");
  if (datePicker) {
    datePicker.addEventListener("change", (e) => {
      selectedDate = e.target.value;
      loadAppointments();
    });
  }

  loadAppointments();
});

async function loadAppointments() {
  const tableBody = document.getElementById("patientTableBody");
  try {
    const appointments = await getAllAppointments(selectedDate, patientName, token);
    tableBody.innerHTML = "";

    if (!appointments || appointments.length === 0) {
      tableBody.innerHTML = <tr><td colspan="5" class="noPatientRecord">No Appointments found for today</td></tr>;
      return;
    }

    appointments.forEach((appointment) => {
      const row = createPatientRow(appointment);
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.error("Error loading appointments:", error);
    tableBody.innerHTML = <tr><td colspan="5">Error loading appointments</td></tr>;
  }
}
