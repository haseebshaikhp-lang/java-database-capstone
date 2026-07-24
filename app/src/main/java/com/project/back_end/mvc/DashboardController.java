package com.project.back_end.controllers;

import com.project.back_end.services.TokenValidationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Map;

@Controller
public class DashboardController {

    @Autowired
    private TokenValidationService tokenValidationService;

    @GetMapping("/adminDashboard/{token}")
    public String adminDashboard(@PathVariable String token) {
        Map<String, String> validationResult = tokenValidationService.validateToken(token, "admin");

        if (validationResult.isEmpty()) {
            return "admin/adminDashboard";
        } else {
            return "redirect:http://localhost:8080";
        }
    }

    @GetMapping("/doctorDashboard/{token}")
    public String doctorDashboard(@PathVariable String token) {
        Map<String, String> validationResult = tokenValidationService.validateToken(token, "doctor");

        if (validationResult.isEmpty()) {
            return "doctor/doctorDashboard";
        } else {
            return "redirect:http://localhost:8080";
        }
    }
}
EOF
