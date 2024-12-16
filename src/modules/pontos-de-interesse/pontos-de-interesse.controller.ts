import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { PontosDeInteresseService } from './pontos-de-interesse.service';
import { CriarPontoDeInteresseDto } from './dtos/criar-ponto-de-interesse.dto';
import { AtualizarPontoDeInteresseDto } from './dtos/atualizar-ponto-de-interesse.dto';

@Controller('pontos-de-interesse')
export class PontosDeInteresseController {
  constructor(private readonly pontosDeInteresseService: PontosDeInteresseService) {}

  @Get()
  async listarTodos() {
    return this.pontosDeInteresseService.listarTodos();
  }

  @Get(':id')
  async listarPorId(@Param('id') id: number) {
    return this.pontosDeInteresseService.listarPorId(id);
  }

  @Post()
  async criar(@Body() criarPontoDeInteresseDto: CriarPontoDeInteresseDto) {
    return this.pontosDeInteresseService.criar(criarPontoDeInteresseDto);
  }

  @Put(':id')
  async atualizar(
    @Param('id') id: number,
    @Body() atualizarPontoDeInteresseDto: AtualizarPontoDeInteresseDto,
  ) {
    return this.pontosDeInteresseService.atualizar(id, atualizarPontoDeInteresseDto);
  }

  @Delete(':id')
  async excluir(@Param('id') id: number) {
    await this.pontosDeInteresseService.excluir(id);
    return { message: 'Ponto de interesse excluído com sucesso' };
  }
}
