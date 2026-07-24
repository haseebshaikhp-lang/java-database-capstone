import { createDoctorCard } from "./components/doctorCard.js";
import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors } from "./services/doctorServices.js";
import { patientLogin, patientSignup } from "./services/patientServices.js";

document.addEventListener("DOMContentLoaded", () => {
  loadDoctorCards();

  const signupBtn = document.getElementById("patientSignup");
  if (signupBtn) signupBtn.addEventListener("click", () => openModal("patientSignup"));

  const loginBtn = document.getElementById("patientLogin");
  if (loginBtn) loginBtn.addEventListener("click", () => openModal("patientLogin"));

  const searchBar = document.getElementById("searchBar");
  if (searchBar) searchBar.addEventListener("input", filterDoctorsOnChange);

  const filterTime = document.getElementById("filterTime");
  if (filterTime) filterTime.addEventListener("change", filterDoctorsOnChange);

  const filterSpecialty = document.getElementById("filterSpecialty");
  if (filterSpecialty) filterSpecialty.addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
  const doctors = await getDoctors();
  renderDoctorCards(doctors);
}

function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
    return;
  }

  doctors.forEach((doctor) => {
    contentDiv.appendChild(createDoctorCard(doctor));
  });
}

async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value || null;
  const time = document.getElementById("filterTime").value || null;
  const specialty = document.getElementById("filterSpecialty").value || null;

  const doctors = await filterDoctors(name, time, specialty);
  renderDoctorCards(doctors);
}

window.signupPatient = async function () {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const phone = document.getElementById("phone").value;
  const address = document.getElementById("address").value;

  const data = { name, email, password, phone, address };

  const result = await patientSignup(data);

  if (result.success) {
    alert(result.message || "Signup successful!");
    document.getElementById("modal").style.display = "none";
    window.location.reload();
  } else {
    alert(result.message || "Signup failed");
  }
};

window.loginPatient = async function () {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  const data = { email, password };

  try {
    const response = await patientLogin(data);

    if (response.ok) {
      const result = await response.json();
      localStorage.setItem("token", result.token);
      localStorage.setItem("userRole", "loggedPatient");
      window.location.href = "/pages/loggedPatientDashboard.html";
    } else {
      alert("Invalid credentials!");
    }
  } catch (error) {
    console.error(error);
    alert("Something went wrong!");
  }
};
