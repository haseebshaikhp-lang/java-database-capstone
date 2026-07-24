// patientRows.js - builds a <tr> for the doctor dashboard's patient table

function createPatientRow(patient) {
  const row = document.createElement("tr");
  row.innerHTML = `
    <td>${patient.id}</td>
    <td>${patient.name}</td>
    <td>${patient.phone}</td>
    <td>${patient.email}</td>
    <td>
      <button class="prescription-btn" onclick="openModal('addPrescription')" data-patient-id="${patient.id}">
        <img src="/assets/images/addPrescriptionIcon/addPrescription.png" alt="Add prescription" />
      </button>
    </td>`;
  return row;
}

/** Renders "no records" placeholder row when a patient table has no data. */
function renderNoPatientRecord(tableBody, colSpan) {
  tableBody.innerHTML = <tr><td class="noPatientRecord" colspan="${colSpan}">No patient records found.</td></tr>;
}
