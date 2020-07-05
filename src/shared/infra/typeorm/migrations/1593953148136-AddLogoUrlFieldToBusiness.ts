import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddLogoUrlFieldToBusiness1593953148136
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'business',
      new TableColumn({ name: 'logo_url', type: 'varchar', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('business', 'logo_url');
  }
}
