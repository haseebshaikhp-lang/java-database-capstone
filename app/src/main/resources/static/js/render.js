function selectRole(role) {
  localStorage.setItem("userRole", role);

  if (role === "admin") {
    window.location.href = "/adminDashboard/" + localStorage.getItem("token");
  } else if (role === "doctor") {
    window.location.href = "/doctorDashboard/" + localStorage.getItem("token");
  } else if (role === "patient") {
    window.location.href = "/pages/patientDashboard.html";
  }
}

function renderContent() {
  const role = localStorage.getItem("userRole");

  if (typeof renderHeader === "function") renderHeader();
  if (typeof renderFooter === "function") renderFooter();

  if (role === "loggedPatient") {
    // logged-in patient specific rendering can go here
  }
}
