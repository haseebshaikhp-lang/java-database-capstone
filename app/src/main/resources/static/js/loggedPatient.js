// loggedPatient.js - dashboard logic for a logged-in patient (same doctor browsing as guest view)
import { getAllDoctors } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

async function loadDoctors() {
  const contentDiv = document.getElementById("content");
  try {
    const doctors = await getAllDoctors();
    contentDiv.innerHTML = "";
    doctors.forEach(doctor => contentDiv.appendChild(createDoctorCard(doctor)));
  } catch (err) {
    contentDiv.innerHTML = <p class="noPatientRecord">Unable to load doctors right now.</p>;
  }
}

document.addEventListener("DOMContentLoaded", loadDoctors);
