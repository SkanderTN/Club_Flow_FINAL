package com.clubflow.dto.request;

import lombok.Data;

@Data
public class UserUpdateDto {
    private String firstName;
    private String lastName;
    private String email;
    private String phoneNumber;
    private String address;
    private String birthDate;
    private String image;
    private String club;
    private String role;
    private String password; // optional
}
