import {MigrationInterface, QueryRunner} from "typeorm";

export class First1636900771919 implements MigrationInterface {
    name = 'First1636900771919';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "monthlyUsage" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "jan" integer NOT NULL, "feb" text array NOT NULL, "mar" integer NOT NULL, "apr" integer NOT NULL, "may" integer NOT NULL, "jun" integer NOT NULL, "jul" integer NOT NULL, "aug" integer NOT NULL, "sept" integer NOT NULL, "oct" integer NOT NULL, "nov" integer NOT NULL, "dec" integer NOT NULL, "year" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_e574d5d72902df3e73964bc4720" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "moretrees" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "user_id" character varying NOT NULL, "no_of_trees" integer NOT NULL, "certificate_id" character varying NOT NULL, "certificate_url" character varying NOT NULL, "total_carbon_offset" integer NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_d8e23ee9fd1aa1ad029b2258548" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "profile" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dob" TIMESTAMP NOT NULL, "phone_number" character varying NOT NULL, "address_line_one" character varying NOT NULL, "address_line_two" character varying NOT NULL, "city" character varying NOT NULL, "postcode" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_3dd8bfc97e4a77c70971591bdcb" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "dob" TIMESTAMP NOT NULL, "email" character varying NOT NULL, "first_name" character varying NOT NULL, "last_name" character varying NOT NULL, "password" character varying NOT NULL, "referral_code" character varying NOT NULL, "referred_by" character varying NOT NULL, "verified_at" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), "bank_detail_id" uuid, "monthly_usage_id" uuid, "more_trees_id" uuid, "profile_id" uuid, CONSTRAINT "REL_65f67ad666df691b99711d6815" UNIQUE ("bank_detail_id"), CONSTRAINT "REL_f772d288e395eb064302a0b1e1" UNIQUE ("monthly_usage_id"), CONSTRAINT "REL_c9be33833eb05e86253afb6ea9" UNIQUE ("more_trees_id"), CONSTRAINT "REL_23371445bd80cb3e413089551b" UNIQUE ("profile_id"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "bank_detail" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "payment_plan" integer NOT NULL, "account_holder_name" character varying NOT NULL, "account_number" character varying NOT NULL, "account_sort_code" character varying NOT NULL, "card_holder_name" character varying NOT NULL, "card_sort_code" character varying NOT NULL, "card_number" character varying NOT NULL, "card_expiry_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_bfdac1bd6b02588c81b816a4a2c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_65f67ad666df691b99711d6815b" FOREIGN KEY ("bank_detail_id") REFERENCES "bank_detail"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_f772d288e395eb064302a0b1e14" FOREIGN KEY ("monthly_usage_id") REFERENCES "monthlyUsage"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_c9be33833eb05e86253afb6ea96" FOREIGN KEY ("more_trees_id") REFERENCES "moretrees"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "users" ADD CONSTRAINT "FK_23371445bd80cb3e413089551bf" FOREIGN KEY ("profile_id") REFERENCES "profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_23371445bd80cb3e413089551bf"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_c9be33833eb05e86253afb6ea96"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_f772d288e395eb064302a0b1e14"`);
        await queryRunner.query(`ALTER TABLE "users" DROP CONSTRAINT "FK_65f67ad666df691b99711d6815b"`);
        await queryRunner.query(`DROP TABLE "bank_detail"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "profile"`);
        await queryRunner.query(`DROP TABLE "moretrees"`);
        await queryRunner.query(`DROP TABLE "monthlyUsage"`);
    }

}
