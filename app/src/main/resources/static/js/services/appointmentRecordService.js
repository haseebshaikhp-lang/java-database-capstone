import { API_BASE_URL } from "../config/config.js";

const APPOINTMENT_API = API_BASE_URL + "/appointments";

export async function getAllAppointments(date, patientName, token) {
  try {
    const name = patientName || "null";
    const response = await fetch(${APPOINTMENT_API}/${date}/${name}/${token});
    if (!response.ok) return [];
    const data = await response.json();
    return data.appointments || data || [];
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return [];
  }
}

export async function bookAppointment(appointment, token) {
  try {
    const response = await fetch(${APPOINTMENT_API}/${token}, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointment),
    });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch (error) {
    console.error("Error booking appointment:", error);
    return { success: false, message: "Failed to book appointment" };
  }
}
