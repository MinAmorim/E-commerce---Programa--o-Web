package com.minamorim.ecommerce_backend.security;

import com.minamorim.ecommerce_backend.model.Usuario;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Component
public class JwtUtil {

    private final String SECRET_KEY = "suaChaveSecretaMuitoLongaParaSerSeguraEDificilDeAdivinhar123456";
    
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes());
    }

    public String generateToken(Usuario usuario) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("role", usuario.getRole());
        claims.put("nome", usuario.getNome());

        return Jwts.builder()
                .setClaims(claims)
                .setSubject(usuario.getLogin()) 
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 10)) 
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }
}