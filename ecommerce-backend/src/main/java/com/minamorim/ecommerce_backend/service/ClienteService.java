package com.minamorim.ecommerce_backend.service;

import com.minamorim.ecommerce_backend.dto.AtualizarDadosDTO;
import com.minamorim.ecommerce_backend.model.Usuario;
import com.minamorim.ecommerce_backend.repository.UsuarioRepository;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class ClienteService {

    private final UsuarioRepository usuarioRepository;

    public ClienteService(UsuarioRepository usuarioRepository) {
        this.usuarioRepository = usuarioRepository;
    }

   
    private Usuario getUsuarioLogado(String login) {
        return usuarioRepository.findByLogin(login)
                .orElseThrow(() -> new UsernameNotFoundException("Usuário não encontrado"));
    }


    @Transactional 
    public Usuario atualizarMeusDados(String login, AtualizarDadosDTO dto) {
        // 1. Encontra o usuário que está logado
        Usuario usuario = getUsuarioLogado(login);

        // 2. Atualiza os campos (como no)
        usuario.setNome(dto.nome());
        usuario.setEndereco(dto.endereco());
        usuario.setEmail(dto.email());

        // 3. Salva as alterações no banco
        return usuarioRepository.save(usuario);
    }

    
    @Transactional
    public void deletarMinhaConta(String login) {
        // 1. Encontra o usuário que está logado
        Usuario usuario = getUsuarioLogado(login);

        // 2. Deleta o usuário do banco
        usuarioRepository.delete(usuario);
    }

    
    public Usuario getMeusDados(String login) {
        return getUsuarioLogado(login);
    }
}