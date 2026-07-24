cat > /home/project/capstone/app/src/main/resources/static/js/patientDashboard.js << 'EOF'
// patientDashboard.js - page logic for the (guest) Patient Dashboard

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

  document.getElementById("searchBar")?.addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime")?.addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty")?.addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error("Error loading doctors:", error);
  }
}

function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";
  doctors.forEach(doctor => {
    contentDiv.appendChild(createDoctorCard(doctor));
  });
}

async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value.trim() || null;
  const time = document.getElementById("filterTime").value || null;
  const specialty = document.getElementById("filterSpecialty").value || null;

  const contentDiv = document.getElementById("content");

  try {
    const doctors = await filterDoctors(name, time, specialty);
    contentDiv.innerHTML = "";

    if (doctors.length > 0) {
      doctors.forEach(doctor => contentDiv.appendChild(createDoctorCard(doctor)));
    } else {
      contentDiv.innerHTML = "<p>No doctors found with the given filters.</p>";
    }
  } catch (error) {
    console.error("Error filtering doctors:", error);
    contentDiv.innerHTML = "<p>Error filtering doctors. Please try again.</p>";
  }
}

// ---- Signup ----
window.signupPatient = async function () {
  try {
    const data = {
      name: document.getElementById("signupName").value,
      email: document.getElementById("signupEmail").value,
      password: document.getElementById("signupPassword").value,
      phone: document.getElementById("signupPhone").value,
      address: document.getElementById("signupAddress").value
    };

    const { success, message } = await patientSignup(data);

    if (success) {
      alert(message || "Signup successful!");
      document.getElementById("modal").classList.remove("active");
      window.location.reload();
    } else {
      alert(message || "Signup failed.");
    }
  } catch (error) {
    console.error("Signup error:", error);
    alert("An error occurred while signing up.");
  }
};

// ---- Login ----
window.loginPatient = async function () {
  try {
    const data = {
      email: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPassword").value
    };

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
    console.error("Login error:", error);
    alert("An error occurred while logging in.");
  }
};
EOF
echo done
