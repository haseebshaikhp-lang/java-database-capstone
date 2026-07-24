package com.project.back_end.services;

import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;

@Service
public class TokenValidationService {

    /**
     * Validates a token against the expected role.
     *
     * @param token the auth token to validate
     * @param role  the expected role ("admin" or "doctor")
     * @return an empty map if the token is valid for that role;
     *         a map containing an "error" entry if invalid.
     */
    public Map<String, String> validateToken(String token, String role) {
        Map<String, String> result = new HashMap<>();

        if (token == null || token.isBlank()) {
            result.put("error", "Token is missing.");
            return result;
        }

        // TODO: replace with real JWT parsing/verification and role-claim check
        boolean isValid = decodeAndVerify(token, role);

        if (!isValid) {
            result.put("error", "Invalid or expired token for role: " + role);
        }

        return result;
    }

    private boolean decodeAndVerify(String token, String role) {
        // Placeholder for real signature verification + expiration + role claim check.
        // Wire this up to whatever JWT library/util your backend already uses.
        return token.length() > 10;
    }
}
