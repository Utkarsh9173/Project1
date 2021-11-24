import {MigrationInterface, QueryRunner} from "typeorm";

export class DefaultValuesAddedToUserFields1637769055202 implements MigrationInterface {
    name = 'DefaultValuesAddedToUserFields1637769055202';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "is_referred" SET DEFAULT false`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "account_status" SET DEFAULT false`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "account_status" DROP DEFAULT`);
        await queryRunner.query(`ALTER TABLE "Users" ALTER COLUMN "is_referred" DROP DEFAULT`);
    }

}
