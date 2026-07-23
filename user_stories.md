# Smart Clinic Management System - User Stories

## User Story 1 - Template

### Story Title
[Enter Story Title]

### As a
[User Role]

### I want
[Feature or Functionality]

### So that
[Business Value]

#### Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

#### Notes
- Additional notes if required.

---

## Admin User Stories

### Story Title
Manage Doctors

### As an
Admin

### I want
to add, update, delete, and view doctor records

### So that
I can efficiently manage doctors in the Smart Clinic Management System.

#### Acceptance Criteria
- [ ] Admin can add a new doctor.
- [ ] Admin can update doctor information.
- [ ] Admin can delete a doctor.
- [ ] Admin can view all registered doctors.

#### Notes
- Only authenticated administrators can perform these operations.

---

### Story Title
Admin Login

### As an
Admin

### I want
to log into the portal with my username and password

### So that
I can securely manage the platform.

#### Acceptance Criteria
- [ ] Admin can enter valid credentials to log in.
- [ ] Invalid credentials show an error message.
- [ ] Successful login redirects to the Admin Dashboard.

#### Notes
- Passwords must be stored securely (hashed, not plain text).

---

### Story Title
Admin Logout

### As an
Admin

### I want
to log out of the portal

### So that
I can protect system access when I'm done working.

#### Acceptance Criteria
- [ ] Admin can click a logout button from any authenticated page.
- [ ] Logout ends the current session immediately.
- [ ] Admin is redirected to the login page after logout.

#### Notes
- Session tokens should be invalidated server-side on logout.

---

### Story Title
Delete Doctor Profile

### As an
Admin

### I want
to delete a doctor's profile from the portal

### So that
I can keep the doctor directory accurate and up to date.

#### Acceptance Criteria
- [ ] Admin can select a doctor to delete.
- [ ] System asks for confirmation before deletion.
- [ ] Deleted doctor no longer appears in doctor listings.

#### Notes
- Consider how existing appointments for a deleted doctor should be handled.

---

### Story Title
Track Appointment Statistics

### As an
Admin

### I want
to run a stored procedure in the MySQL CLI to get the number of appointments per month

### So that
I can track platform usage over time.

#### Acceptance Criteria
- [ ] A stored procedure exists that returns appointment counts grouped by month.
- [ ] Admin can execute the procedure via the MySQL CLI.
- [ ] Output is accurate and reflects current appointment data.

#### Notes
- Useful for generating usage reports and identifying trends.

---

## Patient User Stories

### Story Title
Book an Appointment

### As a
Patient

### I want
to book an appointment with a doctor

### So that
I can receive medical consultation at my preferred date and time.

#### Acceptance Criteria
- [ ] Patient can view available doctors.
- [ ] Patient can select a doctor.
- [ ] Patient can book an available appointment.
- [ ] Patient receives confirmation after booking.

#### Notes
- Appointment time must be available before confirmation.

---

### Story Title
Browse Doctors Without Logging In

### As a
Patient

### I want
to view a list of doctors without logging in

### So that
I can explore my options before deciding to register.

#### Acceptance Criteria
- [ ] Doctor list is publicly viewable without authentication.
- [ ] List shows doctor name, specialization, and availability status.
- [ ] Booking an appointment still requires login.

#### Notes
- Helps reduce friction for prospective patients.

---

### Story Title
Patient Sign Up

### As a
Patient

### I want
to sign up using my email and password

### So that
I can create an account and book appointments.

#### Acceptance Criteria
- [ ] Patient can register with a valid email and password.
- [ ] System validates email format and password strength.
- [ ] Duplicate email registrations are rejected.

#### Notes
- Consider email verification for account security.

---

### Story Title
Patient Login and Logout

### As a
Patient

### I want
to log into and out of the portal

### So that
I can securely manage my bookings and protect my account.

#### Acceptance Criteria
- [ ] Patient can log in with valid credentials.
- [ ] Patient can log out from any authenticated page.
- [ ] Invalid login attempts show an appropriate error.

#### Notes
- Session should expire after logout or inactivity.

---

### Story Title
View Upcoming Appointments

### As a
Patient

### I want
to view my upcoming appointments

### So that
I can prepare accordingly for my visits.

#### Acceptance Criteria
- [ ] Patient can see a list of all upcoming appointments.
- [ ] Each entry shows doctor name, date, and time.
- [ ] Past appointments are not shown in the upcoming list.

#### Notes
- Consider adding reminders/notifications in a future iteration.

---

## Doctor User Stories

### Story Title
Manage Patient Appointments

### As a
Doctor

### I want
to view my appointments and update patient prescriptions

### So that
I can provide proper treatment and maintain patient medical records.

#### Acceptance Criteria
- [ ] Doctor can view assigned appointments.
- [ ] Doctor can access patient details.
- [ ] Doctor can add or update prescriptions.
- [ ] Doctor can mark appointments as completed.

#### Notes
- Only authenticated doctors can access their assigned appointments.

---

### Story Title
Doctor Login and Logout

### As a
Doctor

### I want
to log into and out of the portal

### So that
I can manage my appointments and protect my data.

#### Acceptance Criteria
- [ ] Doctor can log in with valid credentials.
- [ ] Doctor can log out from any authenticated page.
- [ ] Unauthorized access to doctor-only pages is blocked.

#### Notes
- Doctor accounts should only be created/managed by an Admin.

---

### Story Title
View Appointment Calendar

### As a
Doctor

### I want
to view my appointment calendar

### So that
I can stay organized and plan my schedule.

#### Acceptance Criteria
- [ ] Doctor can view appointments in a calendar or list format.
- [ ] Calendar reflects real-time appointment data.
- [ ] Doctor can filter by day, week, or month.

#### Notes
- A calendar view improves usability over a flat list for busy schedules.

---

### Story Title
Mark Unavailability

### As a
Doctor

### I want
to mark my unavailability

### So that
patients only see the time slots I'm actually available for.

#### Acceptance Criteria
- [ ] Doctor can block off specific dates/times as unavailable.
- [ ] Blocked slots do not appear as bookable to patients.
- [ ] Doctor can update or remove unavailability entries.

#### Notes
- Prevents double-booking and scheduling conflicts.

---

### Story Title
Update Doctor Profile

### As a
Doctor

### I want
to update my profile with specialization and contact information

### So that
patients have accurate and up-to-date information about me.

#### Acceptance Criteria
- [ ] Doctor can edit specialization, contact info, and bio.
- [ ] Changes are saved and reflected immediately on the public profile.
- [ ] Required fields cannot be left blank.

#### Notes
- Consider validation for phone number and email formats.
-
