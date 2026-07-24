import { API_BASE_URL } from "../config/config.js";

const PATIENT_API = API_BASE_URL + "/patient";

export async function patientSignup(data) {
  try {
    const response = await fetch(PATIENT_API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    const result = await response.json();
    return { success: response.ok, message: result.message };
  } catch (error) {
    console.error("Signup error:", error);
    return { success: false, message: "Error during signup" };
  }
}

export async function patientLogin(data) {
  console.log("Attempting login with:", data);
  return await fetch(${PATIENT_API}/login, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
}

export async function getPatientData(token) {
  try {
    const response = await fetch(${PATIENT_API}/${token});
    if (!response.ok) return null;
    const data = await response.json();
    return data.patient || data;
  } catch (error) {
    console.error("Error fetching patient data:", error);
    return null;
  }
}

export async function getPatientAppointments(id, token, user) {
  try {
    const url = user === "doctor"
      ? ${PATIENT_API}/${id}/${token}
      : ${PATIENT_API}/${id}/${token};
    const response = await fetch(url);
    if (!response.ok) return null;
    const data = await response.json();
    return data.appointments || data;
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return null;
  }
}

export async function filterAppointments(condition, name, token) {
  try {
    const c = condition || "null";
    const n = name || "null";
    const response = await fetch(${PATIENT_API}/filter/${c}/${n}/${token});
    if (!response.ok) {
      console.error("Failed to filter appointments");
      return [];
    }
    const data = await response.json();
    return data.appointments || data || [];
  } catch (error) {
    console.error("Error filtering appointments:", error);
    alert("Something went wrong filtering appointments!");
    return [];
  }
}
