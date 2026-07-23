package com.project.back_end.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.project.back_end.models.Patient;
import com.project.back_end.services.PatientService;
import com.project.back_end.services.Service;
import com.project.back_end.DTO.Login;

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
