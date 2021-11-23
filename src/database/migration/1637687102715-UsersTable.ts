import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersTable1637687102715 implements MigrationInterface {
    name = 'UsersTable1637687102715';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "Users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, "is_referred" boolean, "referral_code" character varying, "mobile" character varying NOT NULL, "account_type_id" integer NOT NULL, "account_status" boolean NOT NULL, "created_by" character varying NOT NULL, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_16d4f7d636df336db11d87413e3" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "Users"`);
    }

}
