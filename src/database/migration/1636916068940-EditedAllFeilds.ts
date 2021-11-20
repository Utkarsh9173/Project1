import {MigrationInterface, QueryRunner} from "typeorm";

export class EditedAllFeilds1636916068940 implements MigrationInterface {
    name = 'EditedAllFeilds1636916068940';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "profile" DROP COLUMN "phone_number_one"`);
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "dob"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "user_id" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "jan"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "jan" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ALTER COLUMN "feb" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "mar"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "mar" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "apr"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "apr" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "may"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "may" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "jun"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "jun" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "jul"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "jul" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "aug"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "aug" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "sept"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "sept" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "oct"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "oct" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "nov"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "nov" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "dec"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "dec" text array`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "year" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moretrees" ALTER COLUMN "certificate_id" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moretrees" ALTER COLUMN "certificate_url" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moretrees" ALTER COLUMN "total_carbon_offset" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "address_line_two" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "referred_by" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verified_at" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "payment_plan" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "account_holder_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "account_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "account_sort_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "card_holder_name" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "card_sort_code" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "card_number" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "card_expiry_date" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "card_expiry_date" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "card_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "card_sort_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "card_holder_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "account_sort_code" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "account_number" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "account_holder_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "bank_detail" ALTER COLUMN "payment_plan" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "verified_at" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "referred_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "password" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ALTER COLUMN "last_name" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ALTER COLUMN "address_line_two" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moretrees" ALTER COLUMN "total_carbon_offset" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moretrees" ALTER COLUMN "certificate_url" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "moretrees" ALTER COLUMN "certificate_id" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "year"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "year" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "dec"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "dec" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "nov"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "nov" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "oct"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "oct" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "sept"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "sept" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "aug"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "aug" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "jul"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "jul" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "jun"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "jun" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "may"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "may" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "apr"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "apr" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "mar"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "mar" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ALTER COLUMN "feb" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "jan"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "jan" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" DROP COLUMN "user_id"`);
        await queryRunner.query(`ALTER TABLE "monthlyUsage" ADD "user_id" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "users" ADD "dob" TIMESTAMP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "profile" ADD "phone_number_one" character varying NOT NULL`);
    }

}
