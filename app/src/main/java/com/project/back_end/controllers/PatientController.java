package com.project.back_end.controllers;

@RestController
@RequestMapping("/patient")
public class PatientController {

    @Autowired
    private PatientService patientService;

    @Autowired
    private Service service;

    @GetMapping("/{token}")
    public ResponseEntity<?> getPatient(@PathVariable String token) {

        if (!service.validateToken(token, "patient"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Token"));

        return patientService.getPatientDetails(token);
    }

    @PostMapping
    public ResponseEntity<?> createPatient(@RequestBody Patient patient) {
        return patientService.createPatient(patient);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login) {
        return service.validatePatientLogin(login);
    }

    @GetMapping("/{id}/{token}")
    public ResponseEntity<?> appointments(
            @PathVariable Long id,
            @PathVariable String token) {

        if (!service.validateToken(token, "patient"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Token"));

        return patientService.getPatientAppointment(id);
    }

    @GetMapping("/filter/{condition}/{name}/{token}")
    public ResponseEntity<?> filter(
            @PathVariable String condition,
            @PathVariable String name,
            @PathVariable String token) {

        if (!service.validateToken(token, "patient"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Token"));

        return ResponseEntity.ok(
                service.filterPatient(condition, name));
    }
}
