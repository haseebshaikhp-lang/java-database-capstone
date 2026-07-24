// appointmentRecordService.js - handles appointment-related API communication

import { API_BASE_URL } from "../config/config.js";

const APPOINTMENT_API = ${API_BASE_URL}/appointments;

export async function getAppointments(token, date) {
  const query = date ? ?date=${date} : "";
  const response = await fetch(${APPOINTMENT_API}${query}, {
    headers: { Authorization: Bearer ${token} }
  });
  if (!response.ok) throw new Error("Failed to fetch appointments");
  return response.json();
}

export async function bookAppointment(appointmentData, token) {
  const response = await fetch(APPOINTMENT_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Bearer ${token}
    },
    body: JSON.stringify(appointmentData)
  });
  if (!response.ok) throw new Error("Failed to book appointment");
  return response.json();
}

export async function updateAppointment(appointmentId, updates, token) {
  const response = await fetch(${APPOINTMENT_API}/${appointmentId}, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: Bearer ${token}
    },
    body: JSON.stringify(updates)
  });
  if (!response.ok) throw new Error("Failed to update appointment");
  return response.json();
}
