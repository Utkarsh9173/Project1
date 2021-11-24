import {MigrationInterface, QueryRunner} from "typeorm";

export class EmpIdAddedToUsers1637767105544 implements MigrationInterface {
    name = 'EmpIdAddedToUsers1637767105544';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ADD "emp_id" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" DROP COLUMN "emp_id"`);
    }

}
