import { Test, TestingModule } from '@nestjs/testing';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';  
import { INestApplication } from '@nestjs/common';

describe('PontosDeInteresseController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],  
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  it('Deve listar todos os pontos de interesse (GET /pontos-de-interesse)', async () => {
    const response = await request(app.getHttpServer())
      .get('/pontos-de-interesse')
      .expect(200);

    expect(response.body).toBeInstanceOf(Array); 
    expect(response.body.length).toBeGreaterThan(0); 
  });

  it('Deve criar um ponto de interesse (POST /pontos-de-interesse)', async () => {
    const ponto = {
      nome: 'Novo Parque',
      localizacao: 'POINT(-46.633309 -23.55052)', 
      categoriaId: 1,
    };

    const response = await request(app.getHttpServer())
      .post('/pontos-de-interesse')
      .send(ponto)
      .expect(201);

    expect(response.body.nome).toBe(ponto.nome);  
    expect(response.body.localizacao).toBe(ponto.localizacao);  
    expect(response.body.categoriaId).toBe(ponto.categoriaId); 
  });

  it('Deve atualizar um ponto de interesse (PUT /pontos-de-interesse/:id)', async () => {
    const pontoExistente = await request(app.getHttpServer()).get('/pontos-de-interesse');
    const pontoId = pontoExistente.body[0].id; 

    const pontoAtualizado = {
      nome: 'Parque Atualizado',
      localizacao: 'POINT(-46.651023 -23.556561)',  
      categoriaId: 2,
    };

    const response = await request(app.getHttpServer())
      .put(`/pontos-de-interesse/${pontoId}`)
      .send(pontoAtualizado)
      .expect(200);

    expect(response.body.nome).toBe(pontoAtualizado.nome); 
    expect(response.body.localizacao).toBe(pontoAtualizado.localizacao); 
    expect(response.body.categoriaId).toBe(pontoAtualizado.categoriaId);  
  });

  it('Deve excluir um ponto de interesse (DELETE /pontos-de-interesse/:id)', async () => {
    const pontoExistente = await request(app.getHttpServer()).get('/pontos-de-interesse');
    const pontoId = pontoExistente.body[0].id; 

    const response = await request(app.getHttpServer())
      .delete(`/pontos-de-interesse/${pontoId}`)
      .expect(200);

    expect(response.body).toEqual({});  
  });

  afterAll(async () => {
    await app.close();
  });
});
