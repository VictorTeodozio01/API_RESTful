import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './modules/usuarios/usuarios.module';
import { PontosDeInteresseModule } from './modules/pontos-de-interesse/pontos-de-interesse.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseSeederService } from './database/seeds/database-seeder.service';
import { DatabaseConfig } from './config/database.config';

@Module({
  controllers: [AppController],
  providers: [AppService,DatabaseSeederService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot(DatabaseConfig),
    UsuarioModule,
    PontosDeInteresseModule,
    CategoriasModule,
  ],
})
export class AppModule {}
