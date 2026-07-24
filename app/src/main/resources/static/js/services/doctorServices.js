// doctorServices.js - handles all doctor-related API communication

import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = ${API_BASE_URL}/doctors;

export async function getAllDoctors() {
  const response = await fetch(DOCTOR_API);
  if (!response.ok) throw new Error("Failed to fetch doctors");
  return response.json();
}

export async function filterDoctors(name, time, specialty) {
  const params = new URLSearchParams();
  if (name) params.append("name", name);
  if (time) params.append("time", time);
  if (specialty) params.append("specialty", specialty);

  const response = await fetch(${DOCTOR_API}/filter?${params.toString()});
  if (!response.ok) throw new Error("Failed to filter doctors");
  return response.json();
}

export async function addDoctor(doctorData, token) {
  const response = await fetch(DOCTOR_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Bearer ${token}
    },
    body: JSON.stringify(doctorData)
  });
  if (!response.ok) throw new Error("Failed to add doctor");
  return response.json();
}

export async function deleteDoctor(doctorId, token) {
  const response = await fetch(${DOCTOR_API}/${doctorId}, {
    method: "DELETE",
    headers: { Authorization: Bearer ${token} }
  });
  if (!response.ok) throw new Error("Failed to delete doctor");
  return response.json();
}
