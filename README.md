# API RESTful 


## Tecnologias Utilizadas
Node.js<br>
TypeScript <br>
NestJS<br>


## Descrição
API RESTful com as funcionalidades CRUD.


## Como executar 

```bash
# instale o node modules
$ npm install

# apos a instalação execute o comando
$ npm run start

```

## Rotas
### As rotas abaixo podem ser executadas no Postman

http://localhost:3000/usuarios <br>
http://localhost:3000/pontos-de-interesse <br>
http://localhost:3000/categorias/ <br>


Usuários: <br>
GET /usuarios — Listar todos os usuários.<br>
POST /usuarios — Criar um novo usuário.<br>
PUT /usuarios/id — Atualizar um usuário.<br>
DELETE /usuarios/id — Excluir um usuário.<br>

Categorias:<br>
GET /categorias — Listar todas as categorias.<br>
POST /categorias — Criar uma nova categoria.<br>
PUT /categorias/id — Atualizar uma categoria.<br>
DELETE /categorias/id — Excluir uma categoria.<br>

Pontos de Interesse:<br>
GET /pontos-de-interesse — Listar todos os pontos de interesse.<br>
POST /pontos-de-interesse — Criar um novo ponto de interesse.<br>
PUT /pontos-de-interesse/id — Atualizar um ponto de interesse.<br>
DELETE /pontos-de-interesse/id — Excluir um ponto de interesse.<br>

## Json
### API já vem com dados cadastrados, porém abaixo estão os arquivos JSON dos dados inseridos. As estruturas podem ser usadas para testar a inserção de novos dados.

#### usuarios.json

{
  "usuarios": [
    {
      "nome": "João Silva",
      "email": "joao.silva@example.com"
    },
    {
      "nome": "Maria Oliveira",
      "email": "maria.oliveira@example.com"
    }
  ]
}

#### categorias.json

{
  "categorias": [
    {
      "nome": "Parques"
    },
    {
      "nome": "Museus"
    }
  ]
}

#### pontos_de_interesse.json

{
  "pontos_de_interesse": [
    {
      "nome": "Parque Central",
      "localizacao": {
        "type": "Point",
        "coordinates": [-46.633309, -23.55052]
      },
      "categoriaId": 1
    },
    {
      "nome": "Museu de Arte Moderna",
      "localizacao": {
        "type": "Point",
        "coordinates": [-42.651023, -27.556561]
      },
      "categoriaId": 2
    }
  ]
}

## Docker

para testar o docker execute o seguinte comando:


```bash
# instale o node modules
$ docker-compose down --volumes

# apos a instalação execute o comando
$ docker-compose up --build

```