// adminDashboard.js

import { openModal } from './components/modals.js';
import { getDoctors, filterDoctors, saveDoctor } from './services/doctorServices.js';
import { createDoctorCard } from './components/doctorCard.js';

// Bind "Add Doctor" button to open modal
document.getElementById('addDocBtn').addEventListener('click', () => {
  openModal('addDoctor');
});

// Run on page load
window.onload = function () {
  loadDoctorCards();

  document.getElementById("searchBar").addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime").addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty").addEventListener("change", filterDoctorsOnChange);
};

// Fetch and display all doctors
async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Failed to load doctors:", error);
    const contentDiv = document.getElementById("content");
    contentDiv.innerHTML = "<p>Unable to load doctors right now.</p>";
  }
}

// Render a list of doctor cards into #content
function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = "<p>No doctors found</p>";
    return;
  }

  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

// Handle search bar + filter dropdown changes
async function filterDoctorsOnChange() {
  const searchBarValue = document.getElementById("searchBar").value.trim();
  const filterTimeValue = document.getElementById("filterTime").value;
  const filterSpecialtyValue = document.getElementById("filterSpecialty").value;

  const name = searchBarValue.length > 0 ? searchBarValue : null;
  const time = filterTimeValue.length > 0 ? filterTimeValue : null;
  const specialty = filterSpecialtyValue.length > 0 ? filterSpecialtyValue : null;

  try {
    const doctors = await filterDoctors(name, time, specialty);
    if (doctors && doctors.length > 0) {
      renderDoctorCards(doctors);
    } else {
      const contentDiv = document.getElementById("content");
      contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
    }
  } catch (error) {
    console.error("Failed to filter doctors:", error);
    alert("Something went wrong while filtering doctors.");
  }
}

// Handle Add Doctor form submission
window.adminAddDoctor = async function () {
  const token = localStorage.getItem("token");
  if (!token) {
    alert("You must be logged in as admin to add a doctor.");
    return;
  }

  const name = document.getElementById("doctorName").value;
  const specialty = document.getElementById("specialty").value;
  const email = document.getElementById("doctorEmail").value;
  const password = document.getElementById("doctorPassword").value;
  const mobile = document.getElementById("doctorPhone").value;

  const availabilityCheckboxes = document.querySelectorAll('input[name="availability"]:checked');
  const availableTimes = Array.from(availabilityCheckboxes).map(cb => cb.value);

  const doctor = {
    name,
    specialty,
    email,
    password,
    mobile,
    availableTimes
  };

  try {
    const result = await saveDoctor(doctor, token);
    if (result.success) {
      alert("Doctor added successfully!");
      document.getElementById("modal").style.display = "none";
      loadDoctorCards();
    } else {
      alert(result.message || "Failed to add doctor.");
    }
  } catch (error) {
    console.error("Error adding doctor:", error);
    alert("Something went wrong while adding the doctor.");
  }
};