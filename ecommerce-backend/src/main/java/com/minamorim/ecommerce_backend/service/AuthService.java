package com.minamorim.ecommerce_backend.service;

import com.minamorim.ecommerce_backend.dto.LoginRequestDTO;
import com.minamorim.ecommerce_backend.dto.RegistoDTO;
import com.minamorim.ecommerce_backend.dto.TokenDTO;
import com.minamorim.ecommerce_backend.model.Usuario;
import com.minamorim.ecommerce_backend.repository.UsuarioRepository;
import com.minamorim.ecommerce_backend.security.JwtUtil;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UsuarioRepository usuarioRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtUtil;

    public AuthService(UsuarioRepository usuarioRepository, 
                       PasswordEncoder passwordEncoder, 
                       AuthenticationManager authenticationManager,
                       JwtUtil jwtUtil) {
        this.usuarioRepository = usuarioRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.jwtUtil = jwtUtil;
    }

    
    public TokenDTO registrar(RegistoDTO dto) {
        if (usuarioRepository.findByLogin(dto.login()).isPresent()) {
            throw new RuntimeException("Login já cadastrado");
        }

        String senhaCriptografada = passwordEncoder.encode(dto.senha());

        Usuario novoUsuario = new Usuario(
            dto.nome(),
            dto.endereco(),
            dto.email(),
            dto.login(),
            senhaCriptografada,
            "ROLE_USER" 
        );

        usuarioRepository.save(novoUsuario);

        String token = jwtUtil.generateToken(novoUsuario);
        return new TokenDTO(token);
    }

    public TokenDTO login(LoginRequestDTO dto) {
        authenticationManager.authenticate(
            new UsernamePasswordAuthenticationToken(dto.login(), dto.senha())
        );

        Usuario usuario = usuarioRepository.findByLogin(dto.login())
                .orElseThrow(() -> new RuntimeException("Usuário não encontrado após autenticação"));

        String token = jwtUtil.generateToken(usuario);
        return new TokenDTO(token);
    }
}