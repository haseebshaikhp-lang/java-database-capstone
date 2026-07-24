// util.js - shared helper functions used across pages

/** Returns the stored auth token, or null if not present. */
function getToken() {
  return localStorage.getItem("token");
}

/** Stores the auth token and user role together after login. */
function setSession(token, role) {
  localStorage.setItem("token", token);
  localStorage.setItem("userRole", role);
}

/** Clears the session (used by logout). */
function clearSession() {
  localStorage.removeItem("token");
  localStorage.removeItem("userRole");
}

/** Formats an ISO date string as "Jan 5, 2026". */
function formatDate(isoString) {
  if (!isoString) return "";
  const date = new Date(isoString);
  return date.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" });
}

/** Simple alert wrapper so alert styling/logic lives in one place. */
function showAlert(message) {
  alert(message);
}

/** Opens the shared modal and injects the given HTML into #modal-body. */
function openModal(type) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  if (!modal || !modalBody) return;

  if (typeof window.getModalContent === "function") {
    modalBody.innerHTML = window.getModalContent(type);
  }
  modal.classList.add("active");
}

/** Closes the shared modal. */
function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.remove("active");
}

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
});
}
