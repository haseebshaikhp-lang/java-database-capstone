// patientServices.js - handles patient-related API communication

import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = ${API_BASE_URL}/patients;

export async function getPatientData(token) {
  const response = await fetch(${PATIENT_API}/me, {
    headers: { Authorization: Bearer ${token} }
  });
  if (!response.ok) throw new Error("Failed to fetch patient data");
  return response.json();
}

export async function patientLogin(email, password) {
  const response = await fetch(${PATIENT_API}/login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  });
  if (!response.ok) throw new Error("Login failed");
  return response.json();
}

export async function patientSignup(signupData) {
  const response = await fetch(${PATIENT_API}/signup, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(signupData)
  });
  if (!response.ok) throw new Error("Signup failed");
  return response.json();
}
