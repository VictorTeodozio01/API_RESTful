import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuarios.entity';
import { CriarUsuarioDto } from './dtos/criar-usuario.dto';
import { AtualizarUsuarioDto } from './dtos/atualizar-usuario.dto';

@Injectable()
export class UsuariosService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,
  ) {}

  async listarTodos() {
    return this.usuarioRepository.find();
  }

  async findOne(id: number) {
    const usuario = await this.usuarioRepository.findOne({ where: { id } });
    if (!usuario) {
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    return usuario;
  }

  async criarUsuario(dados: CriarUsuarioDto) {
    const usuario = this.usuarioRepository.create(dados);
    return this.usuarioRepository.save(usuario);
  }

  async atualizarUsuario(id: number, dados: AtualizarUsuarioDto) {
    console.log('Atualizando usuário com ID:', id, 'Dados recebidos:', dados);
    
    const usuario = await this.findOne(id);
    
    if (!usuario) {
      console.log('Usuário não encontrado com ID:', id);
      throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    }
    Object.assign(usuario, dados);
    console.log('Usuário após atualização:', usuario);
    const usuarioAtualizado = await this.usuarioRepository.save(usuario);
    console.log('Usuário após salvar no banco:', usuarioAtualizado);
    return usuarioAtualizado;
  }
  
  async excluirUsuario(id: number) {
    console.log('Excluindo usuário com ID:', id);
    const usuarioId = parseInt(id.toString(), 10);  
    if (isNaN(usuarioId)) {
      throw new Error('ID inválido');
    }
    const usuario = await this.findOne(usuarioId);
    if (!usuario) {
      console.log('Usuário não encontrado com ID:', usuarioId);
      throw new NotFoundException(`Usuário com ID ${usuarioId} não encontrado`);
    }
    return this.usuarioRepository.remove(usuario);
  }
  
  
}
