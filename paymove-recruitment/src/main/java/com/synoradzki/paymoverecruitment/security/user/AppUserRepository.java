package com.synoradzki.paymoverecruitment.security.user;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface AppUserRepository extends JpaRepository<AppUser, Integer> {

  Optional<AppUser> findByEmail(String email);

}