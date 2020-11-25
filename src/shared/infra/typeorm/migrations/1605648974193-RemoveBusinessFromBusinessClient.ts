import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class RemoveBusinessFromBusinessClient1605648974193
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('business_client', 'Business');

    await queryRunner.dropColumn('business_client', 'business_id');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'business_client',
      new TableColumn({
        name: 'business_id',
        type: 'uuid',
      }),
    );

    await queryRunner.createForeignKey(
      'business_client',
      new TableForeignKey({
        name: 'Business',
        referencedTableName: 'business',
        referencedColumnNames: ['id'],
        columnNames: ['business_id'],
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE',
      }),
    );
  }
}
