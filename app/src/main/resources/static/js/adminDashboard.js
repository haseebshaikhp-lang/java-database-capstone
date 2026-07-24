// adminDashboard.js - page logic for the Admin Dashboard

import { getAllDoctors, filterDoctors, addDoctor } from "./services/doctorServices.js";
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
    contentDiv.innerHTML = <p class="noPatientRecord">No doctors found.</p>;
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

// Handle the "Add Doctor" modal form submit (form is injected dynamically by modals.js)
document.addEventListener("submit", async (e) => {
  if (e.target && e.target.id === "addDoctorForm") {
    e.preventDefault();
    const token = localStorage.getItem("token");

    const doctorData = {
      name: document.getElementById("docName").value,
      specialty: document.getElementById("docSpecialty").value,
      email: document.getElementById("docEmail").value,
      password: document.getElementById("docPassword").value,
      phone: document.getElementById("docPhone").value
    };

    try {
      await addDoctor(doctorData, token);
      closeModal();
      loadDoctors();
    } catch (err) {
      showAlert("Failed to add doctor. Please check the details and try again.");
    }
  }
});

document.addEventListener("DOMContentLoaded", loadDoctors);
