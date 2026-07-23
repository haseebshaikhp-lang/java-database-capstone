package com.project.back_end.Doctor

@RestController
@RequestMapping("${api.path}doctor")
public class DoctorController {

    @Autowired
    private DoctorService doctorService;

    @Autowired
    private Service service;

    @GetMapping("/availability/{user}/{doctorId}/{date}/{token}")
    public ResponseEntity<?> availability(
            @PathVariable String user,
            @PathVariable Long doctorId,
            @PathVariable String date,
            @PathVariable String token) {

        if (!service.validateToken(token, user))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Token"));

        return ResponseEntity.ok(
                doctorService.getDoctorAvailability(doctorId, date));
    }

    @GetMapping
    public ResponseEntity<?> getDoctors() {
        return ResponseEntity.ok(doctorService.getDoctors());
    }

    @PostMapping("/{token}")
    public ResponseEntity<?> addDoctor(
            @PathVariable String token,
            @RequestBody Doctor doctor) {

        if (!service.validateToken(token, "admin"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Token"));

        return doctorService.saveDoctor(doctor);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Login login) {
        return doctorService.validateDoctor(login);
    }

    @PutMapping("/{token}")
    public ResponseEntity<?> updateDoctor(
            @PathVariable String token,
            @RequestBody Doctor doctor) {

        if (!service.validateToken(token, "admin"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Token"));

        return doctorService.updateDoctor(doctor);
    }

    @DeleteMapping("/{id}/{token}")
    public ResponseEntity<?> deleteDoctor(
            @PathVariable Long id,
            @PathVariable String token) {

        if (!service.validateToken(token, "admin"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Token"));

        return doctorService.deleteDoctor(id);
    }

    @GetMapping("/filter/{name}/{time}/{speciality}")
    public ResponseEntity<?> filterDoctor(
            @PathVariable String name,
            @PathVariable String time,
            @PathVariable String speciality) {

        return ResponseEntity.ok(
                service.filterDoctor(name, time, speciality));
    }
}
