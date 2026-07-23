Section 1: Architecture summary

This Spring Boot application uses both MVC and REST controllers. Thymeleaf templates are used for the Admin and Doctor dashboards, while REST APIs serve all other modules. The application interacts with two databases—MySQL (for patient, doctor, appointment, and admin data) and MongoDB (for prescriptions). All controllers route requests through a common service layer, which in turn delegates to the appropriate repositories. MySQL uses JPA entities while MongoDB uses document models.

Section 2: Numbered flow of data and control
1. User accesses AdminDashboard or Appointment pages.
2. The action is routed to the appropriate Thymeleaf or REST controller.
3. The controller calls the service layer to apply business logic and validation.
4. The service layer calls the appropriate repository — MySQL (JPA) or MongoDB — depending on the data type.
5. The repository communicates with the database engine to fetch or persist data.
6. Retrieved data is bound into Java model classes — JPA @Entity for MySQL, @Document for MongoDB.
7. The models are returned to the controller: rendered as HTML via Thymeleaf for MVC flows, or serialized to JSON for REST flows.
