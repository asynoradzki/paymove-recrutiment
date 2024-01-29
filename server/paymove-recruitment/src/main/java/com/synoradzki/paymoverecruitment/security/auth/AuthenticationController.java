package com.synoradzki.paymoverecruitment.security.auth;

import com.synoradzki.paymoverecruitment.exception.AlreadyExistsException;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthenticationController {

    private final AuthenticationService service;

    /**
     * The method registers new users
     *
     * POST
     * /api/v1/auth/register
     *
     * @param request RegisterRequest(String firstname, String lastname, String email, String password, Role)
     *                all fields must be delivered, email is validated. Role options Role.ADMIN, Role.USER
     * @return JWT token if successful, otherwise returns 403 status code.
     * @throws AlreadyExistsException Status code 403 error message: "email already exists in database"
     */

    @PostMapping("/register")
    public ResponseEntity<AuthenticationResponse> register(
            @Valid @RequestBody RegisterRequest request
    ) throws AlreadyExistsException {
        return ResponseEntity.ok(service.register(request));
    }


    /**
     * The method authenticates users
     *
     * POST
     * /api/v1/auth/authenticate
     *
     * @param request AuthenticationRequest(String email, String password)
     * @return JWT token if successful, otherwise returns 403 status code.
     */

    @PostMapping("/authenticate")
    public ResponseEntity<AuthenticationResponse> authenticate(
            @RequestBody AuthenticationRequest request
    ) {
        return ResponseEntity.ok(service.authenticate(request));
    }

}