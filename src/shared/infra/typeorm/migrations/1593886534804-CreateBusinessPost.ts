import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateBusinessPost1593886534804
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'business_post',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'title',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'short_desc',
            type: 'varchar',
          },
          {
            name: 'desc',
            type: 'varchar',
          },
          {
            name: 'business_id',
            type: 'uuid',
          },
          {
            name: 'image_url',
            type: 'varchar',
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
            name: 'PostBusiness',
            referencedTableName: 'business',
            referencedColumnNames: ['id'],
            columnNames: ['business_id'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          },
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('business_post');
  }
}
