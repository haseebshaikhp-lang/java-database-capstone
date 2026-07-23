/*
  Step-by-Step Explanation of Header Section Rendering
  Renders the header dynamically based on user role, session status,
  and available actions (login, logout, role-switching).
*/

function renderHeader() {
  const headerDiv = document.getElementById("header");

  // If on the root page, clear any stale session and show a plain header
  if (window.location.pathname.endsWith("/")) {
    localStorage.removeItem("userRole");
    headerDiv.innerHTML = `
      <header class="header">
        <div class="logo-section">
          <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
          <span class="logo-title">Hospital CMS</span>
        </div>
      </header>`;
    return;
  }

  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  let headerContent = `<header class="header">
    <div class="logo-section">
      <img src="../assets/images/logo/logo.png" alt="Hospital CRM Logo" class="logo-img">
      <span class="logo-title">Hospital CMS</span>
    </div>
    <nav>`;

  // Session expired or invalid login
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    alert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  } else if (role === "admin") {
    headerContent += `
      <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
      <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `
      <button class="adminBtn" onclick="selectRole('doctor')">Home</button>
      <a href="#" onclick="logout()">Logout</a>`;
  } else if (role === "patient") {
    headerContent += `
      <button id="patientLogin" class="adminBtn">Login</button>
      <button id="patientSignup" class="adminBtn">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `
      <button id="home" class="adminBtn" onclick="window.location.href='/pages/loggedPatientDashboard.html'">Home</button>
      <button id="patientAppointments" class="adminBtn" onclick="window.location.href='/pages/patientAppointments.html'">Appointments</button>
      <a href="#" onclick="logoutPatient()">Logout</a>`;
  } else {
    // No role/guest — offer doctor and admin login entry points
    headerContent += `
      <button id="doctorLogin" class="adminBtn" onclick="openModal('doctorLogin')">Doctor Login</button>
      <button id="adminLogin" class="adminBtn" onclick="openModal('adminLogin')">Admin Login</button>`;
  }

  headerContent += `
    </nav>
  </header>`;

  headerDiv.innerHTML = headerContent;

  attachHeaderButtonListeners();
}

function attachHeaderButtonListeners() {
  const doctorLoginBtn = document.getElementById("doctorLogin");
  const adminLoginBtn = document.getElementById("adminLogin");

  if (doctorLoginBtn) {
    doctorLoginBtn.addEventListener("click", () => {
      openModal("doctorLogin");
    });
  }

  if (adminLoginBtn) {
    adminLoginBtn.addEventListener("click", () => {
      openModal("adminLogin");
    });
  }
}

function logout() {
  localStorage.removeItem("userRole");
  localStorage.removeItem("token");
  window.location.href = "/";
}

function logoutPatient() {
  localStorage.removeItem("token");
  window.location.href = "/pages/patientDashboard.html";
}

// Render the header on page load
renderHeader();
