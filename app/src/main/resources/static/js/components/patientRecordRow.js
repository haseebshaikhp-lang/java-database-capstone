// patientRecordRow.js - builds a single <tr> for a patient's record/prescription history

export function createPatientRecordRow(record) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${formatDate(record.date)}</td>
    <td>${record.doctorName}</td>
    <td>${record.medication}</td>
    <td>${record.dosage}</td>
    <td>${record.notes || ""}</td>`;
  return row;
}
