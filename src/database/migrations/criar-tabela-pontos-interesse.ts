import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CriarTabelaPontosInteresse1670000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'pontos_de_interesse',
        columns: [
          {
            name: 'id',
            type: 'serial',
            isPrimary: true,
          },
          {
            name: 'nome',
            type: 'varchar',
          },
          {
            name: 'localizacao',
            type: 'geometry',
            spatialFeatureType: 'Point',
            srid: 4326,
          },
          {
            name: 'categoriaId',
            type: 'int',
            isNullable: true,
          },
        ],
      })
    );

    await queryRunner.createForeignKey(
      'pontos_de_interesse',
      new TableForeignKey({
        columnNames: ['categoriaId'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categorias',
        onDelete: 'CASCADE',
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('pontos_de_interesse');
  }
}
