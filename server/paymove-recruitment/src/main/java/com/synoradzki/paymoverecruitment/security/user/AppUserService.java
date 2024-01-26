package com.synoradzki.paymoverecruitment.security.user;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;

import static java.util.stream.Collectors.toList;

@Service
@RequiredArgsConstructor
public class AppUserService {

    private final AppUserRepository repository;

    public List<AppUserResponseDTO> getUsers() {
        List<AppUser> result = repository.findAll(Sort.by(Sort.Direction.ASC, "email"));


        return result.stream()
                .map(appUser ->
                        new AppUserResponseDTO(
                                appUser.getId(),
                                appUser.getFirstname(),
                                appUser.getLastname(),
                                appUser.getEmail(),
                                appUser.getRole()
                        ))
                .collect(toList());
    }

}
