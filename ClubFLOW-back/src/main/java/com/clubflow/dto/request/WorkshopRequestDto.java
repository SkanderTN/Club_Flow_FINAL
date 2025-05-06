package com.clubflow.dto.request;


import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class WorkshopRequestDto {

    @NotBlank(message = "Title is required")
    private String title;

    @NotBlank(message = "Reason is required")
    private String reason;

    // ✅ Required for reverse mapping (toDto)
    private Long userId;
}
