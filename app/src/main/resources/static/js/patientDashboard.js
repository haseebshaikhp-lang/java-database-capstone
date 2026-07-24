// patientDashboard.js - page logic for the (guest) Patient Dashboard

import { getAllDoctors, filterDoctors } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

const contentDiv = document.getElementById("content");
const searchBar = document.getElementById("searchBar");
const filterTime = document.getElementById("filterTime");
const filterSpecialty = document.getElementById("filterSpecialty");

async function loadDoctors() {
  try {
    const doctors = await getAllDoctors();
    renderDoctors(doctors);
  } catch (err) {
    contentDiv.innerHTML = <p class="noPatientRecord">Unable to load doctors right now.</p>;
  }
}

function renderDoctors(doctors) {
  contentDiv.innerHTML = "";
  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = <p class="noPatientRecord">No doctors match your search.</p>;
    return;
  }
  doctors.forEach(doctor => contentDiv.appendChild(createDoctorCard(doctor)));
}

async function applyFilters() {
  try {
    const doctors = await filterDoctors(
      searchBar.value.trim(),
      filterTime.value,
      filterSpecialty.value
    );
    renderDoctors(doctors);
  } catch (err) {
    showAlert("Unable to filter doctors right now.");
  }
}

searchBar.addEventListener("input", applyFilters);
filterTime.addEventListener("change", applyFilters);
filterSpecialty.addEventListener("change", applyFilters);

document.addEventListener("DOMContentLoaded", loadDoctors);
