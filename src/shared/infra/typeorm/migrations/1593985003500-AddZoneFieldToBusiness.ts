import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddZoneFieldToBusiness1593985003500
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'business',
      new TableColumn({ name: 'zone', type: 'varchar', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('business', 'zone');
  }
}
