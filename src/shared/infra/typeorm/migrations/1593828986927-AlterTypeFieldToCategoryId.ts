import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AlterTypeFieldToCategoryId1593828986927
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('business', 'type');

    await queryRunner.addColumn(
      'business',
      new TableColumn({
        name: 'category_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'business',
      new TableForeignKey({
        name: 'BusinessCategory',
        columnNames: ['category_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'categories',
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('business', 'BusinessCategory');

    await queryRunner.dropColumn('business', 'category_id');

    await queryRunner.addColumn(
      'business',
      new TableColumn({
        name: 'type',
        type: 'varchar',
      }),
    );
  }
}
