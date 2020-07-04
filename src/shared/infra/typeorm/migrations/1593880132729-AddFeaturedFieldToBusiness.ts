import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class AddFeaturedFieldToBusiness1593880132729
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'business',
      new TableColumn({ name: 'featured', type: 'bool' }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('business', 'featured');
  }
}
