import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PontosDeInteresseController } from './pontos-de-interesse.controller';
import { PontosDeInteresseService } from './pontos-de-interesse.service';
import { PontoDeInteresse } from './pontos-de-interesse.entity';
import { CategoriasModule } from '../categorias/categorias.module'; 

@Module({
  imports: [
    TypeOrmModule.forFeature([PontoDeInteresse]),
    CategoriasModule,  
  ],
  controllers: [PontosDeInteresseController],
  providers: [PontosDeInteresseService],
  exports: [PontosDeInteresseService],
})
export class PontosDeInteresseModule {}
