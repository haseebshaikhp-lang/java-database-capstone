cat > /home/project/capstone/app/src/main/resources/static/js/components/modals.js << 'EOF'
// modals.js - builds the HTML injected into #modal-body for each modal type,
// plus the bottom sliding "booking" overlay used on the patient dashboard.

function getModalContent(type) {
  switch (type) {
    case "addDoctor":
      return `
        <h2>Add Doctor</h2>
        <form onsubmit="event.preventDefault(); adminAddDoctor();">
          <input class="input-field" type="text" id="docName" placeholder="Full name" required />
          <input class="input-field" type="text" id="docSpecialty" placeholder="Specialty" required />
          <input class="input-field" type="email" id="docEmail" placeholder="Email" required />
          <input class="input-field" type="password" id="docPassword" placeholder="Temporary password" required />
          <input class="input-field" type="text" id="docPhone" placeholder="Phone number" required />
          <div class="checkbox-group">
            <label><input type="checkbox" name="availability" value="09:00-10:00" /> 9-10 AM</label>
            <label><input type="checkbox" name="availability" value="10:00-11:00" /> 10-11 AM</label>
            <label><input type="checkbox" name="availability" value="14:00-15:00" /> 2-3 PM</label>
          </div>
          <button type="submit" class="dashboard-btn">Save Doctor</button>
        </form>`;

    case "adminLogin":
      return `
        <h2>Admin Login</h2>
        <form onsubmit="event.preventDefault(); adminLoginHandler();">
          <input class="input-field" type="text" id="username" placeholder="Username" required />
          <input class="input-field" type="password" id="password" placeholder="Password" required />
          <button type="submit" class="dashboard-btn">Login</button>
        </form>`;

    case "doctorLogin":
      return `
        <h2>Doctor Login</h2>
        <form onsubmit="event.preventDefault(); doctorLoginHandler();">
          <input class="input-field" type="email" id="doctorEmail" placeholder="Email" required />
          <input class="input-field" type="password" id="doctorPassword" placeholder="Password" required />
          <button type="submit" class="dashboard-btn">Login</button>
        </form>`;

    case "patientLogin":
      return `
        <h2>Patient Login</h2>
        <form onsubmit="event.preventDefault(); loginPatient();">
          <input class="input-field" type="email" id="loginEmail" placeholder="Email" required />
          <input class="input-field" type="password" id="loginPassword" placeholder="Password" required />
          <button type="submit" class="dashboard-btn">Login</button>
        </form>`;

    case "patientSignup":
      return `
        <h2>Patient Sign Up</h2>
        <form onsubmit="event.preventDefault(); signupPatient();">
          <input class="input-field" type="text" id="signupName" placeholder="Full name" required />
          <input class="input-field" type="email" id="signupEmail" placeholder="Email" required />
          <input class="input-field" type="password" id="signupPassword" placeholder="Password" required />
          <input class="input-field" type="text" id="signupPhone" placeholder="Phone number" required />
          <input class="input-field" type="text" id="signupAddress" placeholder="Address" required />
          <button type="submit" class="dashboard-btn">Create Account</button>
        </form>`;

    default:
      return "";
  }
}

/** Opens the shared modal and injects the content for the given type. */
export function openModal(type) {
  const modal = document.getElementById("modal");
  const modalBody = document.getElementById("modal-body");
  if (!modal || !modalBody) return;

  modalBody.innerHTML = getModalContent(type);
  modal.classList.add("active");
}

/** Closes the shared modal. */
export function closeModal() {
  const modal = document.getElementById("modal");
  if (modal) modal.classList.remove("active");
}

// Also expose on window so non-module scripts (e.g. header.js, doctorCard.js,
// and inline onclick="openModal(...)" attributes) can still call these.
window.openModal = openModal;
window.closeModal = closeModal;

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = document.getElementById("closeModal");
  if (closeBtn) closeBtn.addEventListener("click", closeModal);
});

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
      ${(doctor.availability || []).map(t => <option value="${t}">${t}</option>).join("")}
    </select>
    <button class="dashboard-btn" id="confirmBooking">Confirm Booking</button>`;

  overlay.classList.add("active");

  document.getElementById("closeBooking").addEventListener("click", () => {
    overlay.classList.remove("active");
  });
};
EOF
echo done
