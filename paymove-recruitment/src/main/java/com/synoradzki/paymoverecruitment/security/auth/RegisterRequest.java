package com.synoradzki.paymoverecruitment.security.auth;

import com.synoradzki.paymoverecruitment.security.user.Role;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class RegisterRequest {
  @NotBlank
  private String firstname;
  @NotBlank
  private String lastname;
  @Email(
          regexp = "[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?",
          message = "incorrect email"
  )
  private String email;
  @NotBlank(message = "password cannot be blank")
  private String password;

  private Role role;
}