import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddShortDescAndMembersToBusiness1593992721244
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'business',
      new TableColumn({ name: 'subtitle', type: 'varchar', isNullable: true }),
    );

    await queryRunner.addColumn(
      'business',
      new TableColumn({ name: 'members', type: 'int', isNullable: true }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('business', 'subtitle');
    await queryRunner.dropColumn('business', 'members');
  }
}
