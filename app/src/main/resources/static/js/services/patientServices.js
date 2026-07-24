cat > /home/project/capstone/app/src/main/resources/static/js/services/patientServices.js << 'EOF'
// patientServices.js - handles all patient-related API communication

import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = API_BASE_URL + '/patient';

// Patient signup
export async function patientSignup(data) {
  try {
    const response = await fetch(${PATIENT_API}/signup, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });
    const result = await response.json();
    return { success: response.ok, message: result.message };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, message: 'Signup failed. Please try again.' };
  }
}

// Patient login - returns the raw response so caller can inspect status/token
export async function patientLogin(data) {
  return await fetch(${PATIENT_API}/login, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data)
  });
}

// Fetch logged-in patient's data
export async function getPatientData(token) {
  try {
    const response = await fetch(${PATIENT_API}/${token});
    if (!response.ok) return null;
    const data = await response.json();
    return data.patient || null;
  } catch (error) {
    console.error('Error fetching patient data:', error);
    return null;
  }
}

// Fetch appointments - shared between doctor and patient dashboards
export async function getPatientAppointments(id, token, user) {
  try {
    const response = await fetch(${PATIENT_API}/${id}/${user}/${token});
    if (!response.ok) return null;
    const data = await response.json();
    return data.appointments || null;
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return null;
  }
}

// Filter appointments by condition and patient name
export async function filterAppointments(condition, name, token) {
  try {
    const response = await fetch(
      ${PATIENT_API}/filter/${condition || "null"}/${name || "null"}/${token}
    );
    if (response.ok) {
      const data = await response.json();
      return data.appointments || [];
    }
    console.error('Failed to filter appointments. Status:', response.status);
    return [];
  } catch (error) {
    alert('Something went wrong while filtering appointments.');
    console.error('Error filtering appointments:', error);
    return [];
  }
}
EOF
echo done
