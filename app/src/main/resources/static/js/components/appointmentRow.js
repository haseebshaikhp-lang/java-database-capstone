// appointmentRow.js - builds a single <tr> for the appointments table

export function createAppointmentRow(appointment) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${appointment.id}</td>
    <td>${appointment.patientName}</td>
    <td>${formatDate(appointment.date)}</td>
    <td>${appointment.time}</td>
    <td>${appointment.status}</td>
    <td>
      <button class="dashboard-btn" onclick="editAppointment('${appointment.id}')">Edit</button>
    </td>`;
  return row;
}
