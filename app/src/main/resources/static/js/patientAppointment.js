// patientAppointment.js - lists a logged-in patient's own appointments
import { getAppointments } from "./services/appointmentRecordService.js";
import { createAppointmentRow } from "./components/appointmentRow.js";

async function loadAppointments() {
  const tbody = document.getElementById("appointmentTableBody");
  const token = localStorage.getItem("token");
  try {
    const appointments = await getAppointments(token);
    tbody.innerHTML = "";
    appointments.forEach(a => tbody.appendChild(createAppointmentRow(a)));
  } catch (err) {
    tbody.innerHTML = <tr><td class="noPatientRecord" colspan="6">No appointments found.</td></tr>;
  }
}

function editAppointment(id) {
  window.location.href = /pages/updateAppointment.html?id=${id};
}

document.addEventListener("DOMContentLoaded", loadAppointments);
