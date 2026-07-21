import { API_BASE_URL } from "../config/config.js";

const DOCTOR_API = API_BASE_URL + "/doctor";

// Get all doctors
export async function getDoctors() {
  try {
    const response = await fetch(DOCTOR_API);

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    return data.doctors || data;
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Delete doctor
export async function deleteDoctor(id, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${id}/${token}`,{
      method: "DELETE",
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Error deleting doctor",
    };
  }
}

// Save doctor
export async function saveDoctor(doctor, token) {
  try {
    const response = await fetch(`${DOCTOR_API}/${token}`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(doctor),
    });

    const data = await response.json();

    return {
      success: response.ok,
      message: data.message,
    };
  } catch (error) {
    console.error(error);

    return {
      success: false,
      message: "Error saving doctor",
    };
  }
}

// Filter doctors
export async function filterDoctors(name, time, specialty) {
  try {
    const response = await fetch(
      `${DOCTOR_API}/filter/${name || "null"}/${time || "null"}/${specialty || "null"}`

    );

    if (!response.ok) {
      return {
        doctors: [],
      };
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    alert("Error filtering doctors");

    return {
      doctors: [],
    };
}
}
