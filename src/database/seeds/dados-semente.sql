
CREATE TABLE IF NOT EXISTS seeds (
  name VARCHAR(255) PRIMARY KEY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM seeds WHERE name = 'dados-semente.sql') THEN

    INSERT INTO usuarios (nome, email) VALUES
    ('João Silva', 'joao.silva@example.com'),
    ('Maria Oliveira', 'maria.oliveira@example.com');

    INSERT INTO categorias (nome) VALUES
    ('Parques'),
    ('Museus');

    INSERT INTO pontos_de_interesse (nome, localizacao, "categoriaId") VALUES
    ('Parque Central', ST_SetSRID(ST_MakePoint(-46.633309, -23.55052), 4326), 1 ),
    ('Museu de Arte Moderna', ST_SetSRID(ST_MakePoint(-42.651023, -27.556561), 4326),2);

    INSERT INTO seeds (name) VALUES ('dados-semente.sql');
  END IF;
END $$;




