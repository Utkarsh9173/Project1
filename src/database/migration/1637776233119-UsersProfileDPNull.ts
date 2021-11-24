import {MigrationInterface, QueryRunner} from "typeorm";

export class UsersProfileDPNull1637776233119 implements MigrationInterface {
    name = 'UsersProfileDPNull1637776233119';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersProfile" ALTER COLUMN "display_picture" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "UsersProfile" ALTER COLUMN "created_by" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "UsersProfile" ALTER COLUMN "created_by" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "UsersProfile" ALTER COLUMN "display_picture" SET NOT NULL`);
    }

}
