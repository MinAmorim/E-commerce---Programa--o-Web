package com.minamorim.ecommerce_backend.dto;

public record RegistoDTO(
    String nome,       
    String endereco,   
    String email,      
    String login,      
    String senha       
) {
}