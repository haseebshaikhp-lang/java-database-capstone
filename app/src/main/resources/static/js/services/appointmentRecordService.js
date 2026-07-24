cat > /home/project/capstone/app/src/main/resources/static/js/services/appointmentRecordService.js << 'EOF'
// appointmentRecordService.js - handles appointment-related API communication

import { API_BASE_URL } from "../config/config.js";

const APPOINTMENT_API = API_BASE_URL + '/appointments';

/**
 * Fetches appointments for a doctor, filtered by date and (optionally) patient name.
 * Used by doctorDashboard.js.
 */
export async function getAllAppointments(date, patientName, token) {
  try {
    const response = await fetch(
      ${APPOINTMENT_API}/${date}/${patientName || "null"}/${token}
    );
    if (!response.ok) {
      console.error('Failed to fetch appointments. Status:', response.status);
      return [];
    }
    const data = await response.json();
    return data.appointments || [];
  } catch (error) {
    console.error('Error fetching appointments:', error);
    return [];
  }
}

export async function bookAppointment(appointmentData, token) {
  try {
    const response = await fetch(${APPOINTMENT_API}/${token}, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData)
    });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch (error) {
    console.error('Error booking appointment:', error);
    return { success: false, message: 'Failed to book appointment.' };
  }
}

export async function updateAppointment(appointmentData, token) {
  try {
    const response = await fetch(${APPOINTMENT_API}/${token}, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(appointmentData)
    });
    const data = await response.json();
    return { success: response.ok, message: data.message };
  } catch (error) {
    console.error('Error updating appointment:', error);
    return { success: false, message: 'Failed to update appointment.' };
  }
}
EOF
echo done
