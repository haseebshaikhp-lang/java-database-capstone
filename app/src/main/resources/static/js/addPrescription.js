// addPrescription.js
import { addPrescription } from "./services/prescriptionServices.js";

document.getElementById("prescriptionForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(window.location.search);
  const patientId = params.get("patientId");

  const data = {
    patientId,
    medication: document.getElementById("medication").value,
    dosage: document.getElementById("dosage").value,
    notes: document.getElementById("notes").value
  };

  try {
    await addPrescription(data, token);
    showAlert("Prescription added.");
    window.location.href = "/templates/doctor/doctorDashboard.html";
  } catch (err) {
    showAlert("Failed to add prescription.");
  }
});
