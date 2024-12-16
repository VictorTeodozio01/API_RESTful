export default {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123',
    database: 'geodb',
    autoLoadEntities: true,
    synchronize: false, // Use migrações em produção.
  };
  