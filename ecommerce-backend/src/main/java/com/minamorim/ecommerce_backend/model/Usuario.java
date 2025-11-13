package com.minamorim.ecommerce_backend.model;

import jakarta.persistence.*;
// IMPORTS ADICIONADOS
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

@Entity
@Table(name = "usuario") //
public class Usuario implements UserDetails {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id; //

    private String nome; //
    private String endereco; //
    private String email; //

    @Column(unique = true)
    private String login; //
    private String senha; //

    private String role; // "ROLE_USER" ou "ROLE_ADMIN"

    // --- Construtores Vazios e Cheios (Boa prática para JPA) ---
    public Usuario() {
    }

    public Usuario(String nome, String endereco, String email, String login, String senha, String role) {
        this.nome = nome;
        this.endereco = endereco;
        this.email = email;
        this.login = login;
        this.senha = senha;
        this.role = role;
    }

    // --- Getters e Setters (Agora completos) ---
    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getNome() {
        return nome;
    }

    public void setNome(String nome) {
        this.nome = nome;
    }

    public String getEndereco() {
        return endereco;
    }

    public void setEndereco(String endereco) {
        this.endereco = endereco;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getSenha() {
        return senha;
    }

    public void setSenha(String senha) {
        this.senha = senha;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }


    // --- MÉTODOS DO USERDETAILS ADICIONADOS (Corrigem o erro) ---

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        // Define o "Papel" (Role) do usuário
        if ("ROLE_ADMIN".equals(this.role)) {
            return List.of(new SimpleGrantedAuthority("ROLE_ADMIN"), new SimpleGrantedAuthority("ROLE_USER"));
        } else {
            return List.of(new SimpleGrantedAuthority("ROLE_USER"));
        }
    }

    @Override
    public String getPassword() {
        // Diz ao Spring qual campo é a senha
        return this.senha;
    }

    @Override
    public String getUsername() {
        // Diz ao Spring qual campo é o "username" (no nosso caso, 'login')
        return this.login;
    }


    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    @Override
    public boolean isAccountNonLocked() {
        return true;
    }

    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    @Override
    public boolean isEnabled() {
        return true;
    }
}