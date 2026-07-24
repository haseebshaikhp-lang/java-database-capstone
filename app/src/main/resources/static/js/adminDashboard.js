cat > /home/project/capstone/app/src/main/resources/static/js/adminDashboard.js << 'EOF'
// adminDashboard.js - page logic for the Admin Dashboard

import { openModal } from "./components/modals.js";
import { getDoctors, filterDoctors, saveDoctor } from "./services/doctorServices.js";
import { createDoctorCard } from "./components/doctorCard.js";

document.getElementById('addDocBtn')?.addEventListener('click', () => {
  openModal('addDoctor');
});

window.addEventListener('DOMContentLoaded', () => {
  loadDoctorCards();

  document.getElementById("searchBar")?.addEventListener("input", filterDoctorsOnChange);
  document.getElementById("filterTime")?.addEventListener("change", filterDoctorsOnChange);
  document.getElementById("filterSpecialty")?.addEventListener("change", filterDoctorsOnChange);
});

async function loadDoctorCards() {
  try {
    const doctors = await getDoctors();
    renderDoctorCards(doctors);
  } catch (error) {
    console.error('Error loading doctors:', error);
  }
}

function renderDoctorCards(doctors) {
  const contentDiv = document.getElementById("content");
  contentDiv.innerHTML = "";

  if (!doctors || doctors.length === 0) {
    contentDiv.innerHTML = "<p>No doctors found.</p>";
    return;
  }

  doctors.forEach(doctor => {
    const card = createDoctorCard(doctor);
    contentDiv.appendChild(card);
  });
}

async function filterDoctorsOnChange() {
  const name = document.getElementById("searchBar").value.trim() || null;
  const time = document.getElementById("filterTime").value || null;
  const specialty = document.getElementById("filterSpecialty").value || null;

  try {
    const doctors = await filterDoctors(name, time, specialty);
    if (doctors.length > 0) {
      renderDoctorCards(doctors);
    } else {
      document.getElementById("content").innerHTML = "<p>No doctors found.</p>";
    }
  } catch (error) {
    console.error('Error filtering doctors:', error);
    alert("Failed to filter doctors.");
  }
}

window.adminAddDoctor = async function () {
  const token = localStorage.getItem('token');
  if (!token) {
    alert('Session expired. Please log in again.');
    return;
  }

  const name = document.getElementById('docName').value;
  const specialty = document.getElementById('docSpecialty').value;
  const email = document.getElementById('docEmail').value;
  const password = document.getElementById('docPassword').value;
  const mobile = document.getElementById('docPhone').value;

  const availability = Array.from(
    document.querySelectorAll('input[name="availability"]:checked')
  ).map(cb => cb.value);

  const doctor = { name, specialty, email, password, mobile, availability };

  try {
    const result = await saveDoctor(doctor, token);
    if (result.success) {
      alert('Doctor added successfully!');
      closeModal();
      loadDoctorCards();
    } else {
      alert(result.message || 'Failed to add doctor.');
    }
  } catch (error) {
    console.error('Error adding doctor:', error);
    alert('Something went wrong while adding the doctor.');
  }
};
EOF
echo done
