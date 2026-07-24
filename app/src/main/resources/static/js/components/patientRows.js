cat > /home/project/capstone/app/src/main/resources/static/js/components/patientRows.js << 'EOF'
// patientRows.js - builds a <tr> for the doctor dashboard's patient table

export function createPatientRow(patient, appointmentId, doctorId) {
  const row = document.createElement("tr");
  row.setAttribute("data-appointment-id", appointmentId);

  row.innerHTML = `
    <td>${patient.id}</td>
    <td>${patient.name}</td>
    <td>${patient.phone}</td>
    <td>${patient.email}</td>
    <td>
      <button class="prescription-btn" onclick="openPrescriptionModal('${patient.id}', '${appointmentId}', '${doctorId}')">
        <img src="/assets/images/addPrescriptionIcon/addPrescription.png" alt="Add prescription" />
      </button>
    </td>`;

  return row;
}

/** Renders a "no records" placeholder row when a patient table has no data. */
export function renderNoPatientRecord(tableBody, colSpan) {
  tableBody.innerHTML = <tr><td class="noPatientRecord" colspan="${colSpan}">No patient records found.</td></tr>;
}

// Bridges the prescription button click to the addPrescription page,
// carrying the relevant IDs as query params.
window.openPrescriptionModal = function (patientId, appointmentId, doctorId) {
  window.location.href = /pages/addPrescription.html?patientId=${patientId}&appointmentId=${appointmentId}&doctorId=${doctorId};
};
EOF
echo done
