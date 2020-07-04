import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterFeaturedType1593879394349
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('business', 'featured');

    await queryRunner.addColumn(
      'business',
      new TableColumn({
        name: 'featured',
        type: 'int',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('business', 'featured');

    await queryRunner.addColumn(
      'business',
      new TableColumn({
        name: 'featured',
        type: 'boolean',
      }),
    );
  }
}
