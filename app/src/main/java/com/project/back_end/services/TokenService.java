package com.project.back_end.services;

import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Service
public class TokenService {

    // How long a generated token remains valid, in seconds.
    private static final long EXPIRY_SECONDS = 60 * 60; // 1 hour

    /**
     * Generates a simple token that encodes the user's email and an expiry timestamp.
     *
     * NOTE: This is a lightweight placeholder, not a real signed JWT. Swap this out
     * for a proper JWT library (e.g. io.jsonwebtoken) if you need signature verification.
     *
     * @param email the email to embed in the token
     * @return an opaque token string
     */
    public String generateToken(String email) {
        long expiresAt = Instant.now().getEpochSecond() + EXPIRY_SECONDS;
        String payload = email + ":" + expiresAt;
        return Base64.getUrlEncoder().withoutPadding().encodeToString(payload.getBytes());
    }

    /**
     * Extracts the email embedded in a token produced by {@link #generateToken(String)}.
     *
     * @param token the token to decode
     * @return the email, or null if the token is missing, malformed, or expired
     */
    public String extractEmail(String token) {
        if (token == null || token.isBlank()) {
            return null;
        }
        try {
            String payload = new String(Base64.getUrlDecoder().decode(token));
            String[] parts = payload.split(":");
            if (parts.length != 2) {
                return null;
            }
            String email = parts[0];
            long expiresAt = Long.parseLong(parts[1]);
            if (Instant.now().getEpochSecond() > expiresAt) {
                return null; // expired
            }
            return email;
        } catch (Exception e) {
            return null;
        }
    }

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
