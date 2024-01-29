package com.synoradzki.paymoverecruitment.security.user;

import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequestMapping("/users")
@RestController
@RequiredArgsConstructor
public class AppUserController {

    private final AppUserService appUserService;

    /**
     * Lists all users.
     * Endpoint only available for authenticated users with role ADMIN
     *
     * GET
     * /users/
     *
     * @return a list of all users
     *
     * AppUserResponseDTO(
     *         Long userId,
     *         String firstname,
     *         String lastname,
     *         String email,
     *         Role role (ADMIN, USER)
     * )
     */

    @PreAuthorize("hasRole('ADMIN')")
    @GetMapping("/")
    public ResponseEntity<List<AppUserResponseDTO>> getUsers() {
        return new ResponseEntity<>(appUserService.getUsers(), HttpStatus.OK);
    }
}
