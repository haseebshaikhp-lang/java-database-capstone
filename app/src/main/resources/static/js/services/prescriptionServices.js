// prescriptionServices.js - handles prescription-related API communication

import { API_BASE_URL } from "../config/config.js";

const PRESCRIPTION_API = ${API_BASE_URL}/prescriptions;

export async function addPrescription(prescriptionData, token) {
  const response = await fetch(PRESCRIPTION_API, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: Bearer ${token}
    },
    body: JSON.stringify(prescriptionData)
  });
  if (!response.ok) throw new Error("Failed to add prescription");
  return response.json();
}

export async function getPrescriptionsForPatient(patientId, token) {
  const response = await fetch(${PRESCRIPTION_API}/patient/${patientId}, {
    headers: { Authorization: Bearer ${token} }
  });
  if (!response.ok) throw new Error("Failed to fetch prescriptions");
  return response.json();
}
