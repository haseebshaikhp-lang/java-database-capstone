# Smart Clinic Management System - schema_design.md

## Overview

The Smart Clinic Management System uses two databases:

- *MySQL* for structured relational data.
- *MongoDB* for prescription documents.

This hybrid database architecture allows the application to efficiently manage both relational and document-based data.

---

# MySQL Database Tables

## Admin

| Field | Type | Constraint |
|-------|------|------------|
| adminId | INT | Primary Key, Auto Increment |
| username | VARCHAR(100) | NOT NULL |
| password | VARCHAR(255) | NOT NULL |
| role | VARCHAR(20) | NOT NULL |

---

## Doctor

| Field | Type | Constraint |
|-------|------|------------|
| doctorId | INT | Primary Key, Auto Increment |
| name | VARCHAR(100) | NOT NULL |
| specialization | VARCHAR(100) | NOT NULL |
| email | VARCHAR(100) | UNIQUE |
| phone | VARCHAR(20) | NOT NULL |

---

## Patient

| Field | Type | Constraint |
|-------|------|------------|
| patientId | INT | Primary Key, Auto Increment |
| name | VARCHAR(100) | NOT NULL |
| age | INT | NOT NULL |
| gender | VARCHAR(10) | NOT NULL |
| phone | VARCHAR(20) | NOT NULL |
| email | VARCHAR(100) | UNIQUE |

---

## Appointment

| Field | Type | Constraint |
|-------|------|------------|
| appointmentId | INT | Primary Key, Auto Increment |
| doctorId | INT | Foreign Key |
| patientId | INT | Foreign Key |
| appointmentDate | DATE | NOT NULL |
| appointmentTime | TIME | NOT NULL |
| status | VARCHAR(30) | NOT NULL |

---

# MongoDB Collection

## Prescription

| Field | Type |
|-------|------|
| prescriptionId | ObjectId |
| appointmentId | Integer |
| doctorId | Integer |
| patientId | Integer |
| medicines | Array |
| notes | String |
| createdDate | Date |

### Example Document

```json
{
  "_id": "ObjectId('64abc123456')",
  "appointmentId": 51,
  "doctorId": 4,
  "patientId": 12,
  "medicines": [
    { "name": "Paracetamol", "dosage": "500mg", "frequency": "Every 6 hours" }
  ],
  "notes": "Take with food.",
  "createdDate": "2026-07-23"
}

# Entity Relationships

- One Admin manages many Doctors.
- One Admin manages many Patients.
- One Doctor can have many Appointments.
- One Patient can have many Appointments.
- One Appointment belongs to one Doctor.
- One Appointment belongs to one Patient.
- One Appointment can have one Prescription.
- One Doctor can create many Prescriptions.

---

# Database Architecture

Presentation Layer

↓

Controller Layer

↓

Service Layer

↓

Repository Layer

↓

MySQL Database

↓

MongoDB Database

---

# Primary Keys

- adminId
- doctorId
- patientId
- appointmentId
- prescriptionId

---

# Foreign Keys

- doctorId → Doctor
- patientId → Patient

---

# Advantages of the Design

- Uses MySQL for structured transactional data.
- Uses MongoDB for flexible prescription records.
- Supports scalability.
- Reduces data redundancy.
- Improves maintainability.
- Follows normalization principles.

---

# Conclusion

The Smart Clinic Management System uses a hybrid database architecture combining MySQL and MongoDB. MySQL stores structured clinic data such as doctors, patients, and appointments, while MongoDB stores prescription documents. This design provides high performance, flexibility, and scalability for the application.
