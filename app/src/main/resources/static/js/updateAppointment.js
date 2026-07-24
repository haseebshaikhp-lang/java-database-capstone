// updateAppointment.js
import { updateAppointment } from "./services/appointmentRecordService.js";

document.getElementById("updateAppointmentForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(window.location.search);
  const appointmentId = params.get("id");

  const updates = {
    date: document.getElementById("newDate").value,
    time: document.getElementById("newTime").value
  };

  try {
    await updateAppointment(appointmentId, updates, token);
    showAlert("Appointment updated.");
    window.location.href = "/pages/patientAppointments.html";
  } catch (err) {
    showAlert("Failed to update appointment.");
  }
});
