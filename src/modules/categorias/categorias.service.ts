import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Categoria } from './categorias.entity';
import { CriarCategoriaDto } from './dtos/criar-categoria.dto';
import { AtualizarCategoriaDto } from './dtos/atualizar-categoria.dto';

@Injectable()
export class CategoriasService {
  constructor(
    @InjectRepository(Categoria)
    private readonly categoriasRepository: Repository<Categoria>,
  ) {}

  async listarTodas(): Promise<Categoria[]> {
    return this.categoriasRepository.find();
  }

  async criar(criarCategoriaDto: CriarCategoriaDto): Promise<Categoria> {
    const categoria = this.categoriasRepository.create(criarCategoriaDto);
    return this.categoriasRepository.save(categoria);
  }

  async atualizar(
    id: number,
    atualizarCategoriaDto: AtualizarCategoriaDto,
  ): Promise<Categoria> {
    const categoria = await this.categoriasRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }

    Object.assign(categoria, atualizarCategoriaDto);
    return this.categoriasRepository.save(categoria);
  }

  async excluir(id: number): Promise<void> {
    const categoria = await this.categoriasRepository.findOne({ where: { id } });
    if (!categoria) {
      throw new NotFoundException(`Categoria com ID ${id} não encontrada`);
    }

    await this.categoriasRepository.remove(categoria);
  }
}
