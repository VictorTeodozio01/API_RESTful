import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsuarioModule } from './modules/usuarios/usuarios.module';
import { PontosDeInteresseModule } from './modules/pontos-de-interesse/pontos-de-interesse.module';
import { CategoriasModule } from './modules/categorias/categorias.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseSeederService } from './database/seeds/database-seeder.service';

@Module({
  controllers: [AppController],
  providers: [AppService,DatabaseSeederService],
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type:'postgres',
      host:'localhost',
      port: 5432,
      username:'postgres',
      password:'123',
      database:'geodb',
      autoLoadEntities: true,
      synchronize: true, 
    }),
    UsuarioModule,
    PontosDeInteresseModule,
    CategoriasModule,
  ],
})
export class AppModule {}
