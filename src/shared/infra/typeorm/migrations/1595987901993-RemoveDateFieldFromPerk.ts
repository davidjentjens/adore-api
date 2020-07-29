import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class RemoveDateFieldFromPerk1595987901993
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('perk', 'date');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'perk',
      new TableColumn({ name: 'date', type: 'int' }),
    );
  }
}
