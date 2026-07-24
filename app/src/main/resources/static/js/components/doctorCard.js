// doctorCard.js - builds a reusable card element for a single doctor

import { deleteDoctor } from "../services/doctorServices.js";
import { getPatientData } from "../services/patientServices.js";

export function createDoctorCard(doctor) {
  const card = document.createElement("div");
  card.classList.add("doctor-card");

  const role = localStorage.getItem("userRole");

  // ---- Info section ----
  const infoDiv = document.createElement("div");
  infoDiv.classList.add("doctor-info");

  const name = document.createElement("h3");
  name.textContent = doctor.name;

  const specialization = document.createElement("p");
  specialization.textContent = Specialty: ${doctor.specialty};

  const email = document.createElement("p");
  email.textContent = Email: ${doctor.email};

  const availability = document.createElement("p");
  availability.textContent = Available: ${(doctor.availableTimes || []).join(", ")};

  infoDiv.appendChild(name);
  infoDiv.appendChild(specialization);
  infoDiv.appendChild(email);
  infoDiv.appendChild(availability);

  // ---- Actions section ----
  const actionsDiv = document.createElement("div");
  actionsDiv.classList.add("card-actions");

  if (role === "admin") {
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Delete";
    removeBtn.classList.add("dashboard-btn");

    removeBtn.addEventListener("click", async () => {
      const confirmed = confirm(Delete Dr. ${doctor.name}? This cannot be undone.);
      if (!confirmed) return;

      const token = localStorage.getItem("token");
      try {
        await deleteDoctor(doctor.id, token);
        card.remove();
      } catch (err) {
        showAlert("Failed to delete doctor. Please try again.");
      }
    });

    actionsDiv.appendChild(removeBtn);

  } else if (role === "patient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("dashboard-btn");

    bookNow.addEventListener("click", () => {
      showAlert("Patient needs to login first.");
    });

    actionsDiv.appendChild(bookNow);

  } else if (role === "loggedPatient") {
    const bookNow = document.createElement("button");
    bookNow.textContent = "Book Now";
    bookNow.classList.add("dashboard-btn");

    bookNow.addEventListener("click", async (e) => {
      const token = localStorage.getItem("token");
      try {
        const patientData = await getPatientData(token);
        if (typeof window.showBookingOverlay === "function") {
          window.showBookingOverlay(e, doctor, patientData);
        }
      } catch (err) {
        showAlert("Unable to load your patient data. Please try again.");
      }
    });

    actionsDiv.appendChild(bookNow);
  }

  card.appendChild(infoDiv);
  card.appendChild(actionsDiv);

  return card;
}
