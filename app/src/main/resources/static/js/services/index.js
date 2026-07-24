// index.js - role selection logic for the landing page (index.html)

import { patientLogin } from "./patientServices.js";

window.selectRole = function (role) {
  localStorage.setItem("userRole", role);

  if (role === "admin") {
    openModal("adminLogin");
  } else if (role === "doctor") {
    openModal("doctorLogin");
  } else if (role === "patient") {
    // Patients land straight on their dashboard; login/signup happens from there
    window.location.href = "/pages/patientDashboard.html";
  }
};

document.addEventListener("submit", async (e) => {
  if (e.target && e.target.id === "patientLoginForm") {
    e.preventDefault();
    const email = document.getElementById("loginEmail").value;
    const password = document.getElementById("loginPassword").value;

    try {
      const { token } = await patientLogin(email, password);
      localStorage.setItem("token", token);
      localStorage.setItem("userRole", "loggedPatient");
      window.location.href = "/pages/loggedPatientDashboard.html";
    } catch (err) {
      showAlert("Invalid email or password.");
    }
  }
});
