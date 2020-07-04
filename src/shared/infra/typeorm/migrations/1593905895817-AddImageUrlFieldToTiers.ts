import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddImageUrlFieldToTiers1593905895817
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'tier',
      new TableColumn({ name: 'image_url', type: 'varchar', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('tier', 'image_url');
  }
}
