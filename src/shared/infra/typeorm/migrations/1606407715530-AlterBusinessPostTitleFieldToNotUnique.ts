import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AlterBusinessPostTitleFieldToNotUnique1606407715530
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'business_post',
      'title',
      new TableColumn({
        name: 'title',
        type: 'varchar',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.changeColumn(
      'business_post',
      'title',
      new TableColumn({
        name: 'title',
        type: 'varchar',
        isUnique: true,
      }),
    );
  }
}
