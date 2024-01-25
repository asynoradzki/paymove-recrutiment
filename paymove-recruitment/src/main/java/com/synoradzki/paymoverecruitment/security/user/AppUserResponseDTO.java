package com.synoradzki.paymoverecruitment.security.user;

public record AppUserResponseDTO(
        Long userId,
        String firstname,
        String lastname,
        String email,
        Role role
) {
}