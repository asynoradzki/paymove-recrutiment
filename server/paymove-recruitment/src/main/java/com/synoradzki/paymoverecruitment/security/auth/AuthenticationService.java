package com.synoradzki.paymoverecruitment.security.auth;

import com.synoradzki.paymoverecruitment.exception.AlreadyExistsException;
import com.synoradzki.paymoverecruitment.security.config.JwtService;
import com.synoradzki.paymoverecruitment.security.token.Token;
import com.synoradzki.paymoverecruitment.security.token.TokenRepository;
import com.synoradzki.paymoverecruitment.security.token.TokenType;
import com.synoradzki.paymoverecruitment.security.user.AppUser;
import com.synoradzki.paymoverecruitment.security.user.AppUserRepository;
import com.synoradzki.paymoverecruitment.security.user.Role;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class AuthenticationService {
    private final AppUserRepository repository;
    private final TokenRepository tokenRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;
    private final AuthenticationManager authenticationManager;

    public AuthenticationResponse register(RegisterRequest request) throws AlreadyExistsException {
        Optional<AppUser> optionalUser = repository.findByEmail(request.getEmail());
        if (optionalUser.isPresent()) {
            throw new AlreadyExistsException("email");
        }

        AppUser user = AppUser.builder()
                .firstname(request.getFirstname())
                .lastname(request.getLastname())
                .email(request.getEmail())
                .password(passwordEncoder.encode(request.getPassword()))
                .role(request.getRole())
                .build();
        AppUser savedUser = repository.save(user);
        String jwtToken = jwtService.generateToken(
                Map.of("role", user.getRole()),
                user
        );
        saveUserToken(savedUser, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    public AuthenticationResponse authenticate(AuthenticationRequest request) {
        authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail(),
                        request.getPassword()
                )
        );
        AppUser user = repository.findByEmail(request.getEmail())
                .orElseThrow();
        String jwtToken = jwtService.generateToken(
                Map.of("role", user.getRole()),
                user
        );
        revokeAllUserTokens(user);
        saveUserToken(user, jwtToken);
        return AuthenticationResponse.builder()
                .accessToken(jwtToken)
                .build();
    }

    private void saveUserToken(AppUser user, String jwtToken) {
        Token token = Token.builder()
                .appUser(user)
                .token(jwtToken)
                .tokenType(TokenType.BEARER)
                .expired(false)
                .revoked(false)
                .build();
        tokenRepository.save(token);
    }

    private void revokeAllUserTokens(AppUser user) {
        var validUserTokens = tokenRepository.findAllValidTokenByUser(user.getId());
        if (validUserTokens.isEmpty())
            return;
        validUserTokens.forEach(token -> {
            token.setExpired(true);
            token.setRevoked(true);
        });
        tokenRepository.saveAll(validUserTokens);
    }

}