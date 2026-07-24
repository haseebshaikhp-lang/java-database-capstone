import { openModal } from "../components/modals.js";
import { API_BASE_URL } from "../config/config.js";

const ADMIN_API = API_BASE_URL + '/admin';
const DOCTOR_API = API_BASE_URL + '/doctor/login';

// Called by the role-selection buttons (Admin / Doctor / Patient)
window.selectRole = function (role) {
  if (role === 'admin') {
    openModal('adminLogin');
  } else if (role === 'doctor') {
    openModal('doctorLogin');
  } else if (role === 'patient') {
    window.location.href = '/pages/patientDashboard.html';
  }
};

window.onload = function () {
  const adminBtn = document.getElementById('adminLogin');
  if (adminBtn) {
    adminBtn.addEventListener('click', () => {
      openModal('adminLogin');
    });
  }

  const doctorBtn = document.getElementById('doctorLogin');
  if (doctorBtn) {
    doctorBtn.addEventListener('click', () => {
      openModal('doctorLogin');
    });
  }
};

window.adminLoginHandler = async function () {
  try {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    const admin = { username, password };

    const response = await fetch(ADMIN_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(admin)
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = /adminDashboard/${data.token};
    } else {
      alert('Invalid credentials!');
    }
  } catch (error) {
    alert('Something went wrong. Please try again later.');
    console.error('Admin login error:', error);
  }
};

window.doctorLoginHandler = async function () {
  try {
    const email = document.getElementById('doctorEmail').value;
    const password = document.getElementById('doctorPassword').value;

    const doctor = { email, password };

    const response = await fetch(DOCTOR_API, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(doctor)
    });

    if (response.ok) {
      const data = await response.json();
      localStorage.setItem('token', data.token);
      window.location.href = /doctorDashboard/${data.token};
    } else {
      alert('Invalid credentials!');
    }
  } catch (error) {
    alert('Something went wrong. Please try again later.');
    console.error('Doctor login error:', error);
  }
};
