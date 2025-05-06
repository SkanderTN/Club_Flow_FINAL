package com.clubflow.controller;

import com.clubflow.dto.request.LoginRequest;
import com.clubflow.dto.request.UserDto;
import com.clubflow.dto.request.UserUpdateDto;
import com.clubflow.dto.response.ApiResponse;
import com.clubflow.model.User;
import com.clubflow.service.UserService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
@CrossOrigin(origins = "*", maxAge = 3600)
@Tag(name = "Users", description = "User management API")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(userService.getAllUsers());
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') or @userSecurity.isCurrentUser(#id)")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.ok(userService.getUserById(id));
    }

    @PostMapping
    public ResponseEntity<ApiResponse> createUser(@Valid @RequestBody UserDto userDto) {
        User createdUser = userService.createUser(userDto);
        return ResponseEntity.ok(new ApiResponse(true, "User created successfully", createdUser));
    }

    // ✅ FIXED: Only one update method remains
    @PutMapping("/{id}")
    @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> updateUser(@PathVariable Long id, @RequestBody UserUpdateDto updateDto) {
        User updatedUser = userService.updateUser(id, updateDto);
        return ResponseEntity.ok(new ApiResponse(true, "User updated", updatedUser));
    }

    @DeleteMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN')")
    public ResponseEntity<ApiResponse> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return ResponseEntity.ok(new ApiResponse(true, "User deleted successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse> login(@RequestBody LoginRequest loginRequest) {
        return ResponseEntity.ok(userService.login(loginRequest));
    }
}
