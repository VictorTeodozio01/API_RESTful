import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PontoDeInteresse } from './pontos-de-interesse.entity';
import { CriarPontoDeInteresseDto } from './dtos/criar-ponto-de-interesse.dto';
import { AtualizarPontoDeInteresseDto } from './dtos/atualizar-ponto-de-interesse.dto';
import { Categoria } from '../categorias/categorias.entity';
import { Point } from 'geojson';

@Injectable()
export class PontosDeInteresseService {
  constructor(
    @InjectRepository(PontoDeInteresse)
    private readonly pontosDeInteresseRepository: Repository<PontoDeInteresse>,
    @InjectRepository(Categoria)
    private readonly categoriaRepository: Repository<Categoria>,
  ) {}

  async listarTodos(): Promise<PontoDeInteresse[]> {
    return this.pontosDeInteresseRepository.find({ relations: ['categoria'] });
  }

  async listarPorId(id: number): Promise<PontoDeInteresse> {
    const ponto = await this.pontosDeInteresseRepository.findOne({
      where: { id },
      relations: ['categoria'],
    });
    if (!ponto) {
      throw new NotFoundException(`Ponto de interesse com ID ${id} não encontrado`);
    }
    return ponto;
  }

  async criar(criarDto: CriarPontoDeInteresseDto): Promise<PontoDeInteresse> {
    const categoria = await this.categoriaRepository.findOne({ where: { id: criarDto.categoria } });
    if (!categoria) {
      throw new NotFoundException('Categoria não encontrada');
    }

    const localizacao: Point = {
      type: 'Point',
      coordinates: [criarDto.lng, criarDto.lat],
    };

    const novoPonto = this.pontosDeInteresseRepository.create({
      nome: criarDto.nome,
      localizacao,
      categoria,
    });

    return this.pontosDeInteresseRepository.save(novoPonto);
  }

  async atualizar(id: number, atualizarDto: AtualizarPontoDeInteresseDto): Promise<PontoDeInteresse> {
    const ponto = await this.listarPorId(id);

    if (atualizarDto.nome) ponto.nome = atualizarDto.nome;
    if (atualizarDto.categoria) {
      const categoria = await this.categoriaRepository.findOne({ where: { id: atualizarDto.categoria } });
      if (!categoria) {
        throw new NotFoundException('Categoria não encontrada');
      }
      ponto.categoria = categoria;
    }
    if (atualizarDto.lng !== undefined && atualizarDto.lat !== undefined) {
      ponto.localizacao = {
        type: 'Point',
        coordinates: [atualizarDto.lng, atualizarDto.lat],
      };
    }

    return this.pontosDeInteresseRepository.save(ponto);
  }

  async excluir(id: number): Promise<void> {
    const ponto = await this.pontosDeInteresseRepository.findOne({ where: { id } });
    if (!ponto) {
      throw new NotFoundException(`Ponto de interesse com ID ${id} não encontrado`);
    }
    await this.pontosDeInteresseRepository.remove(ponto);
  }
}
