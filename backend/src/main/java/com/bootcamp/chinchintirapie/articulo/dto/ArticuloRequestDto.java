package com.bootcamp.chinchintirapie.articulo.dto;

import com.bootcamp.chinchintirapie.articulo.model.ArticuloType;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record ArticuloRequestDto(
        @NotBlank(message = "El título es obligatorio")
        @Size(max = 255, message = "El título no puede exceder 255 caracteres")
        String title,

        @Size(max = 1000, message = "La descripción no puede exceder 1000 caracteres")
        String description,

        @Size(max = 1000, message = "La URL no puede exceder 1000 caracteres")
        String urlPhoto,

        @NotBlank(message = "El cuerpo del artículo es obligatorio")
        @Size(max = 20000, message = "El cuerpo del artículo no puede exceder 20000 caracteres")
        String body,

        @NotNull(message = "El tipo es obligatorio")
        ArticuloType type,

        @NotBlank(message = "El autor es obligatorio")
        @Size(max = 255, message = "El autor no puede exceder 255 caracteres")
        String author,

        @NotNull(message = "El ID del usuario es obligatorio")
        Long authorId
) {
}
