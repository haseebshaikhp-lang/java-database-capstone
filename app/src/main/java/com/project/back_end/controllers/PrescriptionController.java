package com.project.back_end.controllers;

import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;

import com.project.back_end.models.Prescription;
import com.project.back_end.services.PrescriptionService;
import com.project.back_end.services.Service;

@RestController
@RequestMapping("${api.path}prescription")
public class PrescriptionController {

    @Autowired
    private PrescriptionService prescriptionService;

    @Autowired
    private Service service;

    @PostMapping("/{token}")
    public ResponseEntity<?> savePrescription(
            @PathVariable String token,
            @RequestBody Prescription prescription) {

        if (!service.validateToken(token, "doctor"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Token"));

        return prescriptionService.savePrescription(prescription);
    }

    @GetMapping("/{appointmentId}/{token}")
    public ResponseEntity<?> getPrescription(
            @PathVariable Long appointmentId,
            @PathVariable String token) {

        if (!service.validateToken(token, "doctor"))
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                    .body(Map.of("message", "Invalid Token"));

        return prescriptionService.getPrescription(appointmentId);
    }
}
