// header.js - renders a role-aware header into #header

function renderHeader() {
  const headerDiv = document.getElementById("header");
  if (!headerDiv) return;

  // Don't show a role-based header on the homepage - always start fresh there
  if (window.location.pathname.endsWith("/") || window.location.pathname.endsWith("/index.html")) {
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    headerDiv.innerHTML = `
      <header class="header">
        <div class="logo-section">
          <img src="/assets/images/logo/logo.png" alt="Clinic logo" />
          <span class="logo-title">Clinic Management System</span>
        </div>
      </header>`;
    return;
  }

  const role = localStorage.getItem("userRole");
  const token = localStorage.getItem("token");

  // Any authenticated role without a token means the session is no longer valid
  if ((role === "loggedPatient" || role === "admin" || role === "doctor") && !token) {
    localStorage.removeItem("userRole");
    showAlert("Session expired or invalid login. Please log in again.");
    window.location.href = "/";
    return;
  }

  let headerContent = `
    <header class="header">
      <div class="logo-section">
        <img src="/assets/images/logo/logo.png" alt="Clinic logo" />
        <span class="logo-title">Clinic Management System</span>
      </div>
      <nav>`;

  if (role === "admin") {
    headerContent += `
        <button id="addDocBtn" class="adminBtn" onclick="openModal('addDoctor')">Add Doctor</button>
        <a href="#" id="logoutLink" onclick="logout()">Logout</a>`;
  } else if (role === "doctor") {
    headerContent += `
        <a href="/" id="homeLink">Home</a>
        <a href="#" id="logoutLink" onclick="logout()">Logout</a>`;
  } else if (role === "patient") {
    headerContent += `
        <button id="loginBtn" onclick="openModal('patientLogin')">Login</button>
        <button id="signupBtn" onclick="openModal('patientSignup')">Sign Up</button>`;
  } else if (role === "loggedPatient") {
    headerContent += `
        <a href="/pages/loggedPatientDashboard.html" id="homeLink">Home</a>
        <a href="/pages/patientAppointments.html" id="appointmentsLink">Appointments</a>
        <a href="#" id="logoutPatientLink" onclick="logoutPatient()">Logout</a>`;
  }

  headerContent += `
      </nav>
    </header>`;

  headerDiv.innerHTML = headerContent;
  attachHeaderButtonListeners();
}

/** Re-attach listeners for elements that were just injected into the DOM. */
function attachHeaderButtonListeners() {
  const addDocBtn = document.getElementById("addDocBtn");
  if (addDocBtn) {
    addDocBtn.addEventListener("click", () => openModal("addDoctor"));
  }

  const loginBtn = document.getElementById("loginBtn");
  if (loginBtn) {
    loginBtn.addEventListener("click", () => openModal("patientLogin"));
  }

  const signupBtn = document.getElementById("signupBtn");
  if (signupBtn) {
    signupBtn.addEventListener("click", () => openModal("patientSignup"));
  }
}

/** Fully logs the user out and returns to the homepage. */
function logout() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
  window.location.href = "/";
}

/** Logs a logged-in patient out but keeps them in the "patient" (guest) role. */
function logoutPatient() {
  localStorage.removeItem("token");
  localStorage.setItem("userRole", "patient");
  window.location.href = "/pages/patientDashboard.html";
}
