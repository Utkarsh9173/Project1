import {MigrationInterface, QueryRunner} from "typeorm";

export class AddedUserSecondPhone1636901196165 implements MigrationInterface {
    name = 'AddedUserSecondPhone1636901196165';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" ADD "phone_number_one" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone_number_one"`);
    }

}
