function getToken() {
  return localStorage.getItem("token");
}

function getRole() {
  return localStorage.getItem("userRole");
}

function formatDate(dateStr) {
  const date = new Date(dateStr);
  return date.toLocaleDateString();
}

function showAlert(message) {
  alert(message);
}
