import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Categoria } from '../categorias/categorias.entity';
import { Point } from 'geojson';

@Entity('pontos_de_interesse')
export class PontoDeInteresse {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nome: string;

  @Column('geometry', { spatialFeatureType: 'Point', srid: 4326 })
  localizacao: Point;

  @ManyToOne(() => Categoria, (categoria) => categoria.pois, { onDelete: 'CASCADE' })
  categoria: Categoria;
}
