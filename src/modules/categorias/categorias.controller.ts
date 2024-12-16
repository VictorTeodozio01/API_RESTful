import { Controller, Get, Post, Put, Delete, Body, Param } from '@nestjs/common';
import { CategoriasService } from './categorias.service';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Controller('categorias')
export class CategoriasController {
  constructor(private readonly categoriasService: CategoriasService) {}

  @Get()
  async listarTodas() {
    return this.categoriasService.listarTodas();
  }

  @Post()
  async criar(@Body() criarCategoriaDto: CriarCategoriaDto) {
    return this.categoriasService.criar(criarCategoriaDto);
  }

  @Put(':id')
  async atualizar(
    @Param('id') id: number,
    @Body() atualizarCategoriaDto: AtualizarCategoriaDto,
  ) {
    return this.categoriasService.atualizar(id, atualizarCategoriaDto);
  }

  @Delete(':id')
  async excluir(@Param('id') id: number) {
    await this.categoriasService.excluir(id);
    return { message: 'Categoria excluída com sucesso' };
  }
}
