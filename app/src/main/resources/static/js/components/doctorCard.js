/*
  Function to create a doctor card element
  ------------------------------------------
  Builds a card displaying a doctor's info (name, specialty, email,
  available times) and shows different actions depending on the
  logged-in user's role:
    - admin        -> Delete Doctor button
    - patient      -> "Login to Book" prompt (redirects to login)
    - loggedPatient -> Book Appointment button
*/

function createDoctorCard(doctor) {
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  const role = localStorage.getItem("userRole");

  // Info section
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;

  const specialty = document.createElement("p");
  specialty.textContent = Specialty: ${doctor.specialty};

  const email = document.createElement("p");
  email.textContent = Email: ${doctor.email};

  const availability = document.createElement("p");
  availability.textContent = `Available: ${
    Array.isArray(doctor.availableTimes)
      ? doctor.availableTimes.join(", ")
      : doctor.availableTimes
  }`;

  infoDiv.appendChild(name);
  infoDiv.appendChild(specialty);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  // Actions section
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete Doctor";
    removeBtn.classList.add("adminBtn");
    removeBtn.addEventListener("click", () => {
      deleteDoctor(doctor.id, card);
    });
    actionsDiv.appendChild(removeBtn);

  } else if (role === "loggedPatient") {
    const bookBtn = document.createElement("button");
    bookBtn.textContent = "Book Appointment";
    bookBtn.classList.add("adminBtn");
    bookBtn.addEventListener("click", () => {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please log in again to book an appointment.");
        window.location.href = "/";
        return;
      }
      showBookingOverlay(doctor);
    });
    actionsDiv.appendChild(bookBtn);

  } else {
    // patient (not logged in) or guest
    const loginBtn = document.createElement("button");
    loginBtn.textContent = "Login to Book";
    loginBtn.classList.add("adminBtn");
    loginBtn.addEventListener("click", () => {
      openModal("patientLogin");
    });
    actionsDiv.appendChild(loginBtn);
  }

  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  return card;
}

/*
  Deletes a doctor via the backend API and removes the card from the DOM.
*/
function deleteDoctor(doctorId, cardElement) {
  const token = localStorage.getItem("token");

  if (!confirm("Are you sure you want to delete this doctor?")) {
    return;
  }

  fetch(/doctor/${doctorId}/${token}, {
    method: "DELETE",
  })
    .then((response) => response.json())
    .then((data) => {
      if (data.success) {
        cardElement.remove();
      } else {
        alert(data.message || "Failed to delete doctor.");
      }
    })
    .catch((error) => {
      console.error("Error deleting doctor:", error);
      alert("An error occurred while deleting the doctor.");
    });
}
