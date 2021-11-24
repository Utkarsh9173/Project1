import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersProfileDetailsTable1637774337307 implements MigrationInterface {
    name = 'UsersProfileDetailsTable1637774337307';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "UsersProfile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "emp_id" character varying NOT NULL, "department" character varying NOT NULL, "location" character varying NOT NULL, "designation" boolean, "joining_date" character varying, "display_picture" character varying NOT NULL, "created_by" character varying NOT NULL, "updated_by" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_8e1e68d38c587e79423861e834a" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "UsersProfile"`);
    }

}
