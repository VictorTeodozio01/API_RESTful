import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { CriarUsuarioDto } from './dtos/criar-usuario.dto';
import { AtualizarUsuarioDto } from './dtos/atualizar-usuario.dto';

@Controller('usuarios')
export class UsuariosController {
  constructor(private readonly usuariosService: UsuariosService) {}

  @Get()
  listarUsuarios() {
    return this.usuariosService.listarTodos();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usuariosService.findOne(Number(id)); 
  }

  @Post()
  criarUsuario(@Body() criarUsuarioDto: CriarUsuarioDto) {
    return this.usuariosService.criarUsuario(criarUsuarioDto);
  }

  @Put(':id')
  atualizarUsuario(@Param('id') id: string, @Body() atualizarUsuarioDto: AtualizarUsuarioDto) {
    return this.usuariosService.atualizarUsuario(Number(id), atualizarUsuarioDto);
  }

  @Delete(':id')
  excluirUsuario(@Param('id') id: string) {
    return this.usuariosService.excluirUsuario(Number(id));
  }
}
