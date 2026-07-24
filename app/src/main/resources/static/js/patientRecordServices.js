// patientRecordServices.js - loads a patient's prescription/record history
import { getPrescriptionsForPatient } from "./services/prescriptionServices.js";
import { createPatientRecordRow } from "./components/patientRecordRow.js";

async function loadRecords() {
  const tbody = document.getElementById("recordTableBody");
  const token = localStorage.getItem("token");
  const params = new URLSearchParams(window.location.search);
  const patientId = params.get("patientId");

  try {
    const records = await getPrescriptionsForPatient(patientId, token);
    tbody.innerHTML = "";
    records.forEach(r => tbody.appendChild(createPatientRecordRow(r)));
  } catch (err) {
    tbody.innerHTML = <tr><td class="noPatientRecord" colspan="5">No records found.</td></tr>;
  }
}

document.addEventListener("DOMContentLoaded", loadRecords);
