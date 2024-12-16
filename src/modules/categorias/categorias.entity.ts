import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { PontoDeInteresse } from '../pontos-de-interesse/pontos-de-interesse.entity';

@Entity('categorias')
export class Categoria {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @OneToMany(() => PontoDeInteresse, (pontoDeInteresse) => pontoDeInteresse.categoria)
  pois: PontoDeInteresse[];
}
