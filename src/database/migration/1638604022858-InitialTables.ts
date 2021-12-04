import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialTables1638604022858 implements MigrationInterface {
    name = 'InitialTables1638604022858';

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`Designations\` (\`id\` varchar(36) NOT NULL, \`designation_name\` varchar(255) NOT NULL, \`department\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL, \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Locations\` (\`id\` varchar(36) NOT NULL, \`location_name\` varchar(255) NOT NULL, \`country\` varchar(255) NOT NULL, \`is_active\` tinyint NOT NULL, \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`Users\` (\`id\` varchar(36) NOT NULL, \`email\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`is_referred\` tinyint NULL DEFAULT 0, \`referral_code\` varchar(255) NULL, \`mobile\` varchar(255) NOT NULL, \`emp_id\` varchar(255) NULL, \`account_type_id\` int NOT NULL, \`account_status\` tinyint NOT NULL DEFAULT 0, \`created_by\` varchar(255) NOT NULL, \`updated_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`UsersProfile\` (\`id\` varchar(36) NOT NULL, \`emp_id\` varchar(255) NOT NULL, \`department\` varchar(255) NOT NULL, \`location\` varchar(255) NOT NULL, \`designation\` tinyint NULL, \`joining_date\` varchar(255) NULL, \`display_picture\` varchar(255) NULL, \`created_by\` varchar(255) NULL, \`updated_by\` varchar(255) NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`UsersProfile\``);
        await queryRunner.query(`DROP TABLE \`Users\``);
        await queryRunner.query(`DROP TABLE \`Locations\``);
        await queryRunner.query(`DROP TABLE \`Designations\``);
    }

}
