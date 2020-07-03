import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBusinessClient1593818698076
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'business_client',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'business_id',
            type: 'uuid',
          },
          {
            name: 'client_id',
            type: 'uuid',
          },
          {
            name: 'tier_id',
            type: 'uuid',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
        foreignKeys: [
          {
            name: 'Business',
            referencedTableName: 'business',
            referencedColumnNames: ['id'],
            columnNames: ['business_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Client',
            referencedTableName: 'users',
            referencedColumnNames: ['id'],
            columnNames: ['client_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
          {
            name: 'Tier',
            referencedTableName: 'tier',
            referencedColumnNames: ['id'],
            columnNames: ['tier_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('business_client');
  }
}
