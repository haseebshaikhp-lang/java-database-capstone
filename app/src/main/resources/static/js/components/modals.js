// modals.js - builds the HTML injected into #modal-body for each modal type,
// plus the bottom sliding "booking" overlay used on the patient dashboard.

window.getModalContent = function (type) {
  switch (type) {
    case "addDoctor":
      return `
        <h2>Add Doctor</h2>
        <form id="addDoctorForm">
          <input class="input-field" type="text" id="docName" placeholder="Full name" required />
          <input class="input-field" type="text" id="docSpecialty" placeholder="Specialty" required />
          <input class="input-field" type="email" id="docEmail" placeholder="Email" required />
          <input class="input-field" type="password" id="docPassword" placeholder="Temporary password" required />
          <input class="input-field" type="text" id="docPhone" placeholder="Phone number" required />
          <button type="submit" class="dashboard-btn">Save Doctor</button>
        </form>`;

    case "patientLogin":
      return `
        <h2>Patient Login</h2>
        <form id="patientLoginForm">
          <input class="input-field" type="email" id="loginEmail" placeholder="Email" required />
          <input class="input-field" type="password" id="loginPassword" placeholder="Password" required />
          <button type="submit" class="dashboard-btn">Login</button>
        </form>`;

    case "patientSignup":
      return `
        <h2>Patient Sign Up</h2>
        <form id="patientSignupForm">
          <input class="input-field" type="text" id="signupName" placeholder="Full name" required />
          <input class="input-field" type="email" id="signupEmail" placeholder="Email" required />
          <input class="input-field" type="password" id="signupPassword" placeholder="Password" required />
          <input class="input-field" type="text" id="signupPhone" placeholder="Phone number" required />
          <button type="submit" class="dashboard-btn">Create Account</button>
        </form>`;

    default:
      return "";
  }
};

/** Slides the booking overlay up from the bottom of the screen for a given doctor. */
window.showBookingOverlay = function (event, doctor, patientData) {
  let overlay = document.getElementById("bookingOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "bookingOverlay";
    overlay.classList.add("modalApp");
    document.body.appendChild(overlay);
  }

  overlay.innerHTML = `
    <span class="close" id="closeBooking">&times;</span>
    <h2>Book Appointment with Dr. ${doctor.name}</h2>
    <p>Patient: ${patientData?.name || "Guest"}</p>
    <input class="input-field" type="date" id="bookingDate" />
    <select class="select-dropdown" id="bookingTime">
      ${(doctor.availableTimes || []).map(t => <option value="${t}">${t}</option>).join("")}
    </select>
    <button class="dashboard-btn" id="confirmBooking">Confirm Booking</button>`;

  overlay.classList.add("active");

  document.getElementById("closeBooking").addEventListener("click", () => {
    overlay.classList.remove("active");
  });
};
